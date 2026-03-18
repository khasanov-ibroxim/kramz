"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

const IMAGES = [
    {
        id: 1,
        src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=80',
        thumb: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80',
    },
    {
        id: 2,
        src: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1200&q=80',
        thumb: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=400&q=80',
    },
    {
        id: 3,
        src: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80',
        thumb: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80',
    },
    {
        id: 4,
        src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80',
        thumb: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80',
    },
    {
        id: 5,
        src: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=1200&q=80',
        thumb: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=400&q=80',
    },
    {
        id: 6,
        src: 'https://images.unsplash.com/photo-1495555961986-5db6a8c14ae7?w=1200&q=80',
        thumb: 'https://images.unsplash.com/photo-1495555961986-5db6a8c14ae7?w=400&q=80',
    },
];

const VIDEOS = [
    {
        id: 1,
        title: 'Красноярский металлургический завод',
        src: 'https://www.w3schools.com/html/mov_bbb.mp4',
        thumb: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80',
    },
];

const THUMBS_PER_PAGE = 4;

const ProductionS6 = () => {
    const [tab, setTab] = useState<'image' | 'video'>('image');
    const [activeIndex, setActiveIndex] = useState(0);
    const [thumbPage, setThumbPage] = useState(0);

    const items = tab === 'image' ? IMAGES : VIDEOS;
    const visibleThumbs = items.slice(thumbPage * THUMBS_PER_PAGE, thumbPage * THUMBS_PER_PAGE + THUMBS_PER_PAGE);

    const handlePrev = () => {
        if (activeIndex > 0) {
            const next = activeIndex - 1;
            setActiveIndex(next);
            setThumbPage(Math.floor(next / THUMBS_PER_PAGE));
        }
    };

    const handleNext = () => {
        if (activeIndex < items.length - 1) {
            const next = activeIndex + 1;
            setActiveIndex(next);
            setThumbPage(Math.floor(next / THUMBS_PER_PAGE));
        }
    };

    const handleTabChange = (newTab: 'image' | 'video') => {
        setTab(newTab);
        setActiveIndex(0);
        setThumbPage(0);
    };

    const currentItem = items[activeIndex];
    const displayPage = String(activeIndex + 1).padStart(2, '0');
    const displayTotal = String(items.length).padStart(2, '0');

    return (
        <div className={"bg-[#9DBFB8]"}>
            <div className="pt-16 py-0 md:pt-0 md:py-32 container">
                {/* Title */}
                <h1 className="other_font uppercase font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#2B362D] mb-8">
                    Галерея производства
                </h1>

                {/* Tab switcher */}
                <div className="flex items-center gap-1 bg-white/30 rounded-full p-1 w-fit mb-8">
                    <button
                        onClick={() => handleTabChange('image')}
                        className={`other_font relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 cursor-pointer ${
                            tab === 'image' ? 'text-white' : 'text-[#2B362D]'
                        }`}
                    >
                        {tab === 'image' && (
                            <motion.span
                                layoutId="tab-bg"
                                className="absolute inset-0 bg-[#009C89] rounded-full"
                                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                            />
                        )}
                        <span className="relative z-10">Изображение</span>
                    </button>
                    <button
                        onClick={() => handleTabChange('video')}
                        className={`other_font relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 cursor-pointer ${
                            tab === 'video' ? 'text-white' : 'text-[#2B362D]'
                        }`}
                    >
                        {tab === 'video' && (
                            <motion.span
                                layoutId="tab-bg"
                                className="absolute inset-0 bg-[#009C89] rounded-full"
                                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                            />
                        )}
                        <span className="relative z-10">Видео</span>
                    </button>
                </div>

                {/* Main preview — same aspect ratio for both image and video */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${tab}-${activeIndex}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="w-full rounded-2xl overflow-hidden mb-4 bg-black"
                        style={{ aspectRatio: '21/9' }}
                    >
                        {tab === 'image' ? (
                            <img
                                src={(currentItem as typeof IMAGES[0]).src}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="relative w-full h-full">
                                <video
                                    key={(currentItem as typeof VIDEOS[0]).src}
                                    src={(currentItem as typeof VIDEOS[0]).src}
                                    controls
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 left-4 z-10 pointer-events-none">
                                <span className="other_font text-white font-semibold text-base drop-shadow">
                                    {(currentItem as typeof VIDEOS[0]).title}
                                </span>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Thumbnails row */}
                <div className="flex gap-3 mb-4">
                    {visibleThumbs.map((item, i) => {
                        const globalIndex = thumbPage * THUMBS_PER_PAGE + i;
                        const isActive = globalIndex === activeIndex;
                        const thumb = tab === 'image'
                            ? (item as typeof IMAGES[0]).thumb
                            : (item as typeof VIDEOS[0]).thumb;

                        return (
                            <motion.button
                                key={item.id}
                                onClick={() => {
                                    setActiveIndex(globalIndex);
                                }}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className={`relative rounded-xl overflow-hidden cursor-pointer border-2 transition-colors duration-200 ${
                                    isActive ? 'border-[#009C89]' : 'border-transparent'
                                }`}
                                style={{ aspectRatio: '16/10', width: 'calc(25% - 9px)' }}
                            >
                                <img
                                    src={thumb}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                                {tab === 'video' && (
                                    <>
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                            <div className="w-9 h-9 rounded-full bg-white/80 flex items-center justify-center">
                                                <Play size={16} className="text-[#2B362D] ml-0.5" fill="#2B362D" />
                                            </div>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                                            <p className="other_font text-white text-[10px] leading-tight font-medium">
                                                {(item as typeof VIDEOS[0]).title}
                                            </p>
                                        </div>
                                    </>
                                )}
                                {isActive && (
                                    <motion.div
                                        layoutId="thumb-active"
                                        className="absolute inset-0 border-2 border-[#009C89] rounded-xl pointer-events-none"
                                    />
                                )}
                            </motion.button>
                        );
                    })}
                </div>

                {/* Pagination + arrows — separate bottom row, right aligned */}
                <div className="flex items-center justify-end gap-3">
                <span className="other_font text-sm font-medium text-[#fff]">
                    <span className="font-bold">{displayPage}</span>
                    <span className="mx-1 text-white">/</span>
                    <span>{displayTotal}</span>
                </span>

                    <button
                        onClick={handlePrev}
                        disabled={activeIndex === 0}
                        className="w-10 h-10 rounded-full border border-white flex items-center justify-center cursor-pointer disabled:opacity-30 hover:bg-[#009C89] hover:border-[#009C89] hover:text-white transition-colors duration-200"
                    >
                        <ChevronLeft size={18} color={"#fff"}/>
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={activeIndex === items.length - 1}
                        className="w-10 h-10 rounded-full border border-white flex items-center justify-center cursor-pointer disabled:opacity-30 hover:bg-[#009C89] hover:border-[#009C89] hover:text-white transition-colors duration-200"
                    >
                        <ChevronRight size={18} color={"#fff"}/>
                    </button>
                </div>
            </div>
        </div>

    );
};

export default ProductionS6;