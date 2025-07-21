// src/components/home/HomeTestimonialsSection.js
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Your testimonial data
const homeTestimonials = [
    {
        id: 1,
        quote: "Thank you, Helix Conferences, for the platform to bring this conversation on Why I Chose to Speak on Digital Dentistry, Cybersecurity & Regulation forward.",
        author: "Srividya Narayanan",
        role: "Northeastern University",
        rating: 5,
        imageUrl: "https://placehold.co/100x100/1E90FF/FFFFFF?text=SN",
    },
    {
        id: 2,
        quote: "I’m humbled to have received this certificate of participation for presenting at the International Conference on Public Health & Nursing, hosted by Helix Conferences.",
        author: "Julie Condliffe",
        role: "Keynote speaker | De Montford University",
        rating: 5,
        imageUrl: "https://placehold.co/100x100/FFD700/000000?text=JC",
    },
    {
        id: 3,
        quote: "Thanks to Helix Conferences for the invitation to keynote this UK morning‘s Public Health Conference with Putting The Bloom on STEM: The Importance of Female Representation in Science and the C-Suite.",
        author: "Amy Gutman",
        role: "CEO & Founder of ToughLoveMD | Keynote Speaker",
        rating: 5,
        imageUrl: "https://placehold.co/100x100/FF69B4/FFFFFF?text=AG",
    },
    {
        id: 4,
        quote: "Grateful to see you today, organized by Helix Conferences in the June 2025 Important Conferences in Public Health and Nursing. Thank you for listening well and for your words of thanks and praise. Thank you Helix Conferences for the good organization and great effort, especially Mike.",
        author: "Esraa Mohamed Elsisy",
        role: "Dietitian, Saudi Arabia",
        rating: 5,
        imageUrl: "https://placehold.co/100x100/8A2BE2/FFFFFF?text=EM",
    },
    {
        id: 5,
        quote: "The energy and intellectual vibrancy at Helix were palpable, even for those of us participating remotely. The blend of cutting-edge Technology and human-centric design made me feel completely connected to the Event. My Session received incredible feedback and sparked follow-up conversations that are already leading to new projects. Helix is an essential Platform for anyone pushing the boundaries in their field.",
        author: "Aisha Sharma",
        role: "Lead Engineer, Future Labs R&D",
        rating: 5,
        imageUrl: "https://placehold.co/100x100/20B2AA/FFFFFF?text=AS",
    },
    {
        id: 6,
        quote: "I was deeply impressed by the diversity of thought and expertise. Helix offers an unparalleled Forum for exchanging groundbreaking Ideas and building a global Network of professionals. I am already looking forward to next year's Conference.",
        author: "Dr. Kenji Tanaka",
        role: "Research Fellow, Tokyo Institute of Technology",
        rating: 5,
        imageUrl: "https://placehold.co/100x100/6A5ACD/FFFFFF?text=KT",
    },
    {
        id: 7,
        quote: "Helix's commitment to creating a seamless digital experience is evident in every detail. As a Speaker, it was reassuring to know that the Technical team had every aspect of the Virtual presentation covered. This Event is a shining example of how Technology can bring people closer.",
        author: "Sophia Rossi",
        role: "Chief Innovation Officer, MetaTech Solutions",
        rating: 5,
        imageUrl: "https://placehold.co/100x100/C0C0C0/000000?text=SR",
    },
    {
        id: 8,
        quote: "The in-person networking at Helix was fantastic. The way the Event facilitated connections between Sponsors, Speakers, and Attendees was second to none. I've made several valuable contacts that are already proving fruitful.",
        author: "Dr. David Kim",
        role: "Director of Product, Nexus Dynamics",
        rating: 5,
        imageUrl: "https://placehold.co/100x100/32CD32/FFFFFF?text=DK",
    },
    {
        id: 9,
        quote: "The quality of the Content and the depth of the Discussions at Helix are truly exceptional. It's a Forum where real, substantive questions are addressed. It's the only Conference I attend annually without hesitation.",
        author: "Grace Adebayo",
        role: "Senior Consultant, Strategic Futures",
        rating: 5,
        imageUrl: "https://placehold.co/100x100/FF4500/FFFFFF?text=GA",
    },
    {
        id: 10,
        quote: "I presented my research virtually and the experience was flawless. The Helix Platform is intuitive and the engagement tools for the Audience are outstanding. It's truly a next-generation Conference.",
        author: "Dr. Chloe Martin",
        role: "Postdoctoral Researcher, Institute for Applied Sciences",
        rating: 5,
        imageUrl: "https://placehold.co/100x100/800080/FFFFFF?text=CM",
    },
];

