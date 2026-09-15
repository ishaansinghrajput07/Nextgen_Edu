import Hero from "../components/home/Hero";
// import Stats from "../components/home/Stats/Stats";

import UniversitiesSection from "../components/home/UniversitiesSection";
import CoursesSection from "../components/home/CoursesSection";
// import WhyChooseUs from "../components/home/WhyChooseUs";
// import CounsellingForm from "../components/home/CounsellingForm";
import FAQ from "../components/home/FAQ";
import ProcessSection from "../components/home/ProcessSection";
// import Reviews from "./Reviews";
import ReviewCardss from "../components/reviews/ReviewCardss";
// import WhatWeOffer from "../components/home/WhatWeOffer";
import TrustedUniversities from "../components/home/Trusteduniver/TrustedUniversities";
import AboutContent from "../components/about/AboutContent";




export default function Home() {
  return (
    <>
      <Hero />
      <TrustedUniversities />
      <AboutContent/>
    
      
      {/* <Stats /> */}
     
      <UniversitiesSection />
      <CoursesSection />
      {/* <WhyChooseUs /> */}
      {/* <CounsellingForm /> */}
      {/* <Reviews /> */}
      <ReviewCardss/>
      <ProcessSection />
      {/* <WhatWeOffer /> */}
      <FAQ />
      
    </>
  );
}