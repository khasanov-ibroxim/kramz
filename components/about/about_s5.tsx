"use client"
import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import type { AboutDictionary } from '@/lib/dictionary';

interface AboutS5Props {
    dict: AboutDictionary['s5'];
}

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

function Card({ card, index, isActive, onMouseEnter, onMouseLeave }: {
    card: { title: string; description: string };
    index: number; isActive: boolean;
    onMouseEnter: () => void; onMouseLeave: () => void;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });
    return (
        <motion.div ref={ref}
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: (index % 3) * 0.08 + Math.floor(index / 3) * 0.1, ease: EASE }}
                    onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                    className={["relative overflow-hidden rounded-2xl p-7 flex flex-col gap-5 cursor-default transition-colors duration-300",
                        isActive ? 'bg-[#50D873]' : 'bg-white'].join(' ')}
        >
            <h3 className={["other_font font-bold text-[22px] leading-snug relative z-10 transition-colors duration-300",
                isActive ? 'text-white' : 'text-[#1a1a1a]'].join(' ')}>{card.title}</h3>
            <p className={["other_font text-[16px] relative z-10 transition-colors duration-300",
                isActive ? 'text-white/80' : 'text-black/55'].join(' ')}>{card.description}</p>
        </motion.div>
    );
}

const AboutS5 = ({ dict }: AboutS5Props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <div className="relative py-16 rounded-2xl bg-[#E9F0EF] overflow-hidden">
            <div className="container">
                <div className="py-10">
                    <h1 className="mt-10 other_font font-semibold text-4xl sm:text-5xl uppercase text-[#2B362D] mb-5">{dict.title}</h1>
                    <p className="w-full md:w-1/2">{dict.subtitle}</p>
                </div>
                <div className="relative z-10 mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {dict.cards.map((card:AboutDictionary['s5']['cards'], i:number) => (
                            <Card key={card.title} card={card} index={i}
                                  isActive={activeIndex === i}
                                  onMouseEnter={() => setActiveIndex(i)}
                                  onMouseLeave={() => setActiveIndex(0)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutS5;