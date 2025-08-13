"use client";
import HeroSection from "@/components/hero";
import { Button } from "@/components/ui/button";
import { features } from "@/data/features";
import { Card, CardContent } from "@/components/ui/card";
import { howItWorks } from "@/data/howItWorks";
import { testimonial } from "@/data/testimonial";
import Image from "next/image";
import { faqs } from "@/data/faqs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import CareerPathVisualizer from "@/components/career-path-visualizer";
import { templates } from "@/data/templates";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <div className="grid-background"></div>
      <HeroSection />

      {/* Features Section */}
      <section className="w-full py-10 pb-20 gradient-background">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl font-bond text-center mb-16">
            Powerful Features for your Career Growth
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Link key={index} href={feature.link}>
                <Card className="group border-2 hover:border-primary transition-transform transform hover:-translate-y-1 duration-300 h-full flex flex-col shadow-md hover:shadow-lg">
                  <CardContent className="pt-6 text-center flex flex-col items-center">
                    <div className="mb-4 scale-100 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* Stats Section */}
      <section className="w-full py-20 bg-background/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto text-center">
            {[
              { number: "50+", label: "Industries Covered" },
              { number: "1000+", label: "Interview Questions" },
              { number: "95%", label: "Success Rate" },
              { number: "24/7", label: "AI Support" },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <h3 className="text-5xl font-extrabold tracking-tight">
                  {item.number}
                </h3>
                <p className="text-muted-foreground text-base font-medium">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-20 gradient-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bond mb-4">How it Works</h2>
            <p className="text-muted-foreground text-lg">
              Four simple steps to accelerate your career growth
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {howItWorks.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-lg bg-background/40 shadow-md space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-xl">{item.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
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

      {/* Templates Section */}
      {/* Templates Section */}
      <section className="w-full py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl font-bold text-center mb-4">
            Resume & Cover Letter Templates
          </h2>
          <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
            Compared before and after AI-enhanced career documents and see the difference.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {templates.map((template, index) => (
              <Card
                key={index}
                className="shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-lg rounded-2xl overflow-hidden"
              >
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{template.type}</h3>
                  <p className="text-muted-foreground mb-6">{template.description}</p>

                  <div className="grid grid-cols-2 gap-4">
                    {["before", "after"].map((stage) => {
                      const file = template[stage];
                      return (
                        <div
                          className="relative rounded-lg overflow-hidden border bg-white shadow-sm"
                          key={stage}
                        >
                          {/* Label */}
                          <span className={`absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded z-10 ${stage === "before"
                            ? "bg-gray-200 text-gray-800"
                            : "bg-green-100 text-green-800"
                            }`}>
                            {stage === "before" ? "Before AI" : "After AI"}
                          </span>

                          {/* Aspect Ratio Box */}
                          <div className="relative w-full pt-[140%]">
                            {/* This gives a tall aspect ratio similar to a resume page */}
                            {file.type === "image" ? (
                              <Image
                                src={file.src}
                                alt={`${template.type} ${stage}`}
                                fill
                                className="absolute inset-0 object-contain"
                              />
                            ) : (
                              <iframe
                                src={file.src}
                                className="absolute inset-0 w-full h-full border-none"
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background/40">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">See It in Action</h2>
          <p className="text-muted-foreground mb-8">
            Watch how BumbleBee helps you to create a cover letter template with just minimal effort.
          </p>
          <div className="relative max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-lg">
            <video
              className="w-full"
              controls
              poster="/video-thumbnail.png"
            >
              <source src="/demo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>




      {/* FAQ Section */}
      <section className="w-full py-20 gradient-background ml-2 mr-2">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bond mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-lg">
              Find answers to common questions about our platforms
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full">
        <div className="mx-auto py-24 gradient rounded-lg">
          <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bond tracking-tight text-black sm:text-5xl">
              Ready to Accelerate Your Career?
            </h2>
            <p className="mx-auto max-w-[600px] text-black md:text-xl px-2">
              Join thousands of professionals who are advancing their careers
              with AI-powered guidance.
            </p>
            <Link href="/dashboard">
              <Button
                size="lg"
                className="h-11 animate-bounce bg-black text-white"
                variant="primary"
              >
                Start Your Journey Today <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
