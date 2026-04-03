"use client"
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import watermarker from "@/assets/loadingElement.svg"
import Image from "next/image";
import type {HomeDictionary} from "@/lib/dictionary";

// ── Параграф ───────────────────────────────────────────────
function TextPara({ text, delay }: { text: string; delay: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });
    return (
        <motion.p
            ref={ref}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="other_font text-[15px] leading-[1.65] text-black m-0"
        >
            {text}
        </motion.p>
    );
}

// ── Карточка ───────────────────────────────────────────────
function StatCard({ stat, index }: { stat: { value: string; title:string, label: string }; index: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: (index % 3) * 0.09, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ '--hover-bg': '#0d3e29' } as React.CSSProperties}
            className={[
                "relative group",
                "flex flex-col items-start justify-start text-left",
                "rounded-2xl",
                "p-5 sm:p-7 md:p-8 lg:p-10",
                "[transition:background-color_0.35s_ease]",
                "hover:bg-[#0d3e29]",
                "min-h-[140px] sm:min-h-[160px]",
            ].join(' ')}
        >
            <>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-[1px] bg-black/20 transition-opacity duration-300 group-hover:opacity-0" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-[1px] bg-black/20 transition-opacity duration-300 group-hover:opacity-0" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[90%] w-[1px] bg-black/20 transition-opacity duration-300 group-hover:opacity-0" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[90%] w-[1px] bg-black/20 transition-opacity duration-300 group-hover:opacity-0" />
            </>

            <div className={[
                "title_font font-bold leading-none tracking-tight mb-3",
                "text-2xl sm:text-3xl md:text-4xl",
                "text-[#50D873] group-hover:text-white",
                "[transition:color_0.35s_ease]",
            ].join(' ')}>
                {stat.value}
            </div>

            <div className={[
                "other_font leading-snug",
                "text-sm max-w-full sm:max-w-[220px]",
                "text-black group-hover:text-white",
                "[transition:color_0.35s_ease]",
            ].join(' ')}>
                <h1 className={"uppercase text-lg leading-5 mb-1.5 font-medium"}>{stat.title}</h1>
                {stat.label}
            </div>
        </motion.div>
    );
}

interface HomeS4Props {
    dict: HomeDictionary['s4'];
}

const HomeS4 = ({ dict }: HomeS4Props) => {
    const titleRef = useRef(null);
    const titleInView = useInView(titleRef, { once: true, margin: '-40px' });

    return (
        <div className="relative py-10 sm:py-14 md:py-16 rounded-2xl bg-[#E9F0EF] overflow-hidden">

            <div className="absolute inset-0 flex justify-end items-center z-0 pointer-events-none select-none">
                <Image src={watermarker} alt="" className="w-full h-full object-cover opacity-100" />
            </div>

            <div className="container relative z-10 px-4 sm:px-6 md:px-8">

                {/* ✅ TITLE */}
                <motion.h2
                    ref={titleRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={titleInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="title_font font-semibold text-3xl sm:text-4xl md:text-5xl uppercase mb-8 md:mb-10 tracking-tight text-[#1a1a1a]"
                >
                    {dict.title}
                </motion.h2>

                {/* ✅ TEXT */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10 mb-8 md:mb-10">
                    <TextPara text={dict.text} delay={0} />
                </div>

                {/* ✅ STATS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pt-4">
                    {dict.stats.map((stat, i) => (
                        <StatCard key={`${stat.value}-${i}`} stat={stat} index={i} />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default HomeS4;