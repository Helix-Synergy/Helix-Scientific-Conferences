import React from 'react';
 import { motion } from 'framer-motion';
 import './QuantumGallery.css'; // Make sure this CSS file exists
 

 const QuantumGallery = () => {
  const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
  opacity: 1,
  transition: {
  delayChildren: 0.5,
  staggerChildren: 0.1,
  },
  },
  };
 

  const textVariants = {
  hidden: { opacity: 0, y: -50, rotateX: -90, scale: 0.8 },
  visible: {
  opacity: 1,
  y: 0,
  rotateX: 0,
  scale: 1,
  transition: {
  type: 'spring',
  stiffness: 100,
  damping: 10,
  },
  },
  };
 

  const descriptionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
  opacity: 1,
  y: 0,
  transition: {
  delay: 1.5, // Delay to appear after the main text
  duration: 0.5,
  ease: 'easeOut',
  },
  },
  };
 

  return (
  <div className="coming-soon-container-3d">
  <motion.div
  className="coming-soon-text-wrapper"
  variants={containerVariants}
  initial="hidden"
  animate="visible"
  >
  <motion.span className="coming-soon-word-3d" variants={textVariants}>
  C
  </motion.span>
  <motion.span className="coming-soon-word-3d" variants={textVariants}>
  O
  </motion.span>
  <motion.span className="coming-soon-word-3d" variants={textVariants}>
  M
  </motion.span>
  <motion.span className="coming-soon-word-3d" variants={textVariants}>
  I
  </motion.span>
  <motion.span className="coming-soon-word-3d" variants={textVariants}>
  N
  </motion.span>
  <motion.span className="coming-soon-word-3d" variants={textVariants}>
  G
  </motion.span>
  <motion.span className="coming-soon-word-3d space" variants={textVariants}>
  &nbsp;
  </motion.span>
  <motion.span className="coming-soon-word-3d" variants={textVariants}>
  S
  </motion.span>
  <motion.span className="coming-soon-word-3d" variants={textVariants}>
  O
  </motion.span>
  <motion.span className="coming-soon-word-3d" variants={textVariants}>
  O
  </motion.span>
  <motion.span className="coming-soon-word-3d" variants={textVariants}>
  N
  </motion.span>
  </motion.div>
 

  <motion.p
  className="coming-soon-description"
  variants={descriptionVariants}
  initial="hidden"
  animate="visible"
  >
  Ephemeral moments from our recent events, captured in stunning detail.
  Stay tuned for a visual journey through the highlights.
  </motion.p>
  </div>
  );
 };
 

 export default QuantumGallery;



// import React from 'react';
// import { motion } from 'framer-motion';
// import './QuantumGallery.css'; // Make sure this CSS file exists

// const QuantumGallery = () => {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         delayChildren: 0.5,
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const textVariants = {
//     hidden: { opacity: 0, y: -50, rotateX: -90, scale: 0.8 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       rotateX: 0,
//       scale: 1,
//       transition: {
//         type: 'spring',
//         stiffness: 100,
//         damping: 10,
//       },
//     },
//   };

//   return (
//     <div className="coming-soon-container-3d">
//       <motion.div
//         className="coming-soon-text-wrapper"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <motion.span className="coming-soon-word-3d" variants={textVariants}>
//           C
//         </motion.span>
//         <motion.span className="coming-soon-word-3d" variants={textVariants}>
//           O
//         </motion.span>
//         <motion.span className="coming-soon-word-3d" variants={textVariants}>
//           M
//         </motion.span>
//         <motion.span className="coming-soon-word-3d" variants={textVariants}>
//           I
//         </motion.span>
//         <motion.span className="coming-soon-word-3d" variants={textVariants}>
//           N
//         </motion.span>
//         <motion.span className="coming-soon-word-3d" variants={textVariants}>
//           G
//         </motion.span>
//         <motion.span className="coming-soon-word-3d space" variants={textVariants}>
//           &nbsp;
//         </motion.span>
//         <motion.span className="coming-soon-word-3d" variants={textVariants}>
//           S
//         </motion.span>
//         <motion.span className="coming-soon-word-3d" variants={textVariants}>
//           O
//         </motion.span>
//         <motion.span className="coming-soon-word-3d" variants={textVariants}>
//           O
//         </motion.span>
//         <motion.span className="coming-soon-word-3d" variants={textVariants}>
//           N
//         </motion.span>
//       </motion.div>
//     </div>
//   );
// };

// export default QuantumGallery;