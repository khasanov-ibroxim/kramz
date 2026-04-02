"use client"
import React from 'react';
import { motion } from "framer-motion";
import type { ProductionDictionary, CommonDictionary } from '@/lib/dictionary';

interface ProductionS5Props {
    dict: ProductionDictionary['s5'];
    commonDict: CommonDictionary;
}

const Card = ({ card }: { card: { title: string; description: string[] } }) => {
    return (
        <motion.div whileHover="hover" initial="rest" animate="rest"
                    className="relative w-full h-full rounded-[20px] overflow-hidden bg-[#50D873]/10 border border-black/[0.07] cursor-pointer">
            <motion.div
                variants={{ rest: { opacity: 0, scale: 1.12 }, hover: { opacity: 1, scale: 1 } }}
                transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: `url(https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80)` }}
            />
            <motion.div
                variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                transition={{ duration: 0.45 }}
                className="absolute inset-0 z-[1] bg-gradient-to-b from-black/80 via-black/25 to-black/30"
            />
            <div className="absolute z-[2] flex flex-col justify-end p-5 md:p-7">
                <motion.h3
                    variants={{ rest: { color: '#50D873' }, hover: { color: '#ffffff' } }}
                    transition={{ duration: 0.3 }}
                    className="text-base md:text-lg font-bold leading-tight mb-2"
                >{card.title}</motion.h3>
                {card.description.map((item, index) => (
                    <ul key={index} className="list-disc">
                        <motion.li
                            variants={{ rest: { color: '#5a6b5c' }, hover: { color: 'rgba(255,255,255,0.85)' } }}
                            transition={{ duration: 0.3 }}
                            className="text-xs md:text-sm leading-relaxed"
                        >{item}</motion.li>
                    </ul>
                ))}
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

const ProductionS5 = ({ dict, commonDict }: ProductionS5Props) => {
    const [first, second, third, fourth] = dict.cards;
    return (
        <div className="container py-32">
            <div className="w-full pb-10">
                <h1 className="other_font uppercase font-semibold text-2xl sm:text-4xl md:text-5xl lg:text-5xl text-[#2B362D]">
                    {dict.title}
                </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="h-[240px] md:h-[300px]"><Card card={first} /></div>
                <div className="h-[240px] md:h-[300px]"><Card card={second} /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="h-[240px] md:h-[300px]"><Card card={third} /></div>
                <div className="h-[240px] md:h-[300px]"><Card card={fourth} /></div>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: 10, borderRadius: 100, border: '1.5px solid rgba(0,0,0,0.12)', cursor: 'pointer', fontSize: 14, fontWeight: 500 }}
                    className="bg-transparent w-[180px] justify-between px-3 py-2 mt-10 group hover:bg-[#50D873] text-black hover:text-white transition-colors duration-300">
                {dict.btn}
                <span style={{ width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="group-hover:bg-white bg-[#50D873] transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right group-hover:stroke-[#50D873] stroke-white"><path d="m9 18 6-6-6-6" /></svg>
                </span>
            </button>
        </div>
    );
};

export default ProductionS5;