"use client";
import HeroSection from "@/components/hero";
import WhyBumbleBeeSection from "@/components/sections/whyBumbleBee";
import FeaturesSection from "@/components/sections/features";
import HowItWorksSection from "@/components/sections/howItWorks";
import TestimonialsSection from "@/components/sections/testimonials";
import TemplatesSection from "@/components/sections/templatesSection";
import SeeItInActionSection from "@/components/sections/seeItInAction";
import FaqSection from "@/components/sections/faq";
import StartYourJourneySection from "@/components/sections/startYourJourneySection";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <div className="grid-background"/>
      <HeroSection />
      <FeaturesSection />
      <WhyBumbleBeeSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <TemplatesSection />
      <SeeItInActionSection />
      <FaqSection />
      <StartYourJourneySection />
    </div>
  );
}
