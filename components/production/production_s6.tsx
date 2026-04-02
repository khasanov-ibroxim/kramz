"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import type { StaticImageData } from 'next/image';
import type { ProductionDictionary } from '@/lib/dictionary';
import i1 from "@/assets/production/production_s6/DSC09809.jpg"
import i2 from "@/assets/production/production_s6/DSC09847.jpg"
import i3 from "@/assets/production/production_s6/DSC09857.jpg"
import i4 from "@/assets/production/production_s6/DSC09906.jpg"
import i5 from "@/assets/production/production_s6/DSC09921.jpg"

interface ProductionS6Props {
    dict: ProductionDictionary['s6'];
}

const IMAGES: { id: number; src: StaticImageData; thumb: StaticImageData }[] = [
    { id: 1, src: i1, thumb: i1 },
    { id: 2, src: i2, thumb: i2 },
    { id: 3, src: i3, thumb: i3 },
    { id: 4, src: i4, thumb: i4 },
    { id: 5, src: i5, thumb: i5 },
];

const VIDEOS = [
    { id: 1, title: 'Производство — обзор цехов', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { id: 2, title: 'Прядильный цех', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { id: 3, title: 'Швейный цех', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
];

const THUMBS_PER_PAGE = 5;

const ProductionS6 = ({ dict }: ProductionS6Props) => {
    const [tab, setTab] = useState<'image' | 'video'>('image');
    const [activeIndex, setActiveIndex] = useState(0);
    const [thumbPage, setThumbPage] = useState(0);

    const items = tab === 'image' ? IMAGES : VIDEOS;
    const totalPages = Math.ceil(items.length / THUMBS_PER_PAGE);
    const visibleThumbs = items.slice(thumbPage * THUMBS_PER_PAGE, thumbPage * THUMBS_PER_PAGE + THUMBS_PER_PAGE);

    const handlePrev = () => {
        if (activeIndex > 0) {
            const n = activeIndex - 1;
            setActiveIndex(n);
            setThumbPage(Math.floor(n / THUMBS_PER_PAGE));
        }
    };
    const handleNext = () => {
        if (activeIndex < items.length - 1) {
            const n = activeIndex + 1;
            setActiveIndex(n);
            setThumbPage(Math.floor(n / THUMBS_PER_PAGE));
        }
    };
    const handleTabChange = (t: 'image' | 'video') => {
        setTab(t);
        setActiveIndex(0);
        setThumbPage(0);
    };

    const currentItem = items[activeIndex];
    const displayPage = String(activeIndex + 1).padStart(2, '0');
    const displayTotal = String(items.length).padStart(2, '0');

    return (
        <div className="bg-[#9DBFB8] py-16 md:py-24">
            <div className="container">

                {/* Header row */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                    <h1 className="other_font uppercase font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#2B362D]">
                        {dict.title}
                    </h1>

                    {/* Tab switcher */}
                    <div className="flex items-center gap-1 bg-white/30 rounded-full p-1 w-fit">
                        {(['image', 'video'] as const).map((t) => (
                            <button key={t} onClick={() => handleTabChange(t)}
                                    className={`other_font relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 cursor-pointer ${tab === t ? 'text-white' : 'text-[#2B362D]'}`}>
                                {tab === t && (
                                    <motion.span layoutId="tab-bg"
                                                 className="absolute inset-0 bg-[#50D873] rounded-full"
                                                 transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }} />
                                )}
                                <span className="relative z-10">{dict.tabs[t]}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main layout: preview + thumbnails side by side on desktop */}
                <div className="flex flex-col lg:flex-row gap-4 items-start">

                    {/* Thumbnails — left column on desktop, bottom row on mobile */}
                    <div className="order-2 lg:order-1 flex flex-row lg:flex-col gap-3 lg:w-[120px] w-full overflow-x-auto lg:overflow-visible">
                        {visibleThumbs.map((item, i) => {
                            const globalIndex = thumbPage * THUMBS_PER_PAGE + i;
                            const isActive = globalIndex === activeIndex;
                            const thumbSrc = tab === 'image'
                                ? (item as typeof IMAGES[0]).thumb.src
                                : `https://img.youtube.com/vi/${(item as typeof VIDEOS[0]).src.split('/embed/')[1]}/mqdefault.jpg`;

                            return (
                                <motion.button
                                    key={item.id}
                                    onClick={() => setActiveIndex(globalIndex)}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className={`relative flex-shrink-0 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 ${
                                        isActive ? 'ring-2 ring-[#50D873] ring-offset-2 ring-offset-[#9DBFB8]' : 'opacity-60 hover:opacity-90'
                                    }`}
                                    style={
                                        tab === 'image'
                                            ? { aspectRatio: '9/16', width: 72, height: 128 }
                                            : { aspectRatio: '16/9', width: 120, height: 68 }
                                    }
                                >
                                    <img src={thumbSrc} alt="" className="w-full h-full object-cover" />
                                    {tab === 'video' && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                            <div className="w-7 h-7 rounded-full bg-white/80 flex items-center justify-center">
                                                <Play size={12} className="text-[#2B362D] ml-0.5" fill="#2B362D" />
                                            </div>
                                        </div>
                                    )}
                                </motion.button>
                            );
                        })}

                        {/* Thumb page nav */}
                        {totalPages > 1 && (
                            <div className="flex lg:flex-col flex-row gap-2 items-center justify-center mt-1">
                                {Array.from({ length: totalPages }).map((_, p) => (
                                    <button key={p} onClick={() => setThumbPage(p)}
                                            className={`w-1.5 h-1.5 rounded-full transition-colors ${p === thumbPage ? 'bg-[#2B362D]' : 'bg-white/50'}`} />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Main preview */}
                    <div className="order-1 lg:order-2 flex-1 flex flex-col">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${tab}-${activeIndex}`}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                                className="rounded-2xl overflow-hidden bg-black w-full"
                                style={tab === 'image' ? { aspectRatio: '9/16', maxHeight: '100vh', margin: '0 auto' } : { aspectRatio: '16/9', width: '100%' }}
                            >
                                {tab === 'image' ? (
                                    <img
                                        src={(currentItem as typeof IMAGES[0]).src.src}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <iframe
                                        key={(currentItem as typeof VIDEOS[0]).src}
                                        src={(currentItem as typeof VIDEOS[0]).src}
                                        title={(currentItem as typeof VIDEOS[0]).title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    />
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {/* Counter + arrows */}
                        <div className="flex items-center justify-between mt-4">
                            {/* Video title */}
                            <span className="other_font text-sm text-[#2B362D] font-medium truncate max-w-[60%]">
                                {tab === 'video' ? (currentItem as typeof VIDEOS[0]).title : ''}
                            </span>

                            <div className="flex items-center gap-3 ml-auto">
                                <span className="other_font text-sm font-medium text-white">
                                    <span className="font-bold text-[#2B362D]">{displayPage}</span>
                                    <span className="mx-1 text-white/60">/</span>
                                    <span className="text-white/70">{displayTotal}</span>
                                </span>
                                <button onClick={handlePrev} disabled={activeIndex === 0}
                                        className="w-10 h-10 rounded-full border border-white/60 flex items-center justify-center cursor-pointer disabled:opacity-30 hover:bg-[#50D873] hover:border-[#50D873] transition-colors duration-200">
                                    <ChevronLeft size={18} color="#fff"/>
                                </button>
                                <button onClick={handleNext} disabled={activeIndex === items.length - 1}
                                        className="w-10 h-10 rounded-full border border-white/60 flex items-center justify-center cursor-pointer disabled:opacity-30 hover:bg-[#50D873] hover:border-[#50D873] transition-colors duration-200">
                                    <ChevronRight size={18} color="#fff"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductionS6;