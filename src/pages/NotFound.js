import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Link, useNavigate } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/outline';
import LostChar from '../assets/images/lostChar.png'

const NotFound = () => {
    const navigate = useNavigate();
    const sceneRef = useRef(null);
    const bgLayerRef = useRef(null);
    const midLayerRef = useRef(null);
    const fgLayerRef = useRef(null);
    const characterRef = useRef(null);

    const [isHovering, setIsHovering] = useState(false);

    // --- Parallax Effect ---
    useEffect(() => {
        const scene = sceneRef.current;
        const bg = bgLayerRef.current;
        const mid = midLayerRef.current;
        const fg = fgLayerRef.current;

        if (!scene || !bg || !mid || !fg) return;

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { offsetWidth, offsetHeight } = scene;
            const mouseX = (clientX / offsetWidth) - 0.5;
            const mouseY = (clientY / offsetHeight) - 0.5;

            gsap.to(bg, {
                x: -mouseX * 20,
                y: -mouseY * 20,
                duration: 0.8,
                ease: "power3.out"
            });

            gsap.to(mid, {
                x: -mouseX * 40,
                y: -mouseY * 40,
                duration: 0.8,
                ease: "power3.out"
            });

            gsap.to(fg, {
                x: -mouseX * 60,
                y: -mouseY * 60,
                duration: 0.8,
                ease: "power3.out"
            });
        };

        scene.addEventListener('mousemove', handleMouseMove);

        return () => {
            scene.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // --- Camera Pan Animation on Go Home Click ---
    const handleGoHomeClick = () => {
        gsap.to(sceneRef.current, {
            scale: 1.5,
            x: '50%',
            y: '5%',
            opacity: 0,
            duration: 1.5,
            ease: "power3.inOut",
            onComplete: () => {
                navigate('/');
            }
        });
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 to-indigo-900 flex items-center justify-center text-white p-4">
            {/* Animated Background Grid */}
            <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1541701490217-10f781e97491?q=80&w=1770&auto=format&fit=crop)' }}></div>

            {/* Main Scene Container for Parallax */}
            <div ref={sceneRef} className="relative w-full h-[calc(100vh-80px)] max-w-6xl mx-auto flex items-center justify-center perspective-[1000px] transform-style-preserve-3d">
                {/* Background Layer (Conference Hall Stage) */}
                <div ref={bgLayerRef} className="absolute inset-0 flex items-center justify-center">
                    <img src="https://img.freepik.com/free-vector/conference-hall-stage-presentation-scene_33099-1886.jpg" alt="Background" className="w-full h-full object-cover opacity-60" />
                </div>

                {/* Midground Layer (Online Video Conference) */}
                <div ref={midLayerRef} className="absolute inset-0 flex items-center justify-center">
                    <img src="" alt="Midground" className="w-3/4 h-3/4 object-contain opacity-80" />
                </div>

                {/* Foreground Layer (Character, Text, Button) */}
                <div ref={fgLayerRef} className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                    <motion.img
                        ref={characterRef}
                        src={LostChar}
                        alt="Lost Character"
                        className="w-32 h-32 md:w-48 md:h-48 mb-8 z-20 drop-shadow-lg rounded-full"
                        initial={{ y: 0 }}
                        animate={{ y: isHovering ? [0, -20, 0] : 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    />

                    <motion.h1 
                        className="text-5xl md:text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 drop-shadow-lg"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        Oops, Wrong Room!
                    </motion.h1>
                    <motion.p 
                        className="text-lg md:text-xl max-w-2xl text-gray-300 mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                    >
                        The session is happening over here. Let me show you the way back to the main hall.
                    </motion.p>

                    <motion.button
                        onClick={() => navigate('/')}
                        className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white rounded-full overflow-hidden shadow-lg transition-all duration-300 ease-out bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                        onHoverStart={() => setIsHovering(true)}
                        onHoverEnd={() => setIsHovering(false)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <HomeIcon className="w-6 h-6 mr-3" /> Go Back Home
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;