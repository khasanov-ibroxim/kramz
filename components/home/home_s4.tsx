"use client"
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import watermarker from "@/assets/loadingElement.svg"
import Image from "next/image";

const TEXTS = [
    'КраМЗ — один из крупнейших производителей и инжиниринговых центров алюминиевых продуктов и решений в РФ и СНГ'

];

const STATS = [
    { value: '01',          label: 'Среди производителей алюминиевых мостов и инфраструктурных решений', highlight: false  },
    { value: '02',       label: 'Среди предприятий по переработке алюминия',                          highlight: false },
    { value: '03',    label: 'География поставок продукции КраМЗ',                                 highlight: false },
    { value: '04',   label: 'тонн в год. Производственные мощности компании',                     highlight: false },
    { value: '04', label: 'Эксперты в области алюминиевых продуктов и решений',                 highlight: false },
    { value: '05',     label: 'Освоенных номенклатур профилей, прутков и труб различных сечений',   highlight: false },
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
            className={"relative transition-colors duration-500 hover:bg-[#009C89] group flex flex-col items-start justify-start text-left rounded-2xl p-8 md:p-10"}
        >

            {!stat.highlight && (
                <>
                    {/* top line */}
                    <div className="absolute group-hover:hidden top-0 left-1/2 -translate-x-1/2 w-[90%] h-[1px] bg-black/20" />

                    {/* bottom line */}
                    <div className="absolute group-hover:hidden bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-[1px] bg-black/20" />

                    <div className="absolute group-hover:hidden left-0 top-1/2 -translate-y-1/2 h-[90%] w-[1px] bg-black/20" />
                    <div className="absolute group-hover:hidden right-0 top-1/2 -translate-y-1/2 h-[90%] w-[1px] bg-black/20" />
                </>
            )}

            <div
                className={"title_font text-3xl md:text-4xl font-bold leading-none tracking-tight mb-3 text-[#009C89] group-hover:text-[#fff] "}
            >
                {stat.value}
            </div>

            <div
                className={"other_font text-sm leading-snug max-w-[200px] text-black group-hover:text-[#fff]"}
            >
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
        <div className="relative py-16 rounded-2xl bg-[#E9F0EF] overflow-hidden">

            {/* Watermark */}
            <div className="absolute inset-0 flex justify-end items-center z-0 pointer-events-none select-none">
                <Image src={watermarker} alt="" className="w-full h-full object-cover opacity-100" />
            </div>

            <div className="container relative z-10">

                {/* Заголовок */}
                <motion.h2
                    ref={titleRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={titleInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="title_font font-semibold  text-4xl md:text-5xl lg:text-5xl uppercase mb-10 tracking-tight text-[#1a1a1a]"
                >
                    Преимущества
                </motion.h2>

                {/* Описания — 3 колонки, первая пустая */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mb-10">
                    {TEXTS.map((text, i) => (
                        <TextPara key={i} text={text} delay={i * 0.1} />
                    ))}
                </div>

                {/* Сетка карточек 3×2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  pt-4">
                    {STATS.map((stat, i) => (
                        <StatCard key={stat.value} stat={stat} index={i} />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default HomeS4;