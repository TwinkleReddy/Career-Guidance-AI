'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollArea, ScrollBar } from './ui/scroll-area';

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: 'Hi! How can we help you?', sender: 'bot' },
    ]);
    const [input, setInput] = useState('');
    const chatRef = useRef(null);

    // Auto scroll to bottom on new message
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { text: input, sender: 'user' };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input }),
            });
            const data = await response.json();

            if (data.type === 'slots') {
                setMessages((prev) => [
                    ...prev,
                    { text: data.reply, sender: 'bot', type: 'slots', slots: data.slots },
                ]);
            } else {
                setMessages((prev) => [...prev, { text: data.reply, sender: 'bot' }]);
            }
        } catch {
            setMessages((prev) => [
                ...prev,
                { text: 'Error reaching AI.', sender: 'bot' },
            ]);
        }
    };

    const handleSlotBooking = async (slot) => {
        const userMsg = { text: `I'd like to book ${slot}`, sender: 'user' };
        setMessages((prev) => [...prev, userMsg]);

        // Step 1: Ask user for email
        const email = prompt("Please enter your email to confirm the booking:");
        if (!email) {
            setMessages((prev) => [
                ...prev,
                { text: "Email is required to confirm the booking.", sender: 'bot' },
            ]);
            return;
        }

        // Step 2: Send booking request with slot + email
        try {
            const response = await fetch('/api/book-slot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slot, email }),
            });
            const data = await response.json();
            setMessages((prev) => [...prev, { text: data.confirmation, sender: 'bot' }]);
        } catch {
            setMessages((prev) => [
                ...prev,
                { text: 'Failed to book the slot. Please try again.', sender: 'bot' },
            ]);
        }
    };


    return (
        <div>
            {/* Chat Icon */}
            <div
                className="fixed bottom-6 right-6 z-50 cursor-pointer hover:scale-105 transition"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Image
                    src="/chat-icon.png"
                    alt="Chat Icon"
                    width={60}
                    height={60}
                    className="rounded-full shadow-xl"
                />
            </div>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4">
                            <h2 className="text-lg font-semibold">Chat Support</h2>
                            <button onClick={() => setIsOpen(false)} className="text-white text-xl">
                                &times;
                            </button>
                        </div>

                        {/* Messages */}
                        <ScrollArea className="flex-1 max-h-96 p-4 overflow-y-auto">
                            <div ref={chatRef} className="flex flex-col space-y-2">
                                {messages.map((msg, idx) => (
                                    <div key={idx} className="flex flex-col">
                                        {msg.type === 'slots' ? (
                                            <>
                                                <div className="bg-blue-100 text-blue-800 self-start px-3 py-2 rounded-lg text-sm max-w-[70%] mb-2">
                                                    {msg.text}
                                                </div>
                                                <div className="flex flex-wrap gap-2 self-start">
                                                    {msg.slots.map((slot, i) => (
                                                        <button
                                                            key={i}
                                                            onClick={() => handleSlotBooking(slot)}
                                                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-xs"
                                                        >
                                                            {slot}
                                                        </button>
                                                    ))}
                                                </div>
                                            </>
                                        ) : (
                                            <div
                                                className={`px-3 py-2 rounded-lg text-sm max-w-[70%] ${msg.sender === 'user'
                                                    ? 'bg-gray-200 text-gray-800 self-end'
                                                    : 'bg-blue-100 text-blue-800 self-start'
                                                    }`}
                                            >
                                                {msg.text}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <ScrollBar orientation="vertical" />
                        </ScrollArea>

                        {/* Input */}
                        <div className="border-t p-2 bg-gray-50 flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="Type your message..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400 text-sm"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') sendMessage();
                                }}
                            />
                            <button
                                onClick={sendMessage}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm"
                            >
                                Send
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
