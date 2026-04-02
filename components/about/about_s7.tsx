"use client"
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import type { AboutDictionary, CommonDictionary } from '@/lib/dictionary';

// 🔥 images
import img1 from "@/assets/about/about_s3/1.png";
import img2 from "@/assets/about/about_s3/2.png";
import img3 from "@/assets/about/about_s3/3.png";

import img4 from "@/assets/about/about_s3/4.png";
import img5 from "@/assets/about/about_s3/6.png";
import img6 from "@/assets/about/about_s3/7.png";

import img7 from "@/assets/about/about_s3/8.png";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

// 🔥 tab -> images
const tabImages: Record<number, StaticImageData[]> = {
    0: [img1, img2, img3,],
    1: [img4, img5, img6],
    2: [img7],
};

const AboutS7 = ({ dict }: { dict: AboutDictionary['s7']; commonDict: CommonDictionary }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const titleRef = useRef(null);
    const titleInView = useInView(titleRef, { once: true, margin: '-40px' });

    const images = tabImages[activeTab] || [];

    // 🔥 keyboard navigation
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (selectedIndex === null) return;

            if (e.key === "Escape") setSelectedIndex(null);
            if (e.key === "ArrowRight")
                setSelectedIndex((prev) => (prev! + 1) % images.length);
            if (e.key === "ArrowLeft")
                setSelectedIndex((prev) =>
                    prev === 0 ? images.length - 1 : prev! - 1
                );
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [selectedIndex, images]);

    return (
        <div className="relative py-16 bg-[#E9F0EF] rounded-2xl overflow-hidden">
            <div className="container mx-auto px-6 lg:px-10">

                {/* TITLE */}
                <motion.h2
                    ref={titleRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={titleInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="other_font font-bold text-4xl md:text-5xl uppercase mb-10"
                >
                    {dict.title}
                </motion.h2>

                {/* TABS */}
                <div className="flex flex-wrap gap-2 mb-8 bg-white p-1 rounded-full w-fit">
                    {dict.tabs.map((tab:AboutDictionary['s7']['tabs'], i:number) => (
                        <button
                            key={i}
                            onClick={() => setActiveTab(i)}
                            className={`px-5 py-2 rounded-full text-sm transition ${
                                activeTab === i
                                    ? 'bg-[#50D873] text-white'
                                    : 'text-black'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* IMAGES GRID */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                        {images.map((img, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className="overflow-hidden rounded-2xl cursor-pointer"
                                onClick={() => setSelectedIndex(i)}
                            >
                                <Image
                                    src={img}
                                    alt="exhibition"
                                    className="w-full h-[260px] object-cover hover:scale-105 transition duration-300"
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* 🔥 MODAL GALLERY + SWIPE */}
                <AnimatePresence>
                    {selectedIndex !== null && (
                        <motion.div
                            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {/* CLOSE */}
                            <button
                                onClick={() => setSelectedIndex(null)}
                                className="absolute top-6 right-6 text-white text-3xl z-50"
                            >
                                ✕
                            </button>

                            {/* LEFT */}
                            {images.length > 1 && (
                                <button
                                    onClick={() =>
                                        setSelectedIndex((prev) =>
                                            prev === 0 ? images.length - 1 : (prev! - 1)
                                        )
                                    }
                                    className="absolute left-6 text-white text-5xl z-50"
                                >
                                    ‹
                                </button>
                            )}

                            {/* IMAGE + SWIPE */}
                            <motion.div
                                key={selectedIndex}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.7}
                                onDragEnd={(e, info) => {
                                    if (info.offset.x < -100 || info.velocity.x < -500) {
                                        // 👉 next
                                        setSelectedIndex((prev) =>
                                            prev === images.length - 1 ? 0 : prev! + 1
                                        );
                                    }

                                    if (info.offset.x > 100 || info.velocity.x > 500) {
                                        // 👉 prev
                                        setSelectedIndex((prev) =>
                                            prev === 0 ? images.length - 1 : prev! - 1
                                        );
                                    }
                                }}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="max-w-[90vw] max-h-[85vh] cursor-grab active:cursor-grabbing"
                            >
                                <Image
                                    src={images[selectedIndex]}
                                    alt="preview"
                                    className="w-full h-full object-contain rounded-xl select-none"
                                    draggable={false}
                                />
                            </motion.div>

                            {/* RIGHT */}
                            {images.length > 1 && (
                                <button
                                    onClick={() =>
                                        setSelectedIndex((prev) =>
                                            prev === images.length - 1 ? 0 : (prev! + 1)
                                        )
                                    }
                                    className="absolute right-6 text-white text-5xl z-50"
                                >
                                    ›
                                </button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
};

export default AboutS7;