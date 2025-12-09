// src/pages/Home.js
import React from "react";
import HeroSection from "../components/home/HeroSection";
import StatisticsSection from "../components/home/StatisticsSection";
import InnovationSection from "../components/home/InnovationSection";
// import SatisfiedClientCounter from '../components/home/SatisfiedClientCounter';
import AutoScrollingCarousel from "../components/home/AutoScrollingCarousel";
import hybridEventsData from "../data/hybridsData1";
import webinarsData from "../data/webinarsData1";
// import AutoImageCarousel from '../components/common/AutoImageCarousel'; // Ensure this path is correct if you're using it
import JournalsSection from "../components/home/JournalsSection";
import HomeTestimonialsSection from "../components/home/HomeTestimonialsSection";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";
const homeHybridEvents = hybridEventsData.slice(0, 5)
function Home() {
  // If you are using AutoImageCarousel, define its images here
const HandleAllConferences=()=>{

}
  return (
    <div className="home-page">
      <SEO
        title="Helix Conferences – Global Conferences, Webinars, Workshops, Expos & Exhibitions"
        description="Helix Conferences connects the world through international conferences, scientific webinars, academic workshops, expos, and exhibitions. Join global leaders, innovators, and professionals in every industry."
        keywords="global conferences, international conferences, scientific webinars, academic workshops, industry expos, trade exhibitions, professional events, worldwide summits, networking events, innovation forums, business conferences, research symposiums"
        url="https://helixconferences.com/"
        image="https://helixconferences.com/social-preview.jpg"
        canonical="https://helixconferences.com/"
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://helixconferences.com/#organization",
              name: "Helix Conferences",
              url: "https://helixconferences.com/",
              logo: "https://helixconferences.com/images/logo.png",
              sameAs: [
                "https://www.facebook.com/HelixConferences",
                "https://www.linkedin.com/company/helixconferences",
                "https://x.com/HelixConfe69272",
                "https://www.instagram.com/helix_conferences/",
                "https://www.youtube.com/@Helixconferences",
              ],
              description:
                "Helix Conferences organizes high-impact international conferences, webinars, scientific workshops, expos, exhibitions, and corporate events worldwide.",
              foundingDate: "2010",
              founders: [{ "@type": "Person", name: "Dr Surya Sarva" }],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+1-757-656-7778",
                  contactType: "Customer Service",
                  areaServed: "Worldwide",
                  availableLanguage: "English",
                },
              ],
            },
            {
              "@type": "WebSite",
              "@id": "https://helixconferences.com/#website",
              url: "https://helixconferences.com/",
              name: "Helix Conferences – Global Conferences & Events",
              description:
                "Discover global conferences, international webinars, academic workshops, expos, and exhibitions with Helix Conferences.",
              inLanguage: "en",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://helixconferences.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            },
            {
              "@type": "Event",
              "@id": "https://helixconferences.com/#event",
              name: "Helix Global Events 2025",
              startDate: "2025-01-01",
              endDate: "2025-12-31",
              eventAttendanceMode:
                "https://schema.org/MixedEventAttendanceMode",
              eventStatus: "https://schema.org/EventScheduled",
              location: [
                {
                  "@type": "Place",
                  name: "Worldwide Venues",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Global",
                    addressCountry: "Worldwide",
                  },
                },
                {
                  "@type": "VirtualLocation",
                  url: "https://helixconferences.com",
                },
              ],
              image: "https://helixconferences.com/images/events-banner.jpg",
              description:
                "Join Helix Conferences for world-class professional events, including conferences, webinars, workshops, expos, and exhibitions.",
              organizer: {
                "@type": "Organization",
                name: "Helix Conferences",
                url: "https://helixconferences.com",
              },
            },
          ],
        }}
      />

      {/* If you have an AutoImageCarousel for the hero section, uncomment and use it */}
      {/* <AutoImageCarousel images={heroCarouselImages} interval={3000} aspectRatio="16/9" /> */}

      {/* HeroSection will likely sit on top of the global gradient */}
      <HeroSection />
      <StatisticsSection />
      <InnovationSection />
      {/* <SatisfiedClientCounter /> */}

      {/* Hybrid Events Carousel Section - NOW USING THE GLOBAL GRADIENT */}
      <div
        className="py-16 text-white relative overflow-hidden"
        style={{
          // Applied the new background gradient
          background: "linear-gradient(to right, #4A2868, #2E659A)",
          borderRadius: "0px", // Ensure no rounded corners for full width sections
          border: "1px solid rgba(255, 255, 255, 0.1)", // Subtle white border
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.5)", // Darker shadow for dark glassmorphism
          backdropFilter: "blur(15px)", // Keep the blur for the glassmorphism effect
          WebkitBackdropFilter: "blur(15px)", // For Safari compatibility
          overflow: "hidden", // Essential for carousel contents
        }}
      >
    <AutoScrollingCarousel
  data={homeHybridEvents}
  speed={50}
  direction="left"
  title="Upcoming Conferences"
/>

        {/* All conferences */}
  {/* <button onClick={HandleAllConferences}>Read More</button> */}
 <Link 
  to="/AllConferences" 
  style={{
    display: "block",
    textAlign: "center",
    margin: "20px auto",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    textDecoration: "none",
    borderRadius: "5px",
    width: "fit-content"
  }}
>
  Read More
</Link>

      </div>

      {/* Webinars Carousel Section - NOW USING THE GLOBAL GRADIENT */}
      {/* <div
        className="py-16 text-white relative overflow-hidden"
        style={{
          // Applied the new background gradient
          background: "linear-gradient(to right, #4A2868, #2E659A)",
          borderRadius: "0px", // Ensure no rounded corners
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(15px)", // Keep the blur for the glassmorphism effect
          WebkitBackdropFilter: "blur(15px)",
          overflow: "hidden",
        }}
      >
        {/* <AutoScrollingCarousel
          data={webinarsData}
          speed={55} // Adjust speed as needed, slightly different from hybrid for variety
          direction="right"
          title="Upcoming Conferences"
        /> */}
      {/* </div> */} 

      {/* Other sections will go here */}
      <JournalsSection />
      <HomeTestimonialsSection />
    </div>
  );
}

export default Home;
