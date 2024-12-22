'use client';

import { useState } from "react";
import { Navigation } from "../components/navigation";
import { Hero } from "../components/hero";
import { FeaturesSection } from "../components/features-section";
import { AIAdvisor } from "../components/ai-advisor";
import { HowItWorks } from "../components/how-it-works";
import { Testimonials } from "../components/testimonial";
import { Pricing } from "../components/pricing";
import { FAQ } from "../components/faq";
// import { Footer } from "../components/footer";
import Footer from "@/components/Footer";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-black" : "bg-[#fcfdfd]"}`}>
      <Navigation isDarkMode={isDarkMode} toggleMode={toggleMode} />
      <Hero isDarkMode={isDarkMode} />
      <FeaturesSection isDarkMode={isDarkMode} />
      <AIAdvisor isDarkMode={isDarkMode} />
      <HowItWorks isDarkMode={isDarkMode} />
      <Testimonials isDarkMode={isDarkMode} />
      <Pricing isDarkMode={isDarkMode} />
      <FAQ isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}

