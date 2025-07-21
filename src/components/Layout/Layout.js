// // src/components/layout/Layout.js
// import React from 'react';
// import Header from './Header'; // Correct path because Header.js is now in the same 'layout' folder
// import Footer from './Footer'; // Correct path because Footer.js is now in the same 'layout' folder

// const Layout = ({ children }) => {
//   return (
//     <div className="app-layout">
//       <Header /> {/* The Header will always be rendered here */}
      
//       {/* The main content area where your pages (Routes) will be rendered */}
//       <main className="min-h-screen"> 
//         {children} {/* This prop will contain your <Routes> */}
//       </main>
      
//       <Footer /> {/* The Footer will always be rendered here */}
//     </div>
//   );
// };

// export default Layout;


// // src/components/layout/Layout.js
// import React from 'react';
// import Header from './Header';
// import Footer from './Footer';

// const Layout = ({ children }) => {
//   return (
//     // Added flex flex-col and min-h-screen to ensure footer sticks to the bottom
//     <div className="app-layout flex flex-col min-h-screen">
//       <Header /> {/* The Header will always be rendered here */}
      
//       {/* The main content area where your pages (Routes) will be rendered.
//         Added pt-[80px] to push content below the fixed header.
//         Added flex-grow to make this section expand and push the footer down.
//       */}
//       <main className="flex-grow pt-[80px]"> 
//         {children} {/* This prop will contain your <Routes> */}
//       </main>
      
//       <Footer /> {/* The Footer will always be rendered here */}
//     </div>
//   );
// };

// export default Layout;


// src/components/layout/Layout.js
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    // Added flex flex-col and min-h-screen to ensure footer sticks to the bottom
    <div className="app-layout flex flex-col min-h-screen">
      <Header /> {/* The Header will always be rendered here */}
      
      {/* The main content area where your pages (Routes) will be rendered.
        Added pt-[80px] to push content below the fixed header.
        Added flex-grow to make this section expand and push the footer down.
        FIX: Added 'relative' class to ensure correct scroll offset calculation for framer-motion children.
      */}
      <main className="flex-grow relative"> 
        {children} {/* This prop will contain your <Routes> */}
      </main>
      
      <Footer /> {/* The Footer will always be rendered here */}
    </div>
  );
};

export default Layout;