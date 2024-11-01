'use client'
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const phrases = ["style", "looks", "vibe", "mood"];

const HeroText = () => {
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

    const [isLooping, setIsLooping] = useState(false);

  useEffect(() => {
    // Set a delay before starting the loop
    const initialDelay = setTimeout(() => {
      setIsLooping(true);
    }, 2000); // Delay before loop starts, in milliseconds

    return () => clearTimeout(initialDelay);
  }, []);

  useEffect(() => {
    if (isLooping) {
      // Begin the loop after initial delay
      const interval = setInterval(() => {
        setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
      }, 2000); // Interval between phrases

      return () => clearInterval(interval);
    }
  }, [isLooping]);

    return (
        
            <h2 className="font-extrabold text-[45px] md:text-[50px] lg:text-[60px] uppercase leading-none tracking-tight max-w-[560px]">
                Find clothes that match your 
                <AnimatePresence mode="wait">
                    <motion.span
                        key={phrases[currentPhraseIndex]}
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        exit={{ y: "-100%", opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="absolute ml-4"
                    >
                        {phrases[currentPhraseIndex]}
                    </motion.span>
                </AnimatePresence>
            </h2>
      
    );
};

export default HeroText;
