import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats/Stats";

import UniversitiesSection from "../components/home/UniversitiesSection";
import CoursesSection from "../components/home/CoursesSection";
import WhyChooseUs from "../components/home/WhyChooseUs";
import CounsellingForm from "../components/home/CounsellingForm";
import FAQ from "../components/home/FAQ";
import ProcessSection from "../components/home/ProcessSection";
import Reviews from "./Reviews";
import WhatWeOffer from "../components/home/WhatWeOffer";
import TrustedUniversities from "../components/home/Trusteduniver/TrustedUniversities";
export default function Home() {
  return (
    <>
      <Hero />
        <TrustedUniversities />
      <Stats />
     
      <UniversitiesSection />
      <CoursesSection />
      <WhyChooseUs />
      <CounsellingForm />
      <Reviews />
      <ProcessSection />
      <WhatWeOffer />
      <FAQ />
      
    </>
  );
}