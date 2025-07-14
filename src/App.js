// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { CursorProvider } from './components/CustomCursor';
// import Layout from './components/Layout/Layout'; // <--- Import the new Layout component

// // Import your page components (these still need to be imported here
// // because App.js defines the routes for them)
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
// import Gallery from './components/Gallery/QuantumGallery'; // Keeping your active Gallery import
// import CallForPapers from './pages/CallForPapers';
// import ScrollToTop from './components/ScrollToTop';


// function App() {
//   return (
//     <Router>
//       <ScrollToTop>
//       <CursorProvider>
//         {/* Now, the Layout component wraps your Routes */}
//         <Layout> 
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
//         </Layout>
//       </CursorProvider>
//       </ScrollToTop>
//     </Router>
//   );
// }

// export default App;







// // // src/App.js
// // import React from 'react';
// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import Header from './components/Header';
// // import Footer from './components/Footer';
// // import Home from './pages/Home';
// // import AboutUs from './pages/AboutUs';
// // import Conferences from './pages/Conferences';
// // import Hybrids from './pages/Hybrids';
// // import Webinars from './pages/Webinars';
// // import Testimonials from './pages/Testimonials';
// // import Blog from './pages/Blog';
// // import Journals from './pages/Journals';
// // import Contact from './pages/Contact';
// // import BuyATicket from './pages/BuyATicket';
// // import Committees from './pages/Committees';
// // import Speakers from './pages/Speakers';
// // import Schedule from './pages/Schedule';
// // import Gallery from './pages/Gallery';
// // import CallForPapers from './pages/CallForPapers';
// // // Import the CursorProvider and CustomCursor
// // import { CursorProvider } from './components/CustomCursor';


// // function App() {
// //   return (
// //     <Router>
// //       <CursorProvider> {/* Wrap your entire app with CursorProvider */}
// //         <Header />
// //         <main className="min-h-screen pt-16"> {/* Add padding-top to main to account for fixed header */}
// //           <Routes>
// //             <Route path="/" element={<Home />} />
// //             <Route path="/about" element={<AboutUs />} />
// //             <Route path="/conferences" element={<Conferences />} />
// //             <Route path="/hybrids" element={<Hybrids />} />
// //             <Route path="/webinars" element={<Webinars />} />
// //             <Route path="/testimonials" element={<Testimonials />} />
// //             <Route path="/blog" element={<Blog />} />
// //             <Route path="/journals" element={<Journals />} />
// //             <Route path="/contact" element={<Contact />} />
// //             <Route path="/buy-a-ticket" element={<BuyATicket />} />
// //             <Route path="/committees" element={<Committees />} />
// //             <Route path="/speakers" element={<Speakers />} />
// //             <Route path="/schedule" element={<Schedule />} />
// //             <Route path="/gallery" element={<Gallery />} />
// //             <Route path="/call-for-papers" element={<CallForPapers />} />
// //           </Routes>
// //         </main>
// //         <Footer />
// //       </CursorProvider>
// //     </Router>
// //   );
// // }

// // export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CursorProvider } from './components/CustomCursor';
import Layout from './components/Layout/Layout'; 

// Import your page components
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
import Gallery from './components/Gallery/QuantumGallery';
import CallForPapers from './pages/CallForPapers';
import ScrollToTop from './components/ScrollToTop';

// Import the NotFound component you created
import NotFound from './pages/NotFound';


function App() {
  return (
    <Router>
      <ScrollToTop />
      <CursorProvider>
        <Layout>
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
            {/* Catch-all route for 404 Not Found pages */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </CursorProvider>
    </Router>
  );
}

export default App;