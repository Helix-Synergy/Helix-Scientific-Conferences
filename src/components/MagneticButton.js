import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';

const MagneticButton = ({ children, className }) => {
    const ref = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [particles, setParticles] = useState([]);

    // Use spring values for smooth, magnetic motion
    const mouseX = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
    const mouseY = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });

    // Transform values for the outer button (the magnetic pull)
    const buttonX = useTransform(mouseX, [0, 1], [-15, 15]);
    const buttonY = useTransform(mouseY, [0, 1], [-15, 15]);

    // Transform values for the content (parallax effect)
    const contentX = useTransform(mouseX, [0, 1], [15, -15]);
    const contentY = useTransform(mouseY, [0, 1], [15, -15]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const center = { x: left + width / 2, y: top + height / 2 };
        const distance = Math.sqrt(Math.pow(e.clientX - center.x, 2) + Math.pow(e.clientY - center.y, 2));

        if (distance < 100) {
            mouseX.set((e.clientX - left) / width);
            mouseY.set((e.clientY - top) / height);
            setIsHovered(true);
        } else {
            setIsHovered(false);
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        mouseX.set(0.5);
        mouseY.set(0.5);
    };

    // Particle generation and cleanup logic
    useEffect(() => {
        let interval;
        if (isHovered) {
            interval = setInterval(() => {
                const newParticle = {
                    id: Date.now(),
                    size: Math.random() * 5 + 3, // Random size
                    color: `hsl(${Math.random() * 360}, 100%, 75%)`, // Random bright color
                    initialPosition: {
                        x: (Math.random() - 0.5) * 250, // Start outside the button's horizontal bounds
                        y: (Math.random() - 0.5) * 250, // Start outside the button's vertical bounds
                    }
                };
                setParticles(prev => [...prev, newParticle]);
            }, 50); // Generate a new particle every 50ms
        } else {
            clearInterval(interval);
        }

        // Clean up old particles
        const cleanupInterval = setInterval(() => {
            setParticles(prev => prev.filter(p => Date.now() - p.id < 1000));
        }, 200);

        return () => {
            clearInterval(interval);
            clearInterval(cleanupInterval);
        };
    }, [isHovered]);

    const particleVariants = {
        initial: ({ initialPosition }) => ({
            x: initialPosition.x,
            y: initialPosition.y,
            scale: 0,
            opacity: 0,
        }),
        animate: {
            x: 0,
            y: 0,
            scale: [0, 1, 0],
            opacity: [1, 1, 0],
            transition: {
                duration: 0.8,
                ease: 'easeIn',
                repeat: 0,
            }
        },
        exit: {
            opacity: 0,
        },
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: isHovered ? buttonX.get() : 0, y: isHovered ? buttonY.get() : 0 }}
            className={`group relative z-10 rounded-full transition-all duration-300 transform-gpu overflow-hidden ${className}`}
        >
            {/* The particle animation layer */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence>
                    {particles.map((p) => (
                        <motion.div
                            key={p.id}
                            custom={p}
                            variants={particleVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="absolute rounded-full pointer-events-none"
                            style={{
                                width: p.size,
                                height: p.size,
                                backgroundColor: p.color,
                                transform: 'translate(-50%, -50%)',
                            }}
                        />
                    ))}
                </AnimatePresence>
            </div>
            
            {/* The main button content layer */}
            <motion.div
                className="relative z-10 w-full h-full rounded-full backdrop-blur-lg text-white transition-all duration-300"
                style={{
                    x: isHovered ? contentX.get() : 0,
                    y: isHovered ? contentY.get() : 0
                }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
};

export default MagneticButton;