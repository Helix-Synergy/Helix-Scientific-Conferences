
// src/pages/Home.js
import React from 'react';
import HeroSection from '../components/home/HeroSection';
import StatisticsSection from '../components/home/StatisticsSection';
import InnovationSection from '../components/home/InnovationSection';
// import SatisfiedClientCounter from '../components/home/SatisfiedClientCounter';
import AutoScrollingCarousel from '../components/home/AutoScrollingCarousel';
import hybridEventsData from '../data/hybridsData1';
import webinarsData from '../data/webinarsData1';
// import AutoImageCarousel from '../components/common/AutoImageCarousel'; // Ensure this path is correct if you're using it
import JournalsSection from '../components/home/JournalsSection';
import HomeTestimonialsSection from '../components/home/HomeTestimonialsSection';

function Home() {
  // If you are using AutoImageCarousel, define its images here
  const heroCarouselImages = [
    '/images/hero-slide-1.jpg',
    '/images/hero-slide-2.jpg',
    '/images/hero-slide-3.jpg',
  ];

  return (
    <div className="home-page">
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
          background: 'linear-gradient(to right, #4A2868, #2E659A)',
          borderRadius: '0px', // Ensure no rounded corners for full width sections
          border: '1px solid rgba(255, 255, 255, 0.1)', // Subtle white border
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)', // Darker shadow for dark glassmorphism
          backdropFilter: 'blur(15px)', // Keep the blur for the glassmorphism effect
          WebkitBackdropFilter: 'blur(15px)', // For Safari compatibility
          overflow: 'hidden', // Essential for carousel contents
        }}
      >
        <AutoScrollingCarousel
          data={hybridEventsData}
          speed={50} // Adjust speed as needed
          direction="left"
          title="Upcoming Hybrids"
        />
      </div>

      {/* Webinars Carousel Section - NOW USING THE GLOBAL GRADIENT */}
      <div
        className="py-16 text-white relative overflow-hidden"
        style={{
          // Applied the new background gradient
          background: 'linear-gradient(to right, #4A2868, #2E659A)',
          borderRadius: '0px', // Ensure no rounded corners
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(15px)', // Keep the blur for the glassmorphism effect
          WebkitBackdropFilter: 'blur(15px)',
          overflow: 'hidden',
        }}
      >
        <AutoScrollingCarousel
          data={webinarsData}
          speed={55} // Adjust speed as needed, slightly different from hybrid for variety
          direction="right"
          title="Upcoming Webinars"
        />
      </div>

      {/* Other sections will go here */}
      <JournalsSection/>
      <HomeTestimonialsSection/>
    </div>
  );
}

export default Home;