"use client"
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import watermarker from "@/assets/loadingElement.svg"
import Image from "next/image";
import type { HomeDictionary } from '@/lib/dictionary';

interface HomeS2Props {
    dict: HomeDictionary['s2'];
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

function StatCard({ stat, index, total }: {
    stat: { value: string; label: string; highlight?: boolean };
    index: number; total: number;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-50px' });
    const col = index % 3;
    const row = Math.floor(index / 3);
    const totalRows = Math.ceil(total / 3);
    const isLastRow = row === totalRows - 1;
    const isLastCol = col === 2 || index === total - 1;

    return (
        <motion.div ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: col * 0.09, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className={["relative flex flex-col items-center justify-center text-center p-8 md:p-10",
                        stat.highlight ? "bg-[#50D873] rounded-2xl" : "rounded-2xl"].join(" ")}
        >
            {!stat.highlight && (
                <>
                    <div className="absolute top-0 left-4 right-4 h-[1px] bg-black/15" />
                    {!isLastRow && <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-black/15" />}
                    {col !== 0 && <div className="absolute left-0 top-4 bottom-4 w-[1px] bg-black/15" />}
                    {!isLastCol && <div className="absolute right-0 top-4 bottom-4 w-[1px] bg-black/15" />}
                </>
            )}
            <div className={["title_font text-4xl md:text-5xl font-bold leading-none tracking-tight mb-3",
                stat.highlight ? "text-white" : "text-[#1a1a1a]"].join(" ")}>
                {stat.value}
            </div>
            <div className={["other_font text-sm leading-snug max-w-[200px]",
                stat.highlight ? "text-white/75" : "text-black/55"].join(" ")}>
                {stat.label}
            </div>
        </motion.div>
    );
}

const HomeS2 = ({ dict }: HomeS2Props) => {
    const titleRef = useRef(null);
    const titleInView = useInView(titleRef, { once: true, margin: '-40px' });

    const stats = dict.stats.map(
        (s: { value: string; label: string }, i: number) => ({
            ...s,
            highlight: i === 0
        })
    );
    return (
        <div className="relative py-16 rounded-2xl bg-[#E9F0EF] overflow-hidden">
            <div className="absolute inset-0 flex justify-end items-center z-0 pointer-events-none select-none">
                <Image src={watermarker} alt="" className="w-full h-full object-cover opacity-100" />
            </div>
            <div className="container relative z-10">
                <motion.h2 ref={titleRef}
                           initial={{ opacity: 0, y: 20 }}
                           animate={titleInView ? { opacity: 1, y: 0 } : {}}
                           transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                           className="title_font font-bold text-4xl md:text-5xl lg:text-6xl uppercase mb-10 tracking-tight text-[#1a1a1a]"
                >{dict.title}</motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mb-10">
                    <div className="hidden md:block" />
                    {dict.texts.map((text:string, i:number) => <TextPara key={i} text={text} delay={i * 0.1} />)}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pt-4">
                    {stats.map((stat, i) => (
                        <StatCard key={stat.value} stat={stat} index={i} total={stats.length} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeS2;