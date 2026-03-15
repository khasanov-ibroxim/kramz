"use client"
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import watermarker from "@/assets/loadingElement.svg"
import Image from "next/image";

const TEXTS = [
    'КраМЗ — один из крупнейших производителей и инжиниринговых центров алюминиевых продуктов и решений в РФ и СНГ'
];

const STATS = [
    { value: '01', label: 'Среди производителей алюминиевых мостов и инфраструктурных решений', highlight: false },
    { value: '02', label: 'Среди предприятий по переработке алюминия',                          highlight: false },
    { value: '03', label: 'География поставок продукции КраМЗ',                                 highlight: false },
    { value: '04', label: 'тонн в год. Производственные мощности компании',                     highlight: false },
    { value: '04', label: 'Эксперты в области алюминиевых продуктов и решений',                 highlight: false },
    { value: '05', label: 'Освоенных номенклатур профилей, прутков и труб различных сечений',   highlight: false },
];

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
function StatCard({ stat, index }: { stat: typeof STATS[0]; index: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: (index % 3) * 0.09, ease: [0.25, 0.46, 0.45, 0.94] }}
            // 🔧 FIX 1: bg va text color CSS variable bilan,
            //    [transition:background-color_0.35s_ease,color_0.35s_ease] — Tailwind arbitrary transition
            //    bu framer-motion animatsiya tugagandan keyin ham ishlaydi
            style={{ '--hover-bg': '#009C89' } as React.CSSProperties}
            className={[
                "relative group",
                "flex flex-col items-start justify-start text-left",
                "rounded-2xl",
                // 🔧 FIX 2: padding responsive — kichik ekranda p-5, kattada p-8/p-10
                "p-5 sm:p-7 md:p-8 lg:p-10",
                // 🔧 FIX 3: transition faqat background-color va color uchun, 350ms
                "[transition:background-color_0.35s_ease]",
                "hover:bg-[#009C89]",
                // min-height responsive
                "min-h-[140px] sm:min-h-[160px]",
            ].join(' ')}
        >
            {/* Border lines — faqat hover bo'lmaganda ko'rinadi */}
            <>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-[1px] bg-black/20
                                transition-opacity duration-300 group-hover:opacity-0" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-[1px] bg-black/20
                                transition-opacity duration-300 group-hover:opacity-0" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[90%] w-[1px] bg-black/20
                                transition-opacity duration-300 group-hover:opacity-0" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[90%] w-[1px] bg-black/20
                                transition-opacity duration-300 group-hover:opacity-0" />
            </>

            {/* Value */}
            <div className={[
                "title_font font-bold leading-none tracking-tight mb-3",
                // 🔧 FIX 4: font size responsive
                "text-2xl sm:text-3xl md:text-4xl",
                // 🔧 FIX 5: color transition
                "text-[#009C89] group-hover:text-white",
                "[transition:color_0.35s_ease]",
            ].join(' ')}>
                {stat.value}
            </div>

            {/* Label */}
            <div className={[
                "other_font leading-snug",
                // 🔧 FIX 6: max-w responsive — mobilda full width
                "text-sm max-w-full sm:max-w-[220px]",
                "text-black group-hover:text-white",
                "[transition:color_0.35s_ease]",
            ].join(' ')}>
                {stat.label}
            </div>
        </motion.div>
    );
}

// ── Main ───────────────────────────────────────────────────
const HomeS4 = () => {
    const titleRef = useRef(null);
    const titleInView = useInView(titleRef, { once: true, margin: '-40px' });

    return (
        // 🔧 FIX 7: py responsive
        <div className="relative py-10 sm:py-14 md:py-16 rounded-2xl bg-[#E9F0EF] overflow-hidden">

            {/* Watermark */}
            <div className="absolute inset-0 flex justify-end items-center z-0 pointer-events-none select-none">
                <Image src={watermarker} alt="" className="w-full h-full object-cover opacity-100" />
            </div>

            <div className="container relative z-10 px-4 sm:px-6 md:px-8">

                {/* Заголовок */}
                <motion.h2
                    ref={titleRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={titleInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    // 🔧 FIX 8: font size responsive steps
                    className="title_font font-semibold text-3xl sm:text-4xl md:text-5xl uppercase mb-8 md:mb-10 tracking-tight text-[#1a1a1a]"
                >
                    Преимущества
                </motion.h2>

                {/* Описания — responsive columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10 mb-8 md:mb-10">
                    {TEXTS.map((text, i) => (
                        <TextPara key={i} text={text} delay={i * 0.1} />
                    ))}
                </div>

                {/* Сетка карточек — 1 col mobile, 2 col tablet, 3 col desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pt-4">
                    {STATS.map((stat, i) => (
                        <StatCard key={`${stat.value}-${i}`} stat={stat} index={i} />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default HomeS4;