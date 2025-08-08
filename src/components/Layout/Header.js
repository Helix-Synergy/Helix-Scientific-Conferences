import React, { useState, useRef, useEffect, useCallback } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    HomeIcon,
    BookOpenIcon,
    SparklesIcon,
    PencilSquareIcon,
    NewspaperIcon,
    EnvelopeIcon,
    TicketIcon,
    PhotoIcon,
    ComputerDesktopIcon,
    MicrophoneIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { useCursor } from "../CustomCursor";
import AnimatedHamburger from '../hamburger/AnimatedHamburger_AccordionFold';
import Logo from '../../assets/images/Header-logo.png';

// Fix for the deprecated motion() warning.
// Using motion.create() is the new recommended way.
// This component is now used in the desktop navigation below.
const MotionNavLink = motion.create(NavLink);

// Variants for the mobile/main menu container (orchestrates children animation)
const mobileMenuContainerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.08,
            delayChildren: 0.2,
            duration: 0.3,
            ease: "easeOut"
        }
    },
    exit: {
        opacity: 0,
        y: -50,
        transition: {
            when: "afterChildren",
            staggerChildren: 0.05,
            staggerDirection: -1,
            duration: 0.2
        }
    }
};

// Variants for individual mobile menu items (Cascading Fade-Up with Spring)
const mobileMenuItemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 12,
            duration: 0.4
        }
    },
    exit: {
        opacity: 0,
        y: 25,
        transition: {
            duration: 0.2
        }
    }
};

// Variants for desktop secondary dropdown menu
const desktopDropdownVariants = {
    hidden: { opacity: 0, y: -10, scaleY: 0.9, originY: "top" },
    visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, scaleY: 0.9, transition: { duration: 0.15, ease: "easeIn" } },
};

function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDesktopSecondaryMenuOpen, setIsDesktopSecondaryMenuOpen] = useState(false);
    const location = useLocation();
    const { setCursorVariant } = useCursor();

    const [indicatorStyle, setIndicatorStyle] = useState({
        left: 0,
        width: 0,
        opacity: 0,
    });
    const navRefs = useRef({});
    const navContainerRef = useRef(null);
    const secondaryMenuRef = useRef(null);

    const isNavLinkActive = useCallback((path) => {
        return location.pathname.startsWith(path);
    }, [location.pathname]);

    // Function to find the currently active link element for the indicator
    const getActiveLinkElement = useCallback(() => {
        const primaryPaths = ["/", "/about", "/hybrids", "/webinars", "/gallery", "/blog", "/buy-a-ticket", "/testimonials", "/journals", "/contact"];
        const sortedPrimaryPaths = primaryPaths.sort((a, b) => b.length - a.length); // Longer paths first for better match

        for (const path of sortedPrimaryPaths) {
            if (isNavLinkActive(path) && navRefs.current[path]) {
                return navRefs.current[path];
            }
        }
        return null;
    }, [isNavLinkActive]);


    const updateIndicator = useCallback((element) => {
        if (navContainerRef.current && element) {
            const navRect = navContainerRef.current.getBoundingClientRect();
            const itemRect = element.getBoundingClientRect();

            setIndicatorStyle({
                left: itemRect.left - navRect.left,
                width: itemRect.width,
                opacity: 1,
            });
        } else {
            setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
        }
    }, []);

    // Fix: Wrap `handleLinkMouseEnter` and `handleLinkMouseLeave` in useCallback
    const handleLinkMouseEnter = useCallback(() => setCursorVariant("interactive"), [setCursorVariant]);
    const handleLinkMouseLeave = useCallback(() => setCursorVariant("default"), [setCursorVariant]);

    // Function to handle onMouseLeave for NavLinks to revert indicator
    const handleNavLinkMouseLeave = useCallback(() => {
        handleLinkMouseLeave(); // Reset cursor variant
        const activeLinkElement = getActiveLinkElement(); // Get the currently active link
        if (activeLinkElement) {
            updateIndicator(activeLinkElement); // Update indicator to active link
        } else {
            setIndicatorStyle((prev) => ({ ...prev, opacity: 0 })); // Hide if no active link
        }
    }, [getActiveLinkElement, updateIndicator, handleLinkMouseLeave]);

    // Effect to set indicator on initial load and path change
    useEffect(() => {
        const setActiveIndicator = () => {
            const activeLinkElement = getActiveLinkElement();
            if (activeLinkElement) {
                updateIndicator(activeLinkElement);
            } else {
                setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
            }
        };

        const timer = setTimeout(setActiveIndicator, 100); // Small delay to ensure refs are ready
        window.addEventListener("resize", setActiveIndicator);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", setActiveIndicator);
        };
    }, [location.pathname, updateIndicator, getActiveLinkElement]); // Depend on getActiveLinkElement

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (secondaryMenuRef.current && !secondaryMenuRef.current.contains(event.target)) {
                setIsDesktopSecondaryMenuOpen(false);
            }
        };

        if (isDesktopSecondaryMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDesktopSecondaryMenuOpen]);

    const mobileNavLinkClasses = (path) => {
        const isActive = isNavLinkActive(path);
        return `flex items-center px-6 py-4 text-xl font-medium border-b border-gray-200 h-16 w-full group
      text-black ${isActive ? "bg-gray-100" : "hover:bg-gray-100"}
      transition-colors duration-200`;
    };

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300
              py-4 min-h-[80px] flex justify-between items-center px-6
              bg-white backdrop-blur-xl border-b border-white/30 shadow-lg`}
        >
            <Link
                to="/"
                className="flex items-center animate-fade-in-down z-20"
                style={{ animationDelay: "0.1s" }}
                onMouseEnter={handleLinkMouseEnter}
                onMouseLeave={handleLinkMouseLeave}
            >
                <img
                    src={Logo}
                    alt="Helix Conferences Logo"
                    className="h-12"
                    loading="lazy"
                />
            </Link>

            {/* Desktop Primary Navigation (visible on large screens, hides responsively) */}
            <nav
                ref={navContainerRef}
                className="relative hidden lg:flex items-center h-full"
            >
                {/* Page Indicator */}
                <span
                    className="absolute top-0 bottom-0 bg-transparent rounded-full transition-all duration-300 ease-in-out z-10"
                    style={{
                        left: indicatorStyle.left,
                        width: indicatorStyle.width,
                        opacity: indicatorStyle.opacity,
                        boxShadow: '0 0 10px rgba(143, 255, 105, 0.26), 0 0 20px rgb(84, 105, 8), 0 0 30px rgba(235, 138, 47, 0.45)',
                        background: '#ffffff',
                    }}
                ></span>


                {/* Home */}
                <MotionNavLink // <-- CHANGE 1: Use MotionNavLink
                    to="/"
                    className={`
            relative h-full flex items-center justify-center
            text-black text-base font-semibold whitespace-nowrap px-4 py-2 z-20 group
          `}
                    onMouseEnter={(e) => { updateIndicator(e.currentTarget); handleLinkMouseEnter(); }}
                    onMouseLeave={handleNavLinkMouseLeave}
                    ref={(el) => (navRefs.current["/"] = el)}
                >
                    <HomeIcon className="h-5 w-5 mr-1 text-black group-hover:rotate-[380deg] transition-transform duration-200" />
                    Home
                </MotionNavLink>

                {/* About */}
                <MotionNavLink // <-- CHANGE 1: Use MotionNavLink
                    to="/about"
                    className={`
            relative h-full flex items-center justify-center
            text-black text-base font-semibold whitespace-nowrap px-4 py-2 z-20 group
          `}
                    onMouseEnter={(e) => { updateIndicator(e.currentTarget); handleLinkMouseEnter(); }}
                    onMouseLeave={handleNavLinkMouseLeave}
                    ref={(el) => (navRefs.current["/about"] = el)}
                >
                    <BookOpenIcon className="h-5 w-5 mr-1 text-black group-hover:rotate-[380deg] transition-transform duration-200" />
                    About Us
                </MotionNavLink>

                {/* Hybrids */}
                <MotionNavLink // <-- CHANGE 1: Use MotionNavLink
                    to="/hybrids"
                    className={`
            relative h-full flex items-center justify-center
            text-black text-base font-semibold whitespace-nowrap px-4 py-2 z-20 group
          `}
                    onMouseEnter={(e) => { updateIndicator(e.currentTarget); handleLinkMouseEnter(); }}
                    onMouseLeave={handleNavLinkMouseLeave}
                    ref={(el) => (navRefs.current["/hybrids"] = el)}
                >
                    <MicrophoneIcon className="h-5 w-5 mr-1 text-black group-hover:rotate-[380deg] transition-transform duration-200" />
                    Hybrids
                </MotionNavLink>

                {/* Webinars */}
                <MotionNavLink // <-- CHANGE 1: Use MotionNavLink
                    to="/webinars"
                    className={`
            relative h-full flex items-center justify-center
            text-black text-base font-semibold whitespace-nowrap px-4 py-2 z-20 group
          `}
                    onMouseEnter={(e) => { updateIndicator(e.currentTarget); handleLinkMouseEnter(); }}
                    onMouseLeave={handleNavLinkMouseLeave}
                    ref={(el) => (navRefs.current["/webinars"] = el)}
                >
                    <ComputerDesktopIcon className="h-5 w-5 mr-1 text-black group-hover:rotate-[380deg] transition-transform duration-200" />
                    Webinars
                </MotionNavLink>

                {/* Gallery */}
                <MotionNavLink // <-- CHANGE 1: Use MotionNavLink
                    to="/gallery"
                    className={`
            relative h-full flex items-center justify-center
            text-black text-base font-semibold whitespace-nowrap px-4 py-2 z-20 group
          `}
                    onMouseEnter={(e) => { updateIndicator(e.currentTarget); handleLinkMouseEnter(); }}
                    onMouseLeave={handleNavLinkMouseLeave}
                    ref={(el) => (navRefs.current["/gallery"] = el)}
                >
                    <PhotoIcon className="h-5 w-5 mr-1 text-black group-hover:rotate-[380deg] transition-transform duration-200" />
                    Gallery
                </MotionNavLink>

                {/* Blog */}
                <MotionNavLink // <-- CHANGE 1: Use MotionNavLink
                    to="/blog"
                    className={`
            relative h-full flex items-center justify-center
            text-black text-base font-semibold whitespace-nowrap px-4 py-2 z-20 group
          `}
                    onMouseEnter={(e) => { updateIndicator(e.currentTarget); handleLinkMouseEnter(); }}
                    onMouseLeave={handleNavLinkMouseLeave}
                    ref={(el) => (navRefs.current["/blog"] = el)}
                >
                    <PencilSquareIcon className="h-5 w-5 mr-1 text-black group-hover:rotate-[380deg] transition-transform duration-200" />
                    Blog
                </MotionNavLink>

                {/* Buy A Ticket (Desktop - styled as a normal NavLink) */}
                <MotionNavLink // <-- CHANGE 1: Use MotionNavLink
                    to="/buy-a-ticket"
                    className={`
            relative h-full flex items-center justify-center
            text-black text-base font-semibold whitespace-nowrap px-4 py-2 z-20 group ml-4
          `}
                    onMouseEnter={(e) => { updateIndicator(e.currentTarget); handleLinkMouseEnter(); }}
                    onMouseLeave={handleNavLinkMouseLeave}
                    ref={(el) => (navRefs.current["/buy-a-ticket"] = el)}
                >
                    <TicketIcon className="h-5 w-5 mr-1 text-black group-hover:rotate-[380deg] transition-transform duration-200" />
                    Buy A Ticket
                </MotionNavLink>
            </nav>

            {/* Right-aligned container for mobile Buy A Ticket and both Hamburger menus */}
            <div className="flex items-center space-x-4 z-20">
                {/* Mobile Buy A Ticket Button/Link (visible only on small/medium screens) */}
                <NavLink
                    to="/buy-a-ticket"
                    className={`
            md:flex lg:hidden items-center justify-center px-4 py-2
            text-black text-base font-semibold whitespace-nowrap
            hover:text-blue-600 transition-colors duration-200
          `}
                    onMouseEnter={handleLinkMouseEnter}
                    onMouseLeave={handleLinkMouseLeave}
                >
                    <TicketIcon className="h-5 w-5 text-black hover:text-blue-600 transition-colors duration-200" />
                    {/* Removed "Ticket" text for mobile view */}
                </NavLink>

                {/* Desktop Secondary Hamburger (visible only on large screens) */}
                <div className="hidden lg:flex relative" ref={secondaryMenuRef}>
                    <AnimatedHamburger
                        isOpen={isDesktopSecondaryMenuOpen}
                        onClick={() => setIsDesktopSecondaryMenuOpen(!isDesktopSecondaryMenuOpen)}
                        buttonClassName="text-black"
                    />
                    <AnimatePresence>
                        {isDesktopSecondaryMenuOpen && (
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={desktopDropdownVariants}
                                className={`absolute top-full right-0 mt-2 w-48 rounded-md shadow-lg py-2
                                bg-gradient-to-r from-white via-[#fefefe] to-[#f9f9f9]/95 backdrop-blur-md border border-gray-300/50`}
                                onMouseEnter={handleLinkMouseEnter}
                                onMouseLeave={() => { handleLinkMouseLeave(); setIsDesktopSecondaryMenuOpen(false); }}
                            >
                                <Link
                                    to="/testimonials"
                                    className="block px-4 py-2 text-black hover:bg-gray-200 transition-colors duration-200"
                                    onClick={() => setIsDesktopSecondaryMenuOpen(false)}
                                >
                                    <SparklesIcon className="h-5 w-5 mr-2 inline-block" /> Testimonials
                                </Link>
                                <Link
                                    to="/journals"
                                    className="block px-4 py-2 text-black hover:bg-gray-200 transition-colors duration-200"
                                    onClick={() => setIsDesktopSecondaryMenuOpen(false)}
                                >
                                    <NewspaperIcon className="h-5 w-5 mr-2 inline-block" /> Journals
                                </Link>
                                <Link
                                    to="/contact"
                                    className="block px-4 py-2 text-black hover:bg-gray-200 transition-colors duration-200"
                                    onClick={() => setIsDesktopSecondaryMenuOpen(false)}
                                >
                                    <EnvelopeIcon className="h-5 w-5 mr-2 inline-block" /> Contact
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Main Mobile Hamburger (visible on small/medium screens) */}
                <div className="flex lg:hidden">
                    <AnimatedHamburger
                        isOpen={isMobileMenuOpen}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        buttonClassName="text-black"
                    />
                </div>
            </div>

            {/* Full-Screen Mobile Menu (opens from main mobile hamburger) */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={mobileMenuContainerVariants}
                        className="fixed inset-0 bg-gradient-to-r from-white via-[#fefefe] to-[#f9f9f9]/95 backdrop-blur-md z-[999] flex flex-col items-center justify-start pt-24 overflow-y-auto h-[100vh] lg:hidden"
                    >
                        {/* Close Button for Mobile Menu */}
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute top-4 right-4 p-2 rounded-full text-black hover:bg-gray-200 transition-colors duration-200 z-50"
                            aria-label="Close Mobile Menu"
                            onMouseEnter={handleLinkMouseEnter}
                            onMouseLeave={handleLinkMouseLeave}
                        >
                            <XMarkIcon className="h-8 w-8" />
                        </button>

                        {/* Main Menu Links */}
                        <motion.div variants={mobileMenuItemVariants} className="w-full">
                            <NavLink
                                to="/"
                                className={mobileNavLinkClasses("/")}
                                onClick={() => setIsMobileMenuOpen(false)}
                                onMouseEnter={handleLinkMouseEnter}
                                onMouseLeave={handleLinkMouseLeave}
                            >
                                <HomeIcon className="h-6 w-6 mr-3 text-black group-hover:rotate-[380deg] transition-transform duration-200" />
                                Home
                            </NavLink>
                        </motion.div>

                        <motion.div variants={mobileMenuItemVariants} className="w-full">
                            <NavLink
                                to="/about"
                                className={mobileNavLinkClasses("/about")}
                                onClick={() => setIsMobileMenuOpen(false)}
                                onMouseEnter={handleLinkMouseEnter}
                                onMouseLeave={handleLinkMouseLeave}
                            >
                                <BookOpenIcon className="h-6 w-6 mr-3 text-black group-hover:rotate-[380deg] transition-transform duration-200" />
                                About Us
                            </NavLink>
                        </motion.div>

                        <motion.div variants={mobileMenuItemVariants} className="w-full">
                            <NavLink
                                to="/hybrids"
                                className={mobileNavLinkClasses("/hybrids")}
                                onClick={() => setIsMobileMenuOpen(false)}
                                onMouseEnter={handleLinkMouseEnter}
                                onMouseLeave={handleLinkMouseLeave}
                            >
                                <MicrophoneIcon className="h-6 w-6 mr-3 text-black group-hover:rotate-[380deg] transition-transform duration-200" />
                                Hybrids
                            </NavLink>
                        </motion.div>

                        <motion.div variants={mobileMenuItemVariants} className="w-full">
                            <NavLink
                                to="/webinars"
                                className={mobileNavLinkClasses("/webinars")}
                                onClick={() => setIsMobileMenuOpen(false)}
                                onMouseEnter={handleLinkMouseEnter}
                                onMouseLeave={handleLinkMouseLeave}
                            >
                                <ComputerDesktopIcon className="h-6 w-6 mr-3 text-black group-hover:rotate-[380deg] transition-transform duration-200" />
                                Webinars
                            </NavLink>
                        </motion.div>

                        <motion.div variants={mobileMenuItemVariants} className="w-full">
                            <NavLink
                                to="/gallery"
                                className={mobileNavLinkClasses("/gallery")}
                                onClick={() => setIsMobileMenuOpen(false)}
                                onMouseEnter={handleLinkMouseEnter}
                                onMouseLeave={handleLinkMouseLeave}
                            >
                                <PhotoIcon className="h-6 w-6 mr-3 text-black group-hover:rotate-[380deg] transition-transform duration-200" />
                                Gallery
                            </NavLink>
                        </motion.div>

                        <motion.div variants={mobileMenuItemVariants} className="w-full">
                            <NavLink
                                to="/blog"
                                className={mobileNavLinkClasses("/blog")}
                                onClick={() => setIsMobileMenuOpen(false)}
                                onMouseEnter={handleLinkMouseEnter}
                                onMouseLeave={handleLinkMouseLeave}
                            >
                                <PencilSquareIcon className="h-6 w-6 mr-3 text-black group-hover:rotate-[380deg] transition-transform duration-200" />
                                Blog
                            </NavLink>
                        </motion.div>

                        {/* Buy A Ticket (inside mobile menu) */}
                        <motion.div variants={mobileMenuItemVariants} className="w-full">
                            <NavLink
                                to="/buy-a-ticket"
                                className={mobileNavLinkClasses("/buy-a-ticket")}
                                onClick={() => setIsMobileMenuOpen(false)}
                                onMouseEnter={handleLinkMouseEnter}
                                onMouseLeave={handleLinkMouseLeave}
                            >
                                <TicketIcon className="h-6 w-6 mr-3 text-black group-hover:rotate-[380deg] transition-transform duration-200" />
                                Buy A Ticket
                            </NavLink>
                        </motion.div>

                        {/* Secondary Menu Links (NOW USING NavLink) */}
                        <motion.div variants={mobileMenuItemVariants} className="w-full mt-4 border-t border-gray-200 pt-4">
                            <NavLink
                                to="/testimonials"
                                className={mobileNavLinkClasses("/testimonials")}
                                onClick={() => setIsMobileMenuOpen(false)}
                                onMouseEnter={handleLinkMouseEnter}
                                onMouseLeave={handleLinkMouseLeave}
                            >
                                <SparklesIcon className="h-6 w-6 mr-3 text-black group-hover:rotate-[380deg] transition-transform duration-200" />
                                Testimonials
                            </NavLink>
                        </motion.div>

                        <motion.div variants={mobileMenuItemVariants} className="w-full">
                            <NavLink
                                to="/journals"
                                className={mobileNavLinkClasses("/journals")}
                                onClick={() => setIsMobileMenuOpen(false)}
                                onMouseEnter={handleLinkMouseEnter}
                                onMouseLeave={handleLinkMouseLeave}
                            >
                                <NewspaperIcon className="h-6 w-6 mr-3 text-black group-hover:rotate-[380deg] transition-transform duration-200" />
                                Journals
                            </NavLink>
                        </motion.div>

                        <motion.div variants={mobileMenuItemVariants} className="w-full">
                            <NavLink
                                to="/contact"
                                className={mobileNavLinkClasses("/contact")}
                                onClick={() => setIsMobileMenuOpen(false)}
                                onMouseEnter={handleLinkMouseEnter}
                                onMouseLeave={handleLinkMouseLeave}
                            >
                                <EnvelopeIcon className="h-6 w-6 mr-3 text-black group-hover:rotate-[380deg] transition-transform duration-200" />
                                Contact
                            </NavLink>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

export default Header;