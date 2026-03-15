"use client"
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import watermarker from "@/assets/loadingElement.svg"
import Image from "next/image";

const TEXTS = [
    'Красноярский металлургический завод является третьим по мощности и самым молодым из крупных перерабатывающих предприятий России. Основные производства — плавильное, прессовое и кузнечное.',
    'Действующее производство ООО «КраМЗ» обеспечивает выпуск плоских и круглых слитков, прессованных профилей, прутков и труб, поковок и штамповок из широкой гаммы алюминиевых сплавов в соответствии с химическим составом российских и зарубежных стандартов.',
];

const STATS = [
    { value: '№1',          label: 'Среди производителей алюминиевых мостов и инфраструктурных решений', highlight: true  },
    { value: 'Топ-3',       label: 'Среди предприятий по переработке алюминия',                          highlight: false },
    { value: '37 стран',    label: 'География поставок продукции КраМЗ',                                 highlight: false },
    { value: '>130 тыс.',   label: 'тонн в год. Производственные мощности компании',                     highlight: false },
    { value: 'с 1969 года', label: 'Эксперты в области алюминиевых продуктов и решений',                 highlight: false },
    { value: '>13 000',     label: 'Освоенных номенклатур профилей, прутков и труб различных сечений',   highlight: false },
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
            className="other_font text-[15px] leading-[1.65] text-black/60 m-0"
        >
            {text}
        </motion.p>
    );
}

// ── Карточка ───────────────────────────────────────────────
function StatCard({ stat, index, total }: { stat: typeof STATS[0]; index: number; total: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-50px' });

    // Grid positions for 3-column layout
    const col = index % 3;
    const row = Math.floor(index / 3);
    const totalRows = Math.ceil(total / 3);

    const isLastRow = row === totalRows - 1;
    const isLastCol = col === 2 || index === total - 1;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: col * 0.09, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={[
                "relative flex flex-col items-center justify-center text-center",
                "p-8 md:p-10",
                stat.highlight ? "bg-[#009C89] rounded-2xl" : "rounded-2xl",
            ].join(" ")}
        >
            {!stat.highlight && (
                <>
                    {/* top border — всегда */}
                    <div className="absolute top-0 left-4 right-4 h-[1px] bg-black/15" />

                    {/* bottom border — только не в последней строке */}
                    {!isLastRow && (
                        <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-black/15" />
                    )}

                    {/* left border — только не в первой колонке */}
                    {col !== 0 && (
                        <div className="absolute left-0 top-4 bottom-4 w-[1px] bg-black/15" />
                    )}

                    {/* right border — только не в последней колонке */}
                    {!isLastCol && (
                        <div className="absolute right-0 top-4 bottom-4 w-[1px] bg-black/15" />
                    )}
                </>
            )}

            <div
                className={[
                    "title_font text-4xl md:text-5xl font-bold leading-none tracking-tight mb-3",
                    stat.highlight ? "text-white" : "text-[#1a1a1a]",
                ].join(" ")}
            >
                {stat.value}
            </div>

            <div
                className={[
                    "other_font text-sm leading-snug max-w-[200px]",
                    stat.highlight ? "text-white/75" : "text-black/55",
                ].join(" ")}
            >
                {stat.label}
            </div>
        </motion.div>
    );
}

// ── Main ───────────────────────────────────────────────────
const HomeS2 = () => {
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
                    className="title_font font-bold text-4xl md:text-5xl lg:text-6xl uppercase mb-10 tracking-tight text-[#1a1a1a]"
                >
                    Ключевые показатели
                </motion.h2>

                {/* Описания — 3 колонки, первая пустая */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mb-10">
                    <div className="hidden md:block" />
                    {TEXTS.map((text, i) => (
                        <TextPara key={i} text={text} delay={i * 0.1} />
                    ))}
                </div>

                {/* Сетка карточек — mobile: 1 col, tablet: 2 col, desktop: 3 col */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pt-4">
                    {STATS.map((stat, i) => (
                        <StatCard key={stat.value} stat={stat} index={i} total={STATS.length} />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default HomeS2;