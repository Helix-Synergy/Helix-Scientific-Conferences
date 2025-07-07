// // src/components/home/JournalsSection.js
// import React from 'react';
// import { Link } from 'react-router-dom';


// const JournalsSection = () => {
//   const backgroundImage = 'url("../../assets/images/journalBackground.jpg")'; // Example local path
  
//   return (
//     <section
//       className="relative bg-cover bg-center py-20 md:py-32 flex items-center justify-center text-center"
//       style={{ backgroundImage: `url(${backgroundImage})` }}
//     >
//       {/* Overlay to make text more readable */}
//       <div className="absolute inset-0 bg-black bg-opacity-60"></div>

//       <div className="relative z-10 p-4">
//         <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
//           Helix Open Access Journals
//         </h2>
//         <Link to="/journals">
//           <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105">
//             Discover More
//           </button>
//         </Link>
//       </div>
//     </section>
//   );
// };

// export default JournalsSection;





// // src/components/home/JournalsSection.js
// import React from 'react';
// import { Link } from 'react-router-dom';

// const JournalsSection = () => {
//   // Background image path - using absolute path from public folder
//   const backgroundImage = 'url("/assets/images/journalBackground.jpg")';

//   // Logo image path - using absolute path from public folder
//   const logoImage = '../../assets/images/journal-logo.png';

//   return (
//     <section
//       className="relative bg-cover bg-center py-20 md:py-32 flex items-center justify-center text-center"
//       style={{ backgroundImage: `url(${backgroundImage})` }}
//     >
//       {/* Overlay to make text more readable */}
//       <div className="absolute inset-0 bg-black bg-opacity-60"></div>

//       <div className="relative z-10 p-4 flex flex-col items-center"> {/* Added flex-col items-center for vertical stacking and centering */}
//         {/* Logo Image */}
//         <img
//           src={logoImage}
//           alt="Journal Logo"
//           className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover mb-6 border-4 border-white shadow-lg" // Circular shape, size, border, shadow
//           onError={(e) => { e.target.onerror = null; e.target.src="/assets/images/placeholder-logo.png" }} // Fallback
//         />

//         <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
//           Helix Open Access Journals
//         </h2>
//         <Link to="/journals">
//           <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105">
//             Discover More
//           </button>
//         </Link>
//       </div>
//     </section>
//   );
// };

// export default JournalsSection;


// src/components/home/JournalsSection.js
import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../../assets/images/journalBackground.jpg';
import logoImage from '../../assets/images/journal-logo.png';

const JournalsSection = () => {

  return (
    <section
      className="relative bg-cover bg-center py-20 md:py-32 flex items-center justify-center text-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay to make text more readable */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="relative z-10 p-4 flex flex-col items-center">
        {/* Logo Image */}
        <img
          src={logoImage} // Use the corrected logoImage path
          alt="Journal Logo"
          className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover mb-6 border-4 border-white shadow-lg"
          onError={(e) => { e.target.onerror = null; e.target.src="/assets/images/placeholder-logo.png" }} // Fallback image if not found
        />

        <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
          Helix Open Access Journals
        </h2>
        <Link to="/journals">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105">
            Discover More
          </button>
        </Link>
      </div>
    </section>
  );
};

export default JournalsSection;