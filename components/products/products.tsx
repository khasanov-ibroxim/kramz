"use client"
import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import type { ProductionDictionary } from '@/lib/dictionary';

// ── Мужская (Men's) images ────────────────────────────────────────────
import m1 from "@/assets/products/men/1.jpg"
import m2 from "@/assets/products/men/2.jpg"
import m3 from "@/assets/products/men/3.jpg"
import m4 from "@/assets/products/men/4.jpg"
import m5 from "@/assets/products/men/5.jpg"
import m6 from "@/assets/products/men/6.jpg"
import m7 from "@/assets/products/men/7.jpg"
import m8 from "@/assets/products/men/8.jpg"
import m9 from "@/assets/products/men/9.jpg"
import m10 from "@/assets/products/men/10.jpg"
import m11 from "@/assets/products/men/11.jpg"
import m12 from "@/assets/products/men/12.jpg"
import m13 from "@/assets/products/men/13.jpg"
import m14 from "@/assets/products/men/14.jpg"


// ── Женская (Women's) images ──────────────────────────────────────────
import w1 from "@/assets/products/women/1.jpg"
import w2 from "@/assets/products/women/2.jpg"
import w3 from "@/assets/products/women/3.jpg"
import w4 from "@/assets/products/women/4.jpg"
import w5 from "@/assets/products/women/5.jpg"
import w6 from "@/assets/products/women/6.jpg"
import w7 from "@/assets/products/women/7.jpg"
import w8 from "@/assets/products/women/8.jpg"
import w9 from "@/assets/products/women/9.jpg"
import w10 from "@/assets/products/women/10.jpg"
import w11 from "@/assets/products/women/11.jpg"
import w12 from "@/assets/products/women/12.jpg"
import w13 from "@/assets/products/women/13.jpg"
import w14 from "@/assets/products/women/14.jpg"
import w15 from "@/assets/products/women/15.jpg"

// ── fabric (fabric) images ──────────────────────────────────────────
import f1 from "@/assets/products/fabric/1.jpg"
import f2 from "@/assets/products/fabric/2.jpg"
import f3 from "@/assets/products/fabric/3.jpg"
import f4 from "@/assets/products/fabric/4.jpg"
import f5 from "@/assets/products/fabric/5.jpg"
import f6 from "@/assets/products/fabric/6.jpg"
import f7 from "@/assets/products/fabric/7.jpg"
import f8 from "@/assets/products/fabric/8.jpg"
import f9 from "@/assets/products/fabric/9.jpg"


interface ProductionS6Props {
    dict: ProductionDictionary['s6'];
}

type TabKey = 'women' | 'men' | "paint" | "fabric" | "yarn";

interface ImageItem {
    id: number;
    src: StaticImageData;
    name?: string;
}

const MEN_IMAGES: ImageItem[] = [
    { id: 1, src: m1 },
    { id: 2, src: m2 },
    { id: 3, src: m3 },
    { id: 4, src: m4 },
    { id: 5, src: m5 },
    { id: 6, src: m6 },
    { id: 7, src: m7 },
    { id: 8, src: m8 },
    { id: 9, src: m9 },
    { id: 10, src: m10 },
    { id: 11, src: m11 },
    { id: 12, src: m12 },
    { id: 13, src: m13 },
    { id: 14, src: m14 },
];

const WOMEN_IMAGES: ImageItem[] = [
    { id: 1, src: w1 },
    { id: 2, src: w2 },
    { id: 3, src: w3 },
    { id: 4, src: w4 },
    { id: 5, src: w5 },
    { id: 6, src: w6 },
    { id: 7, src: w7 },
    { id: 8, src: w8 },
    { id: 9, src: w9 },
    { id: 10, src: w10 },
    { id: 11, src: w11 },
    { id: 12, src: w12 },
    { id: 13, src: w13 },
    { id: 14, src: w14 },
    { id: 15, src: w15 },
];

const FABRIC_IMAGES: ImageItem[] = [
    { id: 1, src: f1, name: "2 нитка" },
    { id: 2, src: f2, name: "3 нитка" },
    { id: 3, src: f3, name: "Kulirka" },
    { id: 4, src: f4, name: "Велюр" },
    { id: 5, src: f5, name: "Интерлок" },
    { id: 6, src: f6, name: "Кашкорсе" },
    { id: 7, src: f7, name: "Махра" },
    { id: 8, src: f8, name: "Пике" },
    { id: 9, src: f9, name: "Супрем" },
];

const GALLERY: Record<TabKey, ImageItem[]> = {
    men: MEN_IMAGES,
    women: WOMEN_IMAGES,
    paint: WOMEN_IMAGES,
    fabric: FABRIC_IMAGES,
    yarn: WOMEN_IMAGES,
};

/* ─── Image Modal ─────────────────────────────────────────────── */
const ImageModal = ({
                        images,
                        startIndex,
                        onClose,
                    }: {
    images: ImageItem[];
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
        if (Math.abs(diff) > 50) if (diff > 0) {
            goNext();
        } else {
            goPrev();
        }
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
                // Clicking the dark backdrop closes the modal
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
                onClick={onClose}
            >
                {/* Close button */}
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

                {/* Image wrapper — does NOT stopPropagation so clicking black area closes modal */}
                <div
                    className="relative w-full h-full flex items-center justify-center overflow-hidden px-16"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
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
                            {/* stopPropagation only on the image itself */}
                            <Image
                                width={300}
                                height={300}
                                src={images[current].src.src}
                                alt=""
                                className="max-w-full max-h-full object-contain rounded-2xl select-none"
                                style={{ maxHeight: 'calc(90vh - 100px)' }}
                                draggable={false}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Thumbnail strip */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-[#50D873] scale-125' : 'bg-white/40 hover:bg-white/70'}`}
                        />
                    ))}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

/* ─── Image Gallery ─────────────────────────────────────────────── */
const ImageGallery = ({
                          images,
                          onOpen,
                          showNames = false,
                      }: {
    images: ImageItem[];
    onOpen: (index: number) => void;
    showNames?: boolean;
}) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {images.map((img, i) => (
            <motion.button
                key={img.id}
                onClick={() => onOpen(i)}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg shadow-black/30"
                style={{ aspectRatio: '9/16' }}
            >
                <Image
                    width={300}
                    height={300}
                    src={img.src.src}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    draggable={false}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="other_font text-xs text-white/80">
                        {showNames && img.name ? img.name : `${String(i + 1).padStart(2, '0')} / ${String(images.length).padStart(2, '0')}`}
                    </span>
                </div>
                {/* Green corner accent */}
                <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#50D873] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm shadow-[#50D873]/60" />
            </motion.button>
        ))}
    </div>
);

/* ─── Main component ─────────────────────────────────────────────── */
const ProductionS6 = ({ dict }: ProductionS6Props) => {
    const [tab, setTab] = useState<TabKey>('men');
    const [modalIndex, setModalIndex] = useState<number | null>(null);

    const tabs: { key: TabKey; label: string; disabled?: boolean }[] = [
        { key: 'women',   label: dict.tabs.women   },
        { key: 'men', label: dict.tabs.men },
        { key: 'paint', label: dict.tabs.paint, disabled: true },
        { key: 'fabric', label: dict.tabs.fabric },
        { key: 'yarn', label: dict.tabs.yarn, disabled: true },
    ];

    const currentImages = GALLERY[tab];

    return (
        <div className="bg-[#0D3E29] py-24 md:py-32">
            <div className="container">

                {/* Header row */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                    <h1 className="other_font uppercase font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
                        {dict.title}
                    </h1>

                    {/* Tab switcher */}
                    <div className="grid grid-cols-3 md:flex items-center gap-1.5 md:gap-1 bg-white/30 rounded-2xl md:rounded-full p-1.5 md:p-1 w-full md:w-fit">
                        {tabs.map(({ key, label, disabled }) => (
                            <button
                                key={key}
                                onClick={() => !disabled && setTab(key)}
                                disabled={disabled}
                                className="other_font relative px-3 md:px-5 py-2 rounded-xl md:rounded-full text-xs md:text-sm font-medium transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
                                style={{ color: tab === key ? '#fff' : '#2B362D' }}
                            >
                                {tab === key && !disabled && (
                                    <motion.span
                                        layoutId="tab-bg"
                                        className="absolute inset-0 bg-[#50D873] rounded-xl md:rounded-full"
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                                    />
                                )}
                                <span className="relative z-10">{label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Gallery */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={tab}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ImageGallery
                            images={currentImages}
                            onOpen={(i) => setModalIndex(i)}
                            showNames={tab === 'fabric'}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Modal */}
            {modalIndex !== null && (
                <ImageModal
                    images={currentImages}
                    startIndex={modalIndex}
                    onClose={() => setModalIndex(null)}
                />
            )}
        </div>
    );
};

export default ProductionS6;