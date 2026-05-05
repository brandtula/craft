"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

export default function EagleAnimation() {
  const [mounted, setMounted] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const eagleControls = useAnimation();
  const bagControls = useAnimation();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // For development, you can comment this out to test repeatedly
    // const alreadyPlayed = sessionStorage.getItem("eagleAnimationPlayed");
    // if (alreadyPlayed) {
    //   setHasPlayed(true);
    //   return;
    // }

    const runAnimation = async () => {
      // Find the landing spot under the logo
      const landingSpot = document.getElementById("eagle-landing-spot");
      const landingRect = landingSpot?.getBoundingClientRect();
      
      const targetX = landingRect ? landingRect.left : 20;
      const targetY = landingRect ? landingRect.top : 20;

      // Starting position of bag (center of hero section roughly)
      const startBagX = window.innerWidth / 2 - 20;
      const startBagY = window.innerHeight / 2 - 50;

      // Ensure bag is visible at start
      bagControls.set({ x: startBagX, y: startBagY, scale: 1, opacity: 1 });

      // Eagle swoops down from top right
      await eagleControls.start({
        x: startBagX - 40,
        y: startBagY - 40,
        scale: 1,
        rotate: -15,
        transition: { duration: 1.2 }
      });

      // Quick grab pause
      await eagleControls.start({
        rotate: 0,
        transition: { duration: 0.1 }
      });

      // Fly to logo
      const flyToLogo = {
        x: targetX,
        y: targetY,
        scale: 0.3,
        opacity: 0, // fade out as it lands
        transition: { duration: 1.5 }
      };

      eagleControls.start(flyToLogo);
      
      // Bag flies attached to eagle
      await bagControls.start({
        x: targetX + 10,
        y: targetY + 20,
        scale: 0.3,
        opacity: 0,
        transition: { duration: 1.5 }
      });

      sessionStorage.setItem("eagleAnimationPlayed", "true");
      setHasPlayed(true);
    };

    if (typeof window !== "undefined") {
      setTimeout(runAnimation, 800);
    }
  }, [eagleControls, bagControls]);

  if (!mounted || hasPlayed) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {/* The Bag */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={bagControls}
        className="absolute top-0 left-0"
      >
        <svg width="40" height="50" viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 10L0 45C0 47.7614 2.23858 50 5 50H35C37.7614 50 40 47.7614 40 45L35 10H5Z" fill="#D2B48C"/>
          <path d="M10 10V5C10 2.23858 12.2386 0 15 0H25C27.7614 0 30 2.23858 30 5V10" stroke="#8B4513" strokeWidth="4"/>
          <path d="M15 20C15 20 20 25 25 20" stroke="#8B4513" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </motion.div>

      {/* The Eagle */}
      <motion.div
        initial={{ 
          x: typeof window !== 'undefined' ? window.innerWidth + 100 : 1000, 
          y: -100, 
          scale: 1.5 
        }}
        animate={eagleControls}
        className="absolute top-0 left-0 drop-shadow-2xl"
      >
        <div className="text-[80px] leading-none -scale-x-100">🦅</div>
      </motion.div>
    </div>
  );
}
