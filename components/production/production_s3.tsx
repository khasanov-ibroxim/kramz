"use client"
import React, { useRef, useState } from 'react';
import { motion, useInView } from "framer-motion";
import type { ProductionDictionary } from '@/lib/dictionary';

interface ProductionS3Props {
    dict: ProductionDictionary['s3'];
}

function StatCard({ stat, index, total, hoveredIndex, onMouseEnter, onMouseLeave }: {
    stat: { value: string; unit: string; label: string; highlight?: boolean };
    index: number; total: number;
    hoveredIndex: number | null;
    onMouseEnter: (i: number) => void;
    onMouseLeave: () => void;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-50px' });
    const col = index % 4;
    const anyNonFirstHovered = hoveredIndex !== null && hoveredIndex !== 0;
    const isHovered = hoveredIndex === index;
    const isFirst = index === 0;

    const bg = isFirst
        ? (anyNonFirstHovered ? 'bg-transparent' : 'bg-[#50D873]')
        : (isHovered ? 'bg-[#50D873]' : 'bg-transparent');
    const textColor = isFirst
        ? (anyNonFirstHovered ? 'text-[#1a1a1a]' : 'text-white')
        : (isHovered ? 'text-white' : 'text-[#1a1a1a]');
    const subTextColor = isFirst
        ? (anyNonFirstHovered ? 'text-[#4a5c4d]' : 'text-white/80')
        : (isHovered ? 'text-white/80' : 'text-[#4a5c4d]');

    return (
        <motion.div ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: col * 0.09, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className={`relative flex flex-col justify-start p-6 md:p-8 rounded-2xl transition-colors duration-300 cursor-pointer min-h-[200px] ${bg}`}
                    onMouseEnter={() => onMouseEnter(index)}
                    onMouseLeave={onMouseLeave}
        >
            <div className="absolute top-0 left-4 right-4 h-[1px] bg-black/15" />
            <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-black/15" />
            <div className="absolute left-0 top-4 bottom-4 w-[1px] bg-black/15" />
            <div className="absolute right-0 top-4 bottom-4 w-[1px] bg-black/15" />

            <div className="flex items-start justify-between gap-3">
                <span className={`other_font text-2xl md:text-2xl font-bold leading-none tracking-tight transition-colors duration-300 ${textColor}`}>
                    {stat.value}
                </span>
                <span className={`other_font text-right text-xs font-semibold leading-snug mt-1 whitespace-pre-line transition-colors duration-300 uppercase tracking-wide ${subTextColor}`}>
                    {stat.unit}
                </span>
            </div>
            <p className={`other_font text-base leading-snug mt-3 transition-colors duration-300 ${textColor}`}>
                {stat.label}
            </p>
        </motion.div>
    );
}

const ProductionS3 = ({ dict }: ProductionS3Props) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    return (
        <div className="py-32 container">
            <div className="w-full pb-10">
                <h1 className="other_font uppercase font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-[#2B362D]">{dict.title}</h1>
                <p className="other_font w-full mt-4 md:w-1/2 text-sm md:text-base text-[#2B362D]">{dict.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 pt-4">
                {dict.stats.map((stat:ProductionDictionary['s3']['stats'][number], i:number) => (
                    <StatCard key={stat.value + i} stat={stat} index={i} total={dict.stats.length}
                              hoveredIndex={hoveredIndex}
                              onMouseEnter={setHoveredIndex}
                              onMouseLeave={() => setHoveredIndex(null)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductionS3;