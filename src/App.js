import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Conferences from './pages/Conferences';
import Hybrids from './pages/Hybrids';
import Webinars from './pages/Webinars';
import Testimonials from './pages/Testimonials';
import Blog from './pages/Blog';
import Journals from './pages/Journals';
import Contact from './pages/Contact';
import BuyATicket from './pages/BuyATicket';
import Committees from './pages/Committees';
import Speakers from './pages/Speakers';
import Schedule from './pages/Schedule';
import Gallery from './pages/Gallery';
import CallForPapers from './pages/CallForPapers';
import { CursorProvider } from './components/CustomCursor';


function App() {
  return (
    <Router>
      <CursorProvider>
        <Header />
        {/* Removed pt-16 from main. The HeroSection (which is h-screen) will now start directly below the fixed header.
            The header's height will naturally push the content down within the HeroSection itself. */}
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/conferences" element={<Conferences />} />
            <Route path="/hybrids" element={<Hybrids />} />
            <Route path="/webinars" element={<Webinars />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/journals" element={<Journals />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/buy-a-ticket" element={<BuyATicket />} />
            <Route path="/committees" element={<Committees />} />
            <Route path="/speakers" element={<Speakers />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/call-for-papers" element={<CallForPapers />} />
          </Routes>
        </main>
        <Footer />
      </CursorProvider>
    </Router>
  );
}

export default App;









// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import Home from './pages/Home';
// import AboutUs from './pages/AboutUs';
// import Conferences from './pages/Conferences';
// import Hybrids from './pages/Hybrids';
// import Webinars from './pages/Webinars';
// import Testimonials from './pages/Testimonials';
// import Blog from './pages/Blog';
// import Journals from './pages/Journals';
// import Contact from './pages/Contact';
// import BuyATicket from './pages/BuyATicket';
// import Committees from './pages/Committees';
// import Speakers from './pages/Speakers';
// import Schedule from './pages/Schedule';
// import Gallery from './pages/Gallery';
// import CallForPapers from './pages/CallForPapers';
// // Import the CursorProvider and CustomCursor
// import { CursorProvider } from './components/CustomCursor';


// function App() {
//   return (
//     <Router>
//       <CursorProvider> {/* Wrap your entire app with CursorProvider */}
//         <Header />
//         <main className="min-h-screen pt-16"> {/* Add padding-top to main to account for fixed header */}
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/about" element={<AboutUs />} />
//             <Route path="/conferences" element={<Conferences />} />
//             <Route path="/hybrids" element={<Hybrids />} />
//             <Route path="/webinars" element={<Webinars />} />
//             <Route path="/testimonials" element={<Testimonials />} />
//             <Route path="/blog" element={<Blog />} />
//             <Route path="/journals" element={<Journals />} />
//             <Route path="/contact" element={<Contact />} />
//             <Route path="/buy-a-ticket" element={<BuyATicket />} />
//             <Route path="/committees" element={<Committees />} />
//             <Route path="/speakers" element={<Speakers />} />
//             <Route path="/schedule" element={<Schedule />} />
//             <Route path="/gallery" element={<Gallery />} />
//             <Route path="/call-for-papers" element={<CallForPapers />} />
//           </Routes>
//         </main>
//         <Footer />
//       </CursorProvider>
//     </Router>
//   );
// }

// export default App;