// Helper component to render stars
const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span
        key={i}
        className={`text-xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    );
  }
  return <div className="flex justify-center">{stars}</div>;
};

const HomeTestimonialsSection = () => {
    // State to hold the current order of testimonials for the stack
    const [testimonials, setTestimonials] = useState(homeTestimonials);
    // State to track the index of the testimonial in the original homeTestimonials array
    const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
    const intervalRef = useRef(null);

    // Function to restart the automatic timer
    const startTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(() => {
            // Move the first card to the end of the array
            setTestimonials(prev => [...prev.slice(1), prev[0]]);
            // Update the index for the buttons
            setActiveTestimonialIndex(prevIndex => (prevIndex + 1) % homeTestimonials.length);
        }, 5000);
    };

    // Main useEffect for managing the automatic timer
    useEffect(() => {
        startTimer();
        return () => clearInterval(intervalRef.current);
    }, []);

    // Function to handle clicks on the cards or indicator buttons
    const handleNavigation = (clickedTestimonial) => {
        clearInterval(intervalRef.current); // Pause timer on manual interaction
        
        // Find the new active index from the original array
        const newIndex = homeTestimonials.findIndex(t => t.id === clickedTestimonial.id);
        setActiveTestimonialIndex(newIndex);
        
        // Reorder the stack based on the clicked testimonial
        const newOrder = homeTestimonials.filter(t => t.id !== clickedTestimonial.id);
        setTestimonials([clickedTestimonial, ...newOrder]);
        
        startTimer(); // Restart timer after a brief delay
    };

    // Function to handle the drag and reorder logic
    const handleDragEnd = (draggedId, _, info) => {
        clearInterval(intervalRef.current); // Pause timer on drag start
        
        const dragThreshold = 50;
        if (Math.abs(info.offset.y) > dragThreshold || Math.abs(info.offset.x) > dragThreshold) {
            // Find the index of the dragged card in the current state array
            const draggedIndex = testimonials.findIndex(t => t.id === draggedId);
            
            // Make a copy to avoid mutating state directly
            const newOrder = [...testimonials];
            
            // Remove the dragged card from its original position
            const [draggedCard] = newOrder.splice(draggedIndex, 1);
            
            // Add the dragged card to the end of the array
            newOrder.push(draggedCard);

            // Update the state with the new order
            setTestimonials(newOrder);

            // Update the active index for the buttons based on the original data
            const newActiveIndex = homeTestimonials.findIndex(t => t.id === draggedId);
            setActiveTestimonialIndex(newActiveIndex);
        }
        
        startTimer(); // Restart timer on drag end
    };
    
    const activeTestimonial = testimonials[0];

    return (
        <section
            className="py-12 md:py-16 min-h-[60vh] md:min-h-[70vh] flex flex-col items-center justify-center overflow-hidden"
            style={{
                background: 'radial-gradient(at 70% 30%,rgba(93, 0, 215, 0.44),rgba(0, 127, 166, 0.49),rgba(9, 2, 38, 0.52))',
            }}
        >
            <div className="container mx-auto px-4">
                <div className="text-center md:text-left max-w-4xl mx-auto mb-8 text-white">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">
                        What People Speak About <span className="text-blue-300">Helix</span>
                    </h2>
                    <p className="text-base md:text-lg">
                        Helix Conferences are known for their focus on cutting-edge topics and global collaboration.
                        Explore themes like AI, robotics, IoT, and digital transformation, with discussions on their
                        societal and ethical impacts.
                    </p>
                </div>

                {/* Main Testimonial Section */}
                <div className="relative flex flex-col md:flex-row items-center justify-center p-6 md:p-10 rounded-2xl max-w-5xl mx-auto my-8">
                    {/* Left side: Ordered Stack of Cards */}
                    <div className="w-full md:w-1/2 p-4 md:p-6 flex items-center justify-center h-72 md:h-80 relative">
                        <div className="w-52 h-72 md:w-64 md:h-80 relative flex items-center justify-center">
                            <AnimatePresence initial={false}>
                                {testimonials.slice(0, 5).map((testimonial, index) => (
                                    <motion.div
                                        key={testimonial.id}
                                        className="absolute w-full h-full cursor-pointer flex items-center justify-center p-4 rounded-xl shadow-lg text-white"
                                        onClick={() => handleNavigation(testimonial)}
                                        drag
                                        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                        dragElastic={0.5}
                                        onDragEnd={(event, info) => handleDragEnd(testimonial.id, event, info)}
                                        onDragStart={() => clearInterval(intervalRef.current)}
                                        animate={{
                                            scale: 1 - (index * 0.1),
                                            y: index * 20,
                                            rotate: (Math.random() - 0.5) * 10,
                                            zIndex: 5 - index,
                                            opacity: 1,
                                        }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 300,
                                            damping: 30,
                                        }}
                                        style={{
                                          backgroundColor:`white`,
                                            // background: `linear-gradient(to bottom right, rgba(0, 0, 128, 0.7), rgba(64, 224, 208, 0.7))`,
                                        }}
                                    >
                                        <div className="flex flex-col items-center text-center">
                                            <img
                                                src={testimonial.imageUrl}
                                                alt={testimonial.author}
                                                className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover mb-2"
                                            />
                                            <p className="font-semibold text-black text-sm md:text-base">{testimonial.author}</p>
                                            <p className="text-xs text-black mt-1">{testimonial.role}</p>
                                            <div className="mt-2">
                                                <StarRating rating={testimonial.rating} />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right side: Main Testimonial Display */}
                    <div 
                        className="w-full md:w-1/2 p-4 md:p-6 flex flex-col items-center md:items-start text-center md:text-left transition-all duration-500"
                        style={{
                            // background: 'rgba(255, 255, 255, 0)', // Frosted glass effect
                            // background: 'linear-gradient(to bottom right, rgba(255, 100, 50, 0.7), rgba(255, 180, 100, 0.7))',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '16px',
                            // border: '1px solid rgba(255, 255, 255, 0.4)',
                            // boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            padding: '2rem'
                        }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTestimonial.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col items-center md:items-start"
                            >
                                <img
                                    src={activeTestimonial.imageUrl}
                                    alt={activeTestimonial.author}
                                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-white shadow-md mb-4"
                                />
                                <div className="max-w-sm h-32 overflow-y-auto pr-2 mb-4 scrollbar-custom">
                                    <p className="text-base md:text-lg text-gray-800 italic font-light">
                                        "{activeTestimonial.quote}"
                                    </p>
                                </div>
                                <p className="font-bold text-gray-900 text-base md:text-lg">{activeTestimonial.author}</p>
                                <p className="text-xs text-gray-500">{activeTestimonial.role}</p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Indicator Buttons */}
                <div className="flex justify-center mt-4 space-x-2">
                    {homeTestimonials.map((testimonial, index) => (
                        <button
                            key={index}
                            onClick={() => handleNavigation(testimonial)}
                            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                                index === activeTestimonialIndex ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                        />
                    ))}
                </div>

                <div className="text-center mt-6">
                    <Link to="/testimonials">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full text-base transition duration-300 ease-in-out transform hover:scale-105">
                            View All Testimonials
                        </button>
                    </Link>
                </div>
            </div>

            {/* Custom Scrollbar CSS */}
            <style>{`
    .hide-scrollbar {
        /* For IE, Edge */
        -ms-overflow-style: none;
        /* For Firefox */
        scrollbar-width: none;
    }
    
    .hide-scrollbar::-webkit-scrollbar {
        /* For Chrome, Safari */
        display: none;
    }
`}</style>
        </section>
    );
};

export default HomeTestimonialsSection;





// // src/components/home/HomeTestimonialsSection.js
// import React, { useState, useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';

// // Your testimonial data
// const homeTestimonials = [
//     {
//         id: 1,
//         quote: "Speaking at Helix Conferences was an unparalleled experience. The Hybrid format was a masterclass in seamless Integration; the Virtual Audience was as engaged and interactive as those in the room. The Technical Support was flawless, allowing me to focus entirely on my presentation. This isn't just a Conference; it's a new standard for academic and industry Collaboration.",
//         author: "Dr. Evelyn Reed",
//         role: "Senior Researcher, Quantum Insights Lab",
//         rating: 5,
//         imageUrl: "https://placehold.co/100x100/1E90FF/FFFFFF?text=ER",
//     },
//     {
//         id: 2,
//         quote: "The curation of Speakers and topics at Helix is truly world-class. The discussions were rich, challenging, and forward-thinking. I left with a renewed sense of purpose and a network of brilliant minds that I'm confident will lead to groundbreaking Collaborations. Helix fosters a Community of innovation that is rare to find.",
//         author: "Professor James Chen",
//         role: "Head of AI Ethics Department, Aurora University",
//         rating: 5,
//         imageUrl: "https://placehold.co/100x100/FFD700/000000?text=JC",
//     },
//     {
//         id: 3,
//         quote: "As a Speaker, I've seen many Conferences, but Helix stands out for its meticulous organization and genuine commitment to participant engagement. The Platform for Virtual Attendees was intuitive and powerful, ensuring my message reached a Global Audience without compromise. It felt less like a presentation and more like a Global dialogue. I highly recommend it to anyone looking to share their work with the world's best.",
//         author: "Maria Fernandez",
//         role: "CEO & Founder, Synapse Technologies",
//         rating: 5,
//         imageUrl: "https://placehold.co/100x100/FF69B4/FFFFFF?text=MF",
//     },
//     {
//         id: 4,
//         quote: "Helix Conferences has redefined the speaking experience for me. From the pre-conference communication to the on-site Support, every detail was handled with precision. The Networking opportunities, both structured and spontaneous, were incredibly valuable. I not only presented my latest findings but also learned a tremendous amount from my peers. A truly exceptional Event.",
//         author: "Dr. Benjamin Carter",
//         role: "Chief Data Scientist, InnovateX Corp.",
//         rating: 5,
//         imageUrl: "https://placehold.co/100x100/8A2BE2/FFFFFF?text=BC",
//     },
//     {
//         id: 5,
//         quote: "The energy and intellectual vibrancy at Helix were palpable, even for those of us participating remotely. The blend of cutting-edge Technology and human-centric design made me feel completely connected to the Event. My Session received incredible feedback and sparked follow-up conversations that are already leading to new projects. Helix is an essential Platform for anyone pushing the boundaries in their field.",
//         author: "Aisha Sharma",
//         role: "Lead Engineer, Future Labs R&D",
//         rating: 5,
//         imageUrl: "https://placehold.co/100x100/20B2AA/FFFFFF?text=AS",
//     },
//     {
//         id: 6,
//         quote: "I was deeply impressed by the diversity of thought and expertise. Helix offers an unparalleled Forum for exchanging groundbreaking Ideas and building a global Network of professionals. I am already looking forward to next year's Conference.",
//         author: "Dr. Kenji Tanaka",
//         role: "Research Fellow, Tokyo Institute of Technology",
//         rating: 5,
//         imageUrl: "https://placehold.co/100x100/6A5ACD/FFFFFF?text=KT",
//     },
//     {
//         id: 7,
//         quote: "Helix's commitment to creating a seamless digital experience is evident in every detail. As a Speaker, it was reassuring to know that the Technical team had every aspect of the Virtual presentation covered. This Event is a shining example of how Technology can bring people closer.",
//         author: "Sophia Rossi",
//         role: "Chief Innovation Officer, MetaTech Solutions",
//         rating: 5,
//         imageUrl: "https://placehold.co/100x100/C0C0C0/000000?text=SR",
//     },
//     {
//         id: 8,
//         quote: "The in-person networking at Helix was fantastic. The way the Event facilitated connections between Sponsors, Speakers, and Attendees was second to none. I've made several valuable contacts that are already proving fruitful.",
//         author: "Dr. David Kim",
//         role: "Director of Product, Nexus Dynamics",
//         rating: 5,
//         imageUrl: "https://placehold.co/100x100/32CD32/FFFFFF?text=DK",
//     },
//     {
//         id: 9,
//         quote: "The quality of the Content and the depth of the Discussions at Helix are truly exceptional. It's a Forum where real, substantive questions are addressed. It's the only Conference I attend annually without hesitation.",
//         author: "Grace Adebayo",
//         role: "Senior Consultant, Strategic Futures",
//         rating: 5,
//         imageUrl: "https://placehold.co/100x100/FF4500/FFFFFF?text=GA",
//     },
//     {
//         id: 10,
//         quote: "I presented my research virtually and the experience was flawless. The Helix Platform is intuitive and the engagement tools for the Audience are outstanding. It's truly a next-generation Conference.",
//         author: "Dr. Chloe Martin",
//         role: "Postdoctoral Researcher, Institute for Applied Sciences",
//         rating: 5,
//         imageUrl: "https://placehold.co/100x100/800080/FFFFFF?text=CM",
//     },
// ];

// // Helper component to render stars
// const StarRating = ({ rating }) => {
//   const stars = [];
//   for (let i = 0; i < 5; i++) {
//     stars.push(
//       <span
//         key={i}
//         className={`text-xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
//       >
//         ★
//       </span>
//     );
//   }
//   return <div className="flex justify-center">{stars}</div>;
// };

// const HomeTestimonialsSection = () => {
//     // State to hold the current order of testimonials for the stack
//     const [testimonials, setTestimonials] = useState(homeTestimonials);
//     // State to track the index of the testimonial in the original homeTestimonials array
//     const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
//     const intervalRef = useRef(null);

//     // Function to restart the automatic timer
//     const startTimer = () => {
//         if (intervalRef.current) {
//             clearInterval(intervalRef.current);
//         }
//         intervalRef.current = setInterval(() => {
//             // Move the first card to the end of the array
//             setTestimonials(prev => [...prev.slice(1), prev[0]]);
//             // Update the index for the buttons
//             setActiveTestimonialIndex(prevIndex => (prevIndex + 1) % homeTestimonials.length);
//         }, 5000);
//     };

//     // Main useEffect for managing the automatic timer
//     useEffect(() => {
//         startTimer();
//         return () => clearInterval(intervalRef.current);
//     }, []);

//     // Function to handle clicks on the cards or indicator buttons
//     const handleNavigation = (clickedTestimonial) => {
//         clearInterval(intervalRef.current); // Pause timer on manual interaction
        
//         // Find the new active index from the original array
//         const newIndex = homeTestimonials.findIndex(t => t.id === clickedTestimonial.id);
//         setActiveTestimonialIndex(newIndex);
        
//         // Reorder the stack based on the clicked testimonial
//         const newOrder = homeTestimonials.filter(t => t.id !== clickedTestimonial.id);
//         setTestimonials([clickedTestimonial, ...newOrder]);
        
//         startTimer(); // Restart timer after a brief delay
//     };

//     // Function to handle the drag and reorder logic
//     const handleDragEnd = (draggedId, _, info) => {
//         clearInterval(intervalRef.current); // Pause timer on drag start
        
//         const dragThreshold = 50;
//         if (Math.abs(info.offset.y) > dragThreshold || Math.abs(info.offset.x) > dragThreshold) {
//             // Find the index of the dragged card in the current state array
//             const draggedIndex = testimonials.findIndex(t => t.id === draggedId);
            
//             // Make a copy to avoid mutating state directly
//             const newOrder = [...testimonials];
            
//             // Remove the dragged card from its original position
//             const [draggedCard] = newOrder.splice(draggedIndex, 1);
            
//             // Add the dragged card to the end of the array
//             newOrder.push(draggedCard);

//             // Update the state with the new order
//             setTestimonials(newOrder);

//             // Update the active index for the buttons based on the original data
//             const newActiveIndex = homeTestimonials.findIndex(t => t.id === draggedId);
//             setActiveTestimonialIndex(newActiveIndex);
//         }
        
//         startTimer(); // Restart timer on drag end
//     };
    
//     const activeTestimonial = testimonials[0];

//     return (
//         <section
//             className="py-16 md:py-24 overflow-hidden"
//             style={{
//                 background: 'linear-gradient(to right, #4A2868, #2E659A, #6A5ACD, #8A2BE2)',
//             }}
//         >
//             <div className="container mx-auto px-4">
//                 <div className="text-center md:text-left max-w-4xl mx-auto mb-12 text-white">
//                     <h2 className="text-4xl md:text-5xl font-bold mb-4">
//                         What People Speak About <span className="text-blue-300">Helix</span>
//                     </h2>
//                     <p className="text-lg">
//                         Helix Conferences are known for their focus on cutting-edge topics and global collaboration.
//                         Explore themes like AI, robotics, IoT, and digital transformation, with discussions on their
//                         societal and ethical impacts.
//                     </p>
//                 </div>

//                 {/* Main Testimonial Section */}
//                 <div className="relative flex flex-col md:flex-row items-center justify-center p-8 md:p-16 bg-white rounded-2xl shadow-xl max-w-6xl mx-auto my-10">
//                     {/* Left side: Ordered Stack of Cards */}
//                     <div className="w-full md:w-1/2 p-4 md:p-8 flex items-center justify-center h-96 relative">
//                         <div className="w-60 h-80 md:w-72 md:h-96 relative flex items-center justify-center">
//                             <AnimatePresence initial={false}>
//                                 {testimonials.slice(0, 5).map((testimonial, index) => (
//                                     <motion.div
//                                         key={testimonial.id}
//                                         className="absolute w-full h-full cursor-pointer flex items-center justify-center p-4 rounded-xl shadow-lg"
//                                         onClick={() => handleNavigation(testimonial)}
//                                         drag
//                                         dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
//                                         dragElastic={0.5}
//                                         onDragEnd={(event, info) => handleDragEnd(testimonial.id, event, info)}
//                                         onDragStart={() => clearInterval(intervalRef.current)}
//                                         style={{
//                                             background: `linear-gradient(to bottom right, rgba(255, 255, 255, 0.95), rgba(240, 240, 240, 0.8))`,
//                                         }}
//                                         animate={{
//                                             scale: 1 - (index * 0.1),
//                                             y: index * 20,
//                                             rotate: (Math.random() - 0.5) * 10,
//                                             zIndex: 5 - index,
//                                             opacity: 1,
//                                         }}
//                                         transition={{
//                                             type: 'spring',
//                                             stiffness: 300,
//                                             damping: 30,
//                                         }}
//                                     >
//                                         <div className="flex flex-col items-center text-center">
//                                             <img
//                                                 src={testimonial.imageUrl}
//                                                 alt={testimonial.author}
//                                                 className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover mb-4"
//                                             />
//                                             <p className="font-semibold text-gray-800">{testimonial.author}</p>
//                                             <p className="text-xs text-gray-500 mt-1">{testimonial.role}</p>
//                                             <div className="mt-2">
//                                                 <StarRating rating={testimonial.rating} />
//                                             </div>
//                                         </div>
//                                     </motion.div>
//                                 ))}
//                             </AnimatePresence>
//                         </div>
//                     </div>

//                     {/* Right side: Main Testimonial Display */}
//                     <div className="w-full md:w-1/2 p-4 md:p-8 flex flex-col items-center md:items-start text-center md:text-left transition-all duration-500">
//                         <AnimatePresence mode="wait">
//                             <motion.div
//                                 key={activeTestimonial.id}
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 exit={{ opacity: 0, y: -20 }}
//                                 transition={{ duration: 0.3 }}
//                                 className="flex flex-col items-center md:items-start"
//                             >
//                                 <img
//                                     src={activeTestimonial.imageUrl}
//                                     alt={activeTestimonial.author}
//                                     className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-md mb-6"
//                                 />
//                                 <div className="max-w-md h-40 overflow-y-auto pr-2 mb-4 scrollbar-custom">
//                                     <p className="text-xl text-gray-800 italic font-light">
//                                         "{activeTestimonial.quote}"
//                                     </p>
//                                 </div>
//                                 <p className="font-bold text-gray-900 text-lg md:text-xl">{activeTestimonial.author}</p>
//                                 <p className="text-sm text-gray-500">{activeTestimonial.role}</p>
//                             </motion.div>
//                         </AnimatePresence>
//                     </div>
//                 </div>

//                 {/* Indicator Buttons */}
//                 <div className="flex justify-center mt-4 space-x-2">
//                     {homeTestimonials.map((testimonial, index) => (
//                         <button
//                             key={index}
//                             onClick={() => handleNavigation(testimonial)}
//                             className={`w-3 h-3 rounded-full transition-colors duration-300 ${
//                                 index === activeTestimonialIndex ? 'bg-blue-600' : 'bg-gray-300'
//                             }`}
//                         />
//                     ))}
//                 </div>

//                 <div className="text-center mt-8">
//                     <Link to="/testimonials">
//                         <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105">
//                             View All Testimonials
//                         </button>
//                     </Link>
//                 </div>
//             </div>

//             {/* Custom Scrollbar CSS */}
//             <style>{`
//                 .scrollbar-custom::-webkit-scrollbar {
//                     width: 8px;
//                 }
//                 .scrollbar-custom::-webkit-scrollbar-track {
//                     background: #f1f1f1;
//                     border-radius: 10px;
//                 }
//                 .scrollbar-custom::-webkit-scrollbar-thumb {
//                     background: #4A2868;
//                     border-radius: 10px;
//                 }
//                 .scrollbar-custom::-webkit-scrollbar-thumb:hover {
//                     background: #2E659A;
//                 }
//                 .scrollbar-custom {
//                     scrollbar-width: thin;
//                     scrollbar-color: #4A2868 #f1f1f1;
//                 }
//             `}</style>
//         </section>
//     );
// };

// export default HomeTestimonialsSection;