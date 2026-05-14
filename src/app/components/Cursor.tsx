'use client';
import { useEffect, useRef, memo } from 'react';

export const Cursor = memo(function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    let isHovering = false;

    const animate = () => {
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      ring.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)${isHovering ? ' scale(2.5)' : ''}`;
      rafRef.current = requestAnimationFrame(animate);
    };

    const handleMouseEnter = () => {
      isHovering = true;
      ring.style.background = 'rgba(168, 85, 247, 0.3)';
    };
    const handleMouseLeave = () => {
      isHovering = false;
      ring.style.background = 'transparent';
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    document.addEventListener('mouseover', (e) => {
      const target = e.target as Element;
      if (target.closest('[data-magnetic]')) {
        handleMouseEnter();
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target as Element;
      if (target.closest('[data-magnetic]')) {
        handleMouseLeave();
      }
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
});
