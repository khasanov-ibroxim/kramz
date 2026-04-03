"use client"
import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { StaticImageData } from 'next/image';
import type { ProductionDictionary } from '@/lib/dictionary';
import i1 from "@/assets/production/production_s6/IMG_0406.jpg"
import i2 from "@/assets/production/production_s6/IMG_0408.jpg"
import i3 from "@/assets/production/production_s6/IMG_0410.jpg"
import i4 from "@/assets/production/production_s6/IMG_0416.jpg"
import i5 from "@/assets/production/production_s6/IMG_0417.jpg"
import i6 from "@/assets/production/production_s6/IMG_0418.jpg"
import i7 from "@/assets/production/production_s6/IMG_0420.jpg"

interface ProductionS6Props {
    dict: ProductionDictionary['s6'];
}

const IMAGES: { id: number; src: StaticImageData }[] = [
    { id: 1, src: i1 },
    { id: 2, src: i2 },
    { id: 3, src: i3 },
    { id: 4, src: i4 },
    { id: 5, src: i5 },
    { id: 6, src: i6 },
    { id: 7, src: i7 },
];

const VIDEOS = [
    { id: 1, title: 'Производство — обзор цехов', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { id: 2, title: 'Прядильный цех', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { id: 3, title: 'Швейный цех', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
];

/* ─── Image Modal ─────────────────────────────────────────────── */
const ImageModal = ({
                        images,
                        startIndex,
                        onClose,
                    }: {
    images: typeof IMAGES;
    startIndex: number;
    onClose: () => void;
}) => {
    const [current, setCurrent] = useState(startIndex);
    const [direction, setDirection] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);

    const goPrev = useCallback(() => {
        if (current > 0) {
            setDirection(-1);
            setCurrent((c) => c - 1);
        }
    }, [current]);

    const goNext = useCallback(() => {
        if (current < images.length - 1) {
            setDirection(1);
            setCurrent((c) => c + 1);
        }
    }, [current, images.length]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') goPrev();
            if (e.key === 'ArrowRight') goNext();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [goPrev, goNext, onClose]);

    // Lock body scroll
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.touches[0].clientX);
    };
    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStart === null) return;
        const diff = touchStart - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) diff > 0 ? goNext() : goPrev();
        setTouchStart(null);
    };

    const variants = {
        enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d: number) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
    };

    return (
        <AnimatePresence>
            <motion.div
                key="modal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
                onClick={onClose}
            >
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                    <X size={20} color="#fff" />
                </button>

                {/* Counter */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10">
                    <span className="other_font text-sm text-white/70">
                        <span className="text-white font-bold">{String(current + 1).padStart(2, '0')}</span>
                        <span className="mx-1">/</span>
                        {String(images.length).padStart(2, '0')}
                    </span>
                </div>

                {/* Prev */}
                <button
                    onClick={(e) => { e.stopPropagation(); goPrev(); }}
                    disabled={current === 0}
                    className="absolute left-4 z-10 w-11 h-11 rounded-full border border-white/30 flex items-center justify-center disabled:opacity-20 hover:bg-[#50D873] hover:border-[#50D873] transition-colors"
                >
                    <ChevronLeft size={22} color="#fff" />
                </button>

                {/* Next */}
                <button
                    onClick={(e) => { e.stopPropagation(); goNext(); }}
                    disabled={current === images.length - 1}
                    className="absolute right-4 z-10 w-11 h-11 rounded-full border border-white/30 flex items-center justify-center disabled:opacity-20 hover:bg-[#50D873] hover:border-[#50D873] transition-colors"
                >
                    <ChevronRight size={22} color="#fff" />
                </button>

                {/* Image */}
                <div
                    className="relative w-full h-full flex items-center justify-center overflow-hidden px-16"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onClick={(e) => e.stopPropagation()}
                >
                    <AnimatePresence custom={direction} mode="wait">
                        <motion.div
                            key={current}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="absolute inset-0 flex items-center justify-center px-16"
                        >
                            <img
                                src={images[current].src.src}
                                alt=""
                                className="max-w-full max-h-full object-contain rounded-2xl select-none"
                                style={{ maxHeight: 'calc(100vh - 100px)' }}
                                draggable={false}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Dot indicators */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={(e) => { e.stopPropagation(); setDirection(i > current ? 1 : -1); setCurrent(i); }}
                            className={`rounded-full transition-all duration-300 ${i === current ? 'w-5 h-1.5 bg-[#50D873]' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'}`}
                        />
                    ))}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

/* ─── Video tab ─────────────────────────────────────────────────── */
const VideoGrid = () => {
    const [active, setActive] = useState(0);

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            {/* Main player */}
            <div className="flex-1">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.3 }}
                        className="rounded-2xl overflow-hidden bg-black w-full"
                        style={{ aspectRatio: '16/9' }}
                    >
                        <iframe
                            src={VIDEOS[active].src}
                            title={VIDEOS[active].title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                        />
                    </motion.div>
                </AnimatePresence>
                <p className="other_font mt-3 text-white/80 text-sm">{VIDEOS[active].title}</p>
            </div>

            {/* Video list */}
            <div className="flex flex-row lg:flex-col gap-3 lg:w-[220px] overflow-x-auto lg:overflow-visible">
                {VIDEOS.map((v, i) => {
                    const videoId = v.src.split('/embed/')[1];
                    const thumb = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
                    return (
                        <motion.button
                            key={v.id}
                            onClick={() => setActive(i)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            className={`flex-shrink-0 rounded-xl overflow-hidden cursor-pointer relative transition-all ${i === active ? 'ring-2 ring-[#50D873] ring-offset-2 ring-offset-[#0D3E29]' : 'opacity-60 hover:opacity-90'}`}
                            style={{ aspectRatio: '16/9', width: 200 }}
                        >
                            <img src={thumb} alt={v.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center">
                                    <Play size={13} fill="#2B362D" color="#2B362D" className="ml-0.5" />
                                </div>
                            </div>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
};

/* ─── Main component ─────────────────────────────────────────────── */
const ProductionS6 = ({ dict }: ProductionS6Props) => {
    const [tab, setTab] = useState<'image' | 'video'>('image');
    const [modalIndex, setModalIndex] = useState<number | null>(null);

    const handleTabChange = (t: 'image' | 'video') => setTab(t);

    return (
        <div className="bg-[#0D3E29] py-16 md:py-24">
            <div className="container">

                {/* Header row */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                    <h1 className="other_font uppercase font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
                        {dict.title}
                    </h1>

                    {/* Tab switcher */}
                    <div className="flex items-center gap-1 bg-white/30 rounded-full p-1 w-fit">
                        {(['image', 'video'] as const).map((t) => (
                            <button
                                key={t}
                                onClick={() => handleTabChange(t)}
                                className="other_font relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 cursor-pointer"
                                style={{ color: tab === t ? '#fff' : '#2B362D' }}
                            >
                                {tab === t && (
                                    <motion.span
                                        layoutId="tab-bg"
                                        className="absolute inset-0 bg-[#50D873] rounded-full"
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                                    />
                                )}
                                <span className="relative z-10">{dict.tabs[t]}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    {tab === 'image' ? (
                        <motion.div
                            key="image-grid"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Masonry-style card grid — all images vertical (portrait) */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                {IMAGES.map((img, i) => (
                                    <motion.button
                                        key={img.id}
                                        onClick={() => setModalIndex(i)}
                                        whileHover={{ scale: 1.03, y: -4 }}
                                        whileTap={{ scale: 0.97 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: i * 0.06 }}
                                        className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg shadow-black/30"
                                        style={{ aspectRatio: '9/16' }}
                                    >
                                        <img
                                            src={img.src.src}
                                            alt=""
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            draggable={false}
                                        />
                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <span className="other_font text-xs text-white/80">
                                                {String(i + 1).padStart(2, '0')} / {String(IMAGES.length).padStart(2, '0')}
                                            </span>
                                        </div>

                                        {/* Green corner accent */}
                                        <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#50D873] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm shadow-[#50D873]/60" />
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="video-grid"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.3 }}
                        >
                            <VideoGrid />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Modal */}
            {modalIndex !== null && (
                <ImageModal
                    images={IMAGES}
                    startIndex={modalIndex}
                    onClose={() => setModalIndex(null)}
                />
            )}
        </div>
    );
};

export default ProductionS6;