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
import BuyATicket from './pages/RegistrationPage';
import Committees from './pages/Committees';
import Speakers from './pages/Speakers';
import Schedule from './pages/Schedule';
import Gallery from './components/Gallery/QuantumGallery';
import CallForPapers from './pages/CallForPapers';
import ScrollToTop from './components/ScrollToTop';

// Import the NotFound component you created
import NotFound from './pages/NotFound';

// --- NEW: Import the RegistrationForm component ---
import MultiStepForm from './pages/MultiStepForm'; // The new component
import RegistrationForm from './pages/RegistrationPage'; // Assuming you saved it here

// --- NEW: Placeholder components for PayPal redirects ---
// These will be displayed when PayPal redirects the user back to your site
const PayPalSuccessPage = () => (
    <div className="min-h-screen bg-green-100 flex items-center justify-center p-4 font-inter">
        <div className="bg-white p-8 rounded-xl shadow-2xl text-center border border-green-200">
            <h2 className="text-3xl font-bold text-green-700 mb-4">Payment Successful!</h2>
            <p className="text-gray-700 text-lg">Thank you for registering for the conference.</p>
            <p className="text-gray-600 text-base mt-2">Your registration is confirmed, and you will receive a confirmation email shortly.</p>
            <button
                onClick={() => window.location.href = '/'} // Navigate back to home or another suitable page
                className="mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md shadow-lg transition duration-300 transform hover:scale-105"
            >
                Go to Home
            </button>
        </div>
    </div>
);

const PayPalCancelPage = () => (
    <div className="min-h-screen bg-red-100 flex items-center justify-center p-4 font-inter">
        <div className="bg-white p-8 rounded-xl shadow-2xl text-center border border-red-200">
            <h2 className="text-3xl font-bold text-red-700 mb-4">Payment Cancelled</h2>
            <p className="text-gray-700 text-lg">Your PayPal payment was cancelled.</p>
            <p className="text-gray-600 text-base mt-2">You can try again or contact support if you encountered an issue.</p>
            <button
                onClick={() => window.location.href = '/registration'} // Navigate back to registration form
                className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md shadow-lg transition duration-300 transform hover:scale-105"
            >
                Try Again
            </button>
        </div>
    </div>
);


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
            
            {/* --- NEW: Route for the Registration Form --- */}
            {/* This route expects a sourceToken in the URL query parameters */}
            <Route path="/multi-step-register" element={<MultiStepForm />} />
            <Route path="/registration" element={<RegistrationForm />} />

            {/* --- NEW: Routes for PayPal payment redirects --- */}
            <Route path="/paypal-success" element={<PayPalSuccessPage />} />
            <Route path="/paypal-cancel" element={<PayPalCancelPage />} />
            
            {/* Catch-all route for 404 Not Found pages */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </CursorProvider>
    </Router>
  );
}

export default App;







// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { CursorProvider } from './components/CustomCursor';
// import Layout from './components/Layout/Layout'; 

// // Import your page components
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
// import Gallery from './components/Gallery/QuantumGallery';
// import CallForPapers from './pages/CallForPapers';
// import ScrollToTop from './components/ScrollToTop';

// // Import the NotFound component you created
// import NotFound from './pages/NotFound';


// function App() {
//   return (
//     <Router>
//       <ScrollToTop />
//       <CursorProvider>
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
//             {/* Catch-all route for 404 Not Found pages */}
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </Layout>
//       </CursorProvider>
//     </Router>
//   );
// }

// export default App;