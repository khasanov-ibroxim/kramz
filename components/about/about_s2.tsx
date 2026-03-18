"use client"
import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import watermarker from "@/assets/loadingElement.svg"
import Image from "next/image";
import { Map } from "lucide-react"

const TEXTS = [
    'Наш главный фокус в работе — люди, клиенты и безопасность'
];

const STATS = [
    { value: 'Миссия',    icon: <Map />, label: 'Заботиться о сотрудниках и клиентах компании, постоянно улучшая условия труда и совершенствуя сервис\n',                                                                                  highlight: true  },
    { value: 'Цель',      icon: <Map />, label: 'Укрепление позиций на российском и международном рынках за счет расширения портфеля продуктов и постоянного совершенствования технологий производства и инжиниринга\n',                highlight: false },
    { value: 'Видение\n', icon: <Map />, label: 'Вдохновленные общей идеей, сотрудники компании формируют новое завтра, в котором передовые технологии позволяют создавать лучший мир\n',                                             highlight: false },
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
            Наш главный фокус в работе — люди, клиенты и безопасность
        </motion.p>
    );
}

// ── Карточка ───────────────────────────────────────────────
function StatCard({
                      stat,
                      index,
                      total,
                      hoveredIndex,
                      onMouseEnter,
                      onMouseLeave,
                  }: {
    stat: typeof STATS[0];
    index: number;
    total: number;
    hoveredIndex: number | null;
    onMouseEnter: (i: number) => void;
    onMouseLeave: () => void;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-50px' });

    const col = index % 3;
    const isLastCol = col === 2 || index === total - 1;

    // Biror non-highlight card hover bo'lyaptimi?
    const anyNonHighlightHovered = hoveredIndex !== null && !STATS[hoveredIndex].highlight;
    // Bu card hover bo'lyaptimi?
    const isHovered = hoveredIndex === index;

    // highlight card uchun bg logikasi:
    // - hech kim hover qilmagan → bg-[#009C89]
    // - non-highlight card hover → bg transparent
    // - o'zi hover → (highlight card hover bo'lmaydi, lekin ehtiyot uchun yashil)
    const highlightBg = anyNonHighlightHovered ? 'bg-transparent' : 'bg-[#009C89]';
    const highlightTextColor = anyNonHighlightHovered ? 'text-[#1a1a1a]' : 'text-white';

    // non-highlight card uchun bg logikasi:
    // - o'zi hover → bg-[#009C89]
    // - boshqa card hover → transparent
    // - hech kim hover qilmagan → transparent
    const normalBg = isHovered ? 'bg-[#009C89]' : 'bg-transparent';
    const normalTextColor = isHovered ? 'text-white' : 'text-[#1a1a1a]';

    if (stat.highlight) {
        return (
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: col * 0.09, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`relative flex flex-col items-center justify-center text-center p-8 md:p-10 rounded-2xl transition-colors duration-300 ${highlightBg}`}
                onMouseEnter={() => onMouseEnter(index)}
                onMouseLeave={onMouseLeave}
            >
                <div className={`title_font text-4xl md:text-3xl mb-10 font-bold leading-none tracking-tight transition-colors duration-300 ${highlightTextColor}`}>
                    {stat.icon}
                </div>
                <div className={`other_font text-4xl md:text-4xl mb-5 font-bold leading-none tracking-tight transition-colors duration-300 ${highlightTextColor}`}>
                    {stat.value}
                </div>
                <div className={`other_font text-sm leading-snug transition-colors duration-300 ${highlightTextColor}`}>
                    {stat.label}
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: col * 0.09, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`relative flex flex-col items-center justify-center text-center p-8 md:p-10 rounded-2xl transition-colors duration-300 ${normalBg}`}
            onMouseEnter={() => onMouseEnter(index)}
            onMouseLeave={onMouseLeave}
        >
            {/* borders */}
            <div className="absolute top-0 left-4 right-4 h-[1px] bg-black/15" />
            <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-black/15" />
            {col !== 0 && (
                <div className="absolute left-0 top-4 bottom-4 w-[1px] bg-black/15" />
            )}
            {!isLastCol && (
                <div className="absolute right-0 top-4 bottom-4 w-[1px] bg-black/15" />
            )}

            <div className={`title_font text-4xl md:text-3xl mb-10 font-bold leading-none tracking-tight transition-colors duration-300 ${normalTextColor}`}>
                {stat.icon}
            </div>
            <div className={`other_font text-4xl md:text-4xl mb-5 font-bold leading-none tracking-tight transition-colors duration-300 ${normalTextColor}`}>
                {stat.value}
            </div>
            <div className={`other_font text-sm leading-snug transition-colors duration-300 ${normalTextColor}`}>
                {stat.label}
            </div>
        </motion.div>
    );
}

// ── Main ───────────────────────────────────────────────────
const AboutS2 = () => {
    const titleRef = useRef(null);
    const titleInView = useInView(titleRef, { once: true, margin: '-40px' });
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="relative py-16 rounded-2xl bg-[#FFFFFF] overflow-hidden">

            <div className="container relative z-10">

                {/* Заголовок */}
                <motion.h2
                    ref={titleRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={titleInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="other_font font-semibold text-4xl md:text-5xl lg:text-5xl uppercase mb-5 mt-10 tracking-tight text-[#1a1a1a]"
                >
                    Воплощаем идеи клиентов
                </motion.h2>

                {/* Описания */}
                <div className="mb-10">
                    {TEXTS.map((text, i) => (
                        <TextPara key={i} text={text} delay={i * 0.1} />
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pt-4">
                    {STATS.map((stat, i) => (
                        <StatCard
                            key={stat.value}
                            stat={stat}
                            index={i}
                            total={STATS.length}
                            hoveredIndex={hoveredIndex}
                            onMouseEnter={setHoveredIndex}
                            onMouseLeave={() => setHoveredIndex(null)}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default AboutS2;