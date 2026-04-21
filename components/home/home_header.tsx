"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from "next/image";

import img1 from "@/assets/home/home_header/DSC04130.jpg"
import img2 from "@/assets/home/home_header/DSC04173.jpg"

const IMAGES = [img1, img2];

interface HomeHeaderProps {
    dict: { title: string };
}

// ── Play Icon ─────────────────────────────────────────────────
function PlayIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M6 4.5L19.5 12L6 19.5V4.5Z" fill="white" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
    );
}

// ── Video Modal ───────────────────────────────────────────────
function VideoModal({ onClose }: { onClose: () => void }) {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
        };
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
            style={{ background: 'rgba(5, 18, 12, 0.88)', backdropFilter: 'blur(10px)' }}
        >
            {/* Modal box */}
            <motion.div
                initial={{ opacity: 0, scale: 0.93, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 12 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-[900px] rounded-2xl overflow-hidden"
                style={{
                    background: '#0e1a14',
                    boxShadow: '0 40px 100px rgba(0,0,0,0.55), 0 0 0 1px rgba(80,216,115,0.12)',
                }}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
                    style={{
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.22)',
                        backdropFilter: 'blur(8px)',
                    }}
                >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M1 1L15 15M15 1L1 15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </button>

                {/* YouTube iframe — 16:9 */}
                <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                    <iframe
                        className="absolute inset-0 w-full h-full"
                        src="https://www.youtube.com/embed/8KVSG1LZ_O0?si=VDmCYNlEuIEkQ56q&autoplay=1"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        style={{ background: '#000' }}
                    />
                </div>

                {/* Bottom bar */}
                <div
                    className="flex items-center justify-between px-5 py-3"
                    style={{ borderTop: '1px solid rgba(80,216,115,0.12)' }}
                >
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#50D873] animate-pulse"/>
                        <span className="text-white/50 text-xs other_font tracking-wide">VIDEO</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="other_font text-white/40 hover:text-white/70 text-xs transition-colors duration-200 cursor-pointer"
                    >
                        ESC — yopish
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ── Main Component ────────────────────────────────────────────
const HomeHeader = ({ dict }: HomeHeaderProps) => {
    const [current, setCurrent] = useState(0);
    const [videoOpen, setVideoOpen] = useState(false);

    useEffect(() => {
        if (IMAGES.length <= 1) return;
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % IMAGES.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <div className="w-full h-screen relative overflow-hidden">
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

                {/* ── Play Button — o'ng pastki burchak ── */}
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    onClick={() => setVideoOpen(true)}
                    className="absolute z-40 cursor-pointer group"
                    style={{
                        bottom: 'clamp(28px, 5vw, 52px)',
                        right: 'clamp(20px, 5vw, 60px)',
                    }}
                    aria-label="Video ko'rish"
                >
                    {/* Pulsing rings */}
                    <span
                        className="absolute inset-0 rounded-full pointer-events-none"
                        style={{
                            border: '1.5px solid rgba(80,216,115,0.5)',
                            animation: 'pingRing 2.2s cubic-bezier(0,0,0.2,1) infinite',
                        }}
                    />
                    <span
                        className="absolute inset-0 rounded-full pointer-events-none"
                        style={{
                            border: '1.5px solid rgba(80,216,115,0.3)',
                            animation: 'pingRing 2.2s cubic-bezier(0,0,0.2,1) infinite 0.7s',
                        }}
                    />

                    {/* Button body */}
                    <motion.div
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="relative flex items-center gap-3 pl-2 pr-5 py-2 rounded-full"
                        style={{
                            background: 'rgba(255,255,255,0.10)',
                            backdropFilter: 'blur(14px)',
                            border: '1px solid rgba(255,255,255,0.22)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
                        }}
                    >
                        {/* Circle play icon */}
                        <div
                            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-[#3ec45f]"
                            style={{ background: 'rgba(80,216,115,0.9)' }}
                        >
                            <PlayIcon />
                        </div>
                        {/* Label — faqat sm+ ekranlarda */}
                        <span
                            className="other_font text-white text-[13px] font-medium whitespace-nowrap hidden sm:block"
                            style={{ letterSpacing: '0.04em' }}
                        >
                            Video ko&apos;rish
                        </span>
                    </motion.div>
                </motion.button>

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

            {/* Ping animation keyframes */}
            <style>{`
                @keyframes pingRing {
                    0%   { transform: scale(1);   opacity: 0.7; }
                    70%  { transform: scale(1.6);  opacity: 0;   }
                    100% { transform: scale(1.6);  opacity: 0;   }
                }
            `}</style>

            {/* Video Modal */}
            <AnimatePresence>
                {videoOpen && <VideoModal onClose={() => setVideoOpen(false)} />}
            </AnimatePresence>
        </>
    );
};

export default HomeHeader;