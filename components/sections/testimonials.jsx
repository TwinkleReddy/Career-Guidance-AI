import React from 'react'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image'
import { testimonial } from '@/data/testimonial'
const TestimonialsSection
 = () => {
    return (
        <section className="w-full py-20 bg-background/30">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-4xl font-bond text-center mb-16">
                    What Our Users Say
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
                    {testimonial.map((testimonial, index) => (
                        <Card
                            key={index}
                            className="bg-background shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <CardContent className="pt-6">
                                <div className="flex flex-col space-y-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="relative h-12 w-12 flex-shrink-0">
                                            <Image
                                                src={testimonial.image}
                                                width={48}
                                                height={48}
                                                alt={testimonial.author}
                                                className="rounded-full object-cover border-2 border-primary/20"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-base">
                                                {testimonial.author}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {testimonial.role}
                                            </p>
                                            <p className="text-sm text-primary font-medium">
                                                {testimonial.company}
                                            </p>
                                        </div>
                                    </div>
                                    <blockquote className="italic text-muted-foreground relative">
                                        <span className="text-3xl text-primary absolute -top-4 -left-2">
                                            “
                                        </span>
                                        {testimonial.quote}
                                        <span className="text-3xl text-primary absolute -bottom-4 right-2">
                                            ”
                                        </span>
                                    </blockquote>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TestimonialsSection

