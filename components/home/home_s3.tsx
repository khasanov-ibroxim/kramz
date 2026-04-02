"use client"
import React, {useRef, useState} from 'react';
import {motion, useInView, AnimatePresence} from 'framer-motion';
import i1 from "@/assets/home/home_s3/1.jpg"
import i2 from "@/assets/home/home_s3/2.jpg"
import i3 from "@/assets/home/home_s3/3.jpg"
import i4 from "@/assets/home/home_s3/4.jpg"
import i5 from "@/assets/home/home_s3/5.jpg"
import i6 from "@/assets/home/home_s3/6.jpg"
import i7 from "@/assets/home/home_s3/7.jpg"
import i8 from "@/assets/home/home_s3/8.jpg"
import i9 from "@/assets/home/home_s3/9.jpg"
import Image, {StaticImageData} from "next/image";
import type {HomeDictionary} from "@/lib/dictionary";

// ── TYPES ───────────────────────────────────────────────────
interface HomeS3Props {
    dict: HomeDictionary['s3'];
}

// ── Card ───────────────────────────────────────────────────
function ProductCard({item, index}: { item: { title: string; desc: string; img: StaticImageData }; index: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, {once: true, margin: '-40px' });

    return (
        <motion.div
            ref={ref}
            initial={{opacity: 0, y: 20}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.5, delay: (index % 3) * 0.08, ease: [0.25, 0.46, 0.45, 0.94]}}
            className="flex h-[450px] md:h-auto flex-col gap-4 bg-[#fff] rounded-2xl p-5 cursor-pointer
                       hover:bg-[#E8F2F0] group transition-colors duration-300 min-w-[280px]"
        >
            <div className="flex items-center gap-1.5">
                <h3 className="title_font text-[#50D873] text-[21px] font-bold tracking-tight leading-tight">
                    {item.title}
                </h3>
            </div>

            <p className="other_font text-[16px] leading-[1.6] text-black flex-1 min-h-[60px]">
                {item.desc}
            </p>

            <div className="w-full h-44 rounded-xl overflow-hidden">
                <Image
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
            </div>
        </motion.div>
    );
}

// ── Main ───────────────────────────────────────────────────
const HomeS3 = ({ dict }: HomeS3Props) => {
    const [activeTab, setActiveTab] = useState(0);
    const titleRef = useRef(null);
    const titleInView = useInView(titleRef, {once: true, margin: '-40px'});

    // 🔥 dict dan olish
    const TABS = dict.tabs;

    const TAB_DATA = [
        dict.byType.map((item, i) => ({
            ...item,
            img: [i1, i2, i3, i4, i5][i]
        })),
        dict.solutions.map((item, i) => ({
            ...item,
            img: [i6, i7, i8, i9][i]
        }))
    ];

    const items = TAB_DATA[activeTab] ?? [];

    const firstRow = items.slice(0, 2);
    const secondRow = items.slice(2);

    return (
        <div className="w-full py-16 overflow-hidden">
            <div className="container">

                {/* Title */}
                <motion.h2
                    ref={titleRef}
                    initial={{opacity: 0, y: 20}}
                    animate={titleInView ? {opacity: 1, y: 0} : {}}
                    transition={{duration: 0.6}}
                    className="other_font font-semibold text-4xl md:text-4xl lg:text-5xl uppercase tracking-tight text-[#1a1a1a] mb-3"
                >
                    {dict.title}
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                    initial={{opacity: 0, y: 12}}
                    animate={titleInView ? {opacity: 1, y: 0} : {}}
                    transition={{duration: 0.5, delay: 0.08}}
                    className="other_font text-[16px] text-black mb-8 max-w-sm leading-snug"
                >
                    {dict.subtitle}
                </motion.p>

                {/* Tabs */}
                <motion.div
                    initial={{opacity: 0, y: 10}}
                    animate={titleInView ? {opacity: 1, y: 0} : {}}
                    transition={{duration: 0.5, delay: 0.14}}
                    className="flex gap-1 mb-8 p-1 rounded-full w-fit bg-white"
                >
                    {TABS.map((tab, i) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(i)}
                            className="relative px-5 sm:px-8 py-3 rounded-full text-[14px] sm:text-[16px] font-medium cursor-pointer other_font"
                        >
                            {activeTab === i && (
                                <motion.div
                                    layoutId="s3-activeTab"
                                    className="absolute inset-0 bg-[#50D873] rounded-full"
                                />
                            )}
                            <span className={`relative z-10 ${activeTab === i ? "text-white" : "text-black"}`}>
                                {tab}
                            </span>
                        </button>
                    ))}
                </motion.div>

                {/* Grid */}
                <AnimatePresence mode="wait">
                    <motion.div key={activeTab} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>

                        <div className="hidden md:flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                {firstRow.map((item, i) => (
                                    <ProductCard key={item.title} item={item} index={i}/>
                                ))}
                            </div>

                            {secondRow.length > 0 && (
                                <div className={`grid gap-4 ${secondRow.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                                    {secondRow.map((item, i) => (
                                        <ProductCard key={item.title} item={item} index={i + firstRow.length}/>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Mobile */}
                        <div className="md:hidden -mx-4 px-4">
                            <div className="flex gap-4 overflow-x-auto pb-4">
                                {items.map((item, i) => (
                                    <div key={item.title} className="flex-shrink-0 w-[78vw] max-w-[300px]">
                                        <ProductCard item={item} index={i}/>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </motion.div>
                </AnimatePresence>

            </div>
        </div>
    );
};

export default HomeS3;