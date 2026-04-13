"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from "next/image";

import img1 from "@/assets/home/home_header/DSC04122.jpg"
import img2 from "@/assets/home/home_header/DSC04119.jpg"


const IMAGES = [
    img1,
    img2
];

interface HomeHeaderProps {
    dict: { title: string };
}

const HomeHeader = ({ dict }: HomeHeaderProps) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (IMAGES.length <= 1) return;
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % IMAGES.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full h-screen relative overflow-hidden">
            {/* Barcha rasmlar stack qilingan — faqat opacity o'zgaradi, kulrang flash yo'q */}
            {IMAGES.map((img, i) => (
                <motion.div
                    key={i}
                    animate={{ opacity: i === current ? 1 : 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute inset-0 z-20"
                    style={{ pointerEvents: i === current ? 'auto' : 'none' }}
                >
                    <Image
                        src={img}
                        alt={`header-${i}`}
                        className="w-full h-full object-cover"
                        priority={i === 0}
                        fill
                    />
                </motion.div>
            ))}

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40 z-30" />

            {/* Title */}
            <div className="px-5 lg:px-0 absolute z-40 w-full h-full flex items-center justify-center">
                <h1 className="w-[100%] md:w-[80%] px-1 md:px-5 text-4xl title_font_bold md:text-5xl lg:text-6xl text-white uppercase mt-5">
                    {dict.title}
                </h1>
            </div>

            {/* Dot indicators */}
            {IMAGES.length > 1 && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex gap-2">
                    {IMAGES.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className="cursor-pointer transition-all duration-500"
                        >
                            <motion.div
                                animate={{
                                    width: i === current ? 28 : 8,
                                    backgroundColor: i === current ? '#ffffff' : 'rgba(255,255,255,0.4)',
                                }}
                                transition={{ duration: 0.4 }}
                                className="h-2 rounded-full"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomeHeader;