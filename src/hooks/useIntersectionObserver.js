import { useEffect, useRef, useState } from 'react';

const useIntersectionObserver = (options) => {
  const ref = useRef();
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isIntersecting];
};

export default useIntersectionObserver; 