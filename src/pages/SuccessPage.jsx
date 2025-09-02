// // src/pages/SuccessPage.jsx
// import React, { useEffect, useState, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Confetti from "react-confetti";
// import { CheckCircle2, Download, Home, CreditCard, Wifi } from "lucide-react";
// import html2canvas from "html2canvas";
// import { QRCodeCanvas } from "qrcode.react";
// import Logo from '../assets/images/journal-logo.png'; // Assuming this is your logo import

// const SuccessPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { message, contactEmail, registrationData } = location.state || {};

//   const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
//   const passRef = useRef(null);
//   const successRef = useRef(null);

//   useEffect(() => {
//     setWindowSize({ width: window.innerWidth, height: window.innerHeight });
//     const handleResize = () =>
//       setWindowSize({ width: window.innerWidth, height: window.innerHeight });
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Updated function to download the pass as a PNG image
//   const downloadAsImage = async () => {
//     if (!passRef.current) return;
//     const canvas = await html2canvas(passRef.current, { scale: 3 });
//     const imgData = canvas.toDataURL("image/png");

//     const link = document.createElement('a');
//     link.href = imgData;
//     link.download = 'Conference-Gate-Pass.png';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div className="relative min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-gray-800 overflow-hidden">
//       {/* 🌌 Confetti with a modern, elegant color palette */}
//       <Confetti
//         width={windowSize.width}
//         height={windowSize.height}
//         colors={["#a855f7", "#3b82f6", "#ef4444", "#84cc16", "#f97316"]}
//       />

//       {/* ⭐ Star-like background pattern */}
//       <div className="absolute inset-0 z-0 bg-black opacity-40 animate-pulse-slow">
//         <div className="w-full h-full bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
//       </div>

//       {/* Main Container with a subtle fade-in animation */}
//       <div
//         ref={successRef}
//         className="w-full max-w-4xl mx-auto px-4 py-16 relative z-10 transition-all duration-1000 ease-out animate-fade-in-up"
//       >
//         <div className="bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-12 text-center border border-green-200">
//           {/* Animated Checkmark and Title */}
//           <div className="flex flex-col items-center justify-center mb-8">
//             <CheckCircle2 className="text-green-600 w-24 h-24 mb-6 animate-scale-in" />
//             <h1 className="text-5xl font-extrabold text-green-700 mb-2 tracking-tight">
//               Registration Successful
//             </h1>
//             <p className="text-xl text-gray-600 font-medium">
//               You are all set!
//             </p>
//           </div>

//           <p className="text-lg text-gray-700 mb-4 px-6 md:px-12 leading-relaxed">
//             {message || "We've got your details. Our team will contact you in less than 24hrs."}
//           </p>

//           {contactEmail && (
//             <p className="text-md text-gray-500 mt-4 font-light">
//               For any queries, please email{" "}
//               <a
//                 href={`mailto:${contactEmail}`}
//                 className="text-green-700 font-semibold hover:underline"
//               >
//                 {contactEmail}
//               </a>
//             </p>
//           )}

//           {/* 💳 THE NEW PREMIUM GATE PASS - Redesigned for a Credit Card Look */}
//           {registrationData && (
//             <div
//               ref={passRef}
//               className="mt-12 relative w-full aspect-[1.6/1] max-w-lg mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white rounded-2xl p-6 shadow-2xl border-4 border-white/10 overflow-hidden font-mono transition-all duration-500 ease-in-out hover:scale-[1.02] transform-gpu"
//             >
//               {/* 🔳 Holographic effect / Background pattern */}
//               <div
//                 className="absolute inset-0 z-0 opacity-10"
//                 style={{
//                   backgroundImage: `url('data:image/svg+xml,<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><g fill="%23FFFFFF" fill-opacity="0.2"><path d="M0 20L20 0L40 20L20 40L0 20Z" /><path d="M10 30L30 10L10 30Z" /><path d="M10 10L30 30L10 10Z" /></g></svg>')`,
//                   backgroundSize: '30px 30px',
//                 }}
//               />

//               <div className="relative z-10 h-full flex flex-col justify-between">
//                 {/* Top Section: Logo and Icons */}
//                 <div className="flex justify-between items-start">
//                   <img
//                     src={Logo}
//                     alt="Conference Logo"
//                     className="w-24 h-auto"
//                   />
//                   <div className="flex items-center space-x-2">
//                     {/* RFID/NFC Chip Icon */}
//                     <Wifi className="w-8 h-8 text-gray-300" />
//                     {/* Type of Pass */}
//                     <CreditCard className="w-8 h-8 text-white" />
//                   </div>
//                 </div>

//                 {/* Middle Section: Details */}
//                 <div className="flex flex-col">
//                   {/* Name and Designation */}
//                   <div className="mb-4">
//                     <p className="text-xs font-light tracking-widest text-gray-400 uppercase">
//                       Pass Holder
//                     </p>
//                     <p className="text-xl md:text-2xl font-bold tracking-wide">
//                       {registrationData.participantInfo.fullName}
//                     </p>
//                   </div>

//                   {/* QR Code and Info */}
//                   <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end">
//                     {/* Details */}
//                     <div className="text-left space-y-1 text-sm md:text-base">

//                       <p>
//                         <span className="font-light text-gray-400">
//                           Country:
//                         </span>{" "}
//                         {registrationData.participantInfo.country}
//                       </p>
                     
//                       <p>
//                         <span className="font-light text-gray-400">
//                           Selected Package:
//                         </span>{" "}
//                         <span className="text-lg font-bold text-green-400">
//                           ${registrationData.totalAmount}
//                         </span>
//                       </p>
//                     </div>

//                     {/* QR Code */}
//                     <div className="bg-white p-2 rounded-lg shadow-lg mt-4 sm:mt-0">
//                       <QRCodeCanvas
//                         value={"www.helixconferences.com"}
//                         size={80}
//                         level="H"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Bottom Section: Footer with small logo and text */}
//                 <div className="flex justify-between items-center text-xs font-extralight text-gray-400 mt-4">
//                   <span>Helix Conferences</span>
//                   <p>
//                     <span className="text-red-400">•</span>{" "}
//                     {new Date().getFullYear()}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}
//           {/* End of New Premium Gate Pass Section */}

//           {/* Buttons */}
//           <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
//             <button
//               onClick={downloadAsImage} // Updated function call
//               className="group flex items-center justify-center gap-3 px-8 py-4 bg-purple-600 text-white rounded-xl shadow-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 font-semibold text-lg"
//             >
//               <Download className="w-6 h-6 transform transition-transform group-hover:animate-bounce-y" />{" "}
//               Download Pass (PNG)
//             </button>

//             <button
//               onClick={() => navigate("/")}
//               className="group flex items-center justify-center gap-3 px-8 py-4 bg-gray-200 text-gray-800 rounded-xl shadow-lg hover:bg-gray-300 transition-all duration-300 transform hover:scale-105 font-semibold text-lg"
//             >
//               <Home className="w-6 h-6 transform transition-transform group-hover:scale-110" />{" "}
//               Go to Home
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SuccessPage;



// src/pages/SuccessPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Home } from "lucide-react";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        {/* Success Icon */}
        <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Submission Successful
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you! Your application has been submitted successfully.<br/>
          Our Team will reach you within 24-48hrs.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-lg shadow hover:bg-amber-700 transition"
        >
          <Home className="w-5 h-5" /> Go to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
