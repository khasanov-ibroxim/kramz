"use client"
import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Map } from "lucide-react";
import type {AboutDictionary, HomeDictionary} from '@/lib/dictionary';

interface AboutS2Props {
    dict: AboutDictionary['s2'];
}

function TextPara({ text, delay }: { text: string; delay: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });
    return (
        <motion.p ref={ref}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="other_font text-[15px] leading-[1.65] text-black/60 m-0"
        >{text}</motion.p>
    );
}

function StatCard({ stat, index, total, hoveredIndex, onMouseEnter, onMouseLeave, isFirst }: {
    stat: { value: string; label: string };
    index: number; total: number;
    hoveredIndex: number | null;
    onMouseEnter: (i: number) => void;
    onMouseLeave: () => void;
    isFirst: boolean;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-50px' });
    const col = index % 3;
    const isLastCol = col === 2 || index === total - 1;
    const anyNonFirstHovered = hoveredIndex !== null && hoveredIndex !== 0;
    const isHovered = hoveredIndex === index;

    const bg = isFirst
        ? (anyNonFirstHovered ? 'bg-transparent' : 'bg-[#0d3e29]')
        : (isHovered ? 'bg-[#0d3e29]' : 'bg-transparent');

    const textColor = isFirst
        ? (anyNonFirstHovered ? 'text-[#1a1a1a]' : 'text-white')
        : (isHovered ? 'text-white' : 'text-[#1a1a1a]');

    return (
        <motion.div ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: col * 0.09, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className={`relative flex flex-col items-center justify-center text-center p-8 md:p-10 rounded-2xl transition-colors duration-300 ${bg}`}
                    onMouseEnter={() => onMouseEnter(index)}
                    onMouseLeave={onMouseLeave}
        >
            {!isFirst && (
                <>
                    <div className="absolute top-0 left-4 right-4 h-[1px] bg-black/15" />
                    <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-black/15" />
                    {col !== 0 && <div className="absolute left-0 top-4 bottom-4 w-[1px] bg-black/15" />}
                    {!isLastCol && <div className="absolute right-0 top-4 bottom-4 w-[1px] bg-black/15" />}
                </>
            )}
            <div className={`title_font text-4xl md:text-3xl mb-10 font-bold leading-none tracking-tight transition-colors duration-300 ${textColor}`}>
                <Map />
            </div>
            <div className={`other_font text-4xl md:text-4xl mb-5 font-bold leading-none tracking-tight transition-colors duration-300 ${textColor}`}>
                {stat.value}
            </div>
            <div className={`other_font text-sm leading-snug transition-colors duration-300 ${textColor}`}>
                {stat.label}
            </div>
        </motion.div>
    );
}

const AboutS2 = ({ dict }: AboutS2Props) => {
    const titleRef = useRef(null);
    const titleInView = useInView(titleRef, { once: true, margin: '-40px' });
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="relative py-16 rounded-2xl bg-[#FFFFFF] overflow-hidden">
            <div className="container relative z-10">
                <motion.h2 ref={titleRef}
                           initial={{ opacity: 0, y: 20 }}
                           animate={titleInView ? { opacity: 1, y: 0 } : {}}
                           transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                           className="other_font font-semibold text-4xl md:text-5xl lg:text-5xl uppercase mb-5 mt-10 tracking-tight text-[#1a1a1a]"
                >{dict.title}</motion.h2>

                <div className="mb-10">
                    <TextPara text={dict.text} delay={0} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pt-4">
                    {dict.cards.map((card:AboutDictionary['s2']['cards'], i:number) => (
                        <StatCard key={card.value} stat={card} index={i} total={dict.cards.length}
                                  hoveredIndex={hoveredIndex}
                                  onMouseEnter={setHoveredIndex}
                                  onMouseLeave={() => setHoveredIndex(null)}
                                  isFirst={i === 0}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutS2;