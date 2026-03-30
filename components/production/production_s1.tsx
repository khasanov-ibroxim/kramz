"use client"
import React from 'react';
import { motion } from 'framer-motion';
import type { ProductionDictionary, CommonDictionary } from '@/lib/dictionary';

interface ProductionS1Props {
    dict: ProductionDictionary['s1'];
    commonDict: CommonDictionary;
}

const Card = ({ card }: { card: { title: string; description: string | string[] } }) => {
    return (
        <motion.div whileHover="hover" initial="rest" animate="rest"
                    className="relative w-full h-full rounded-[20px] overflow-hidden bg-[#009C89]/10 border border-black/[0.07] cursor-pointer">
            <motion.div
                variants={{ rest: { opacity: 0, scale: 1.12 }, hover: { opacity: 1, scale: 1 } }}
                transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: `url(https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80)` }}
            />
            <motion.div
                variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                transition={{ duration: 0.45 }}
                className="absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-black/25 to-black/5"
            />
            <div className="absolute inset-0 z-[2] flex flex-col justify-end p-5 md:p-7">
                <motion.h3
                    variants={{ rest: { color: '#2B362D' }, hover: { color: '#ffffff' } }}
                    transition={{ duration: 0.3 }}
                    className="text-base md:text-lg font-bold leading-tight mb-2"
                >{card.title}</motion.h3>
                <motion.p
                    variants={{ rest: { color: '#5a6b5c' }, hover: { color: 'rgba(255,255,255,0.85)' } }}
                    transition={{ duration: 0.3 }}
                    className="text-xs md:text-sm leading-relaxed"
                >{Array.isArray(card.description) ? card.description.join(' · ') : card.description}</motion.p>
            </div>
            <motion.div
                variants={{ rest: { opacity: 0, scale: 0.7 }, hover: { opacity: 1, scale: 1 } }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="absolute top-4 right-4 z-[3] w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm bg-white/20"
            >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" />
                </svg>
            </motion.div>
        </motion.div>
    );
};

const ProductionS1 = ({ dict, commonDict }: ProductionS1Props) => {
    const [first, second, ...rest] = dict.cards;
    return (
        <div className="py-32 container">
            <div className="pb-8 md:pb-10">
                <h1 className="other_font uppercase font-medium text-xl sm:text-4xl md:text-5xl lg:text-6xl text-[#2B362D]">
                    {dict.title}
                </h1>
                <p className="other_font w-full mt-4 md:w-1/2 text-sm md:text-base text-[#2B362D]">
                    {dict.subtitle}
                </p>
                <button className="flex items-center gap-2.5 rounded-full border border-black/[0.12] bg-transparent min-w-[150px] py-1 px-2 mt-5 group hover:bg-[#009C89] text-black hover:text-white transition-colors duration-300 text-sm font-medium cursor-pointer">
                    {dict.button}
                    <span className="w-[34px] h-[34px] rounded-full flex items-center justify-center bg-[#009C89] group-hover:bg-white transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right stroke-white group-hover:stroke-[#009C89]">
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="h-[240px] md:h-[300px]"><Card card={first} /></div>
                <div className="h-[240px] md:h-[300px]"><Card card={second} /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {rest.map((card:ProductionDictionary['s1']['cards'][number]) => (
                    <div key={card.title} className="h-[200px] md:h-[220px]">
                        <Card card={card} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductionS1;