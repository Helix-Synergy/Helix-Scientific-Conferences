// src/components/ScrollToTop.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // "document.documentElement.scrollTo" is the modern compatible way to scroll to top
    // For smooth scrolling, you can use: window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // 'smooth' for animation, 'instant' for immediate
    });
  }, [pathname]); // This effect will re-run whenever the pathname changes (i.e., on route change)

  return null; // This component doesn't render anything visually
}

export default ScrollToTop;