"use client"
import React, {useRef, useState} from 'react';
import {motion, useInView} from "framer-motion";

const STATS = [
    {
        value: '17000+',
        unit: 'видов\nпродукции',
        label: 'Номенклатура производимой продукции',
        highlight: true,
    },
    {
        value: '22+',
        unit: 'тыс. тонн\nв год',
        label: 'HARD ALLOYS: трубы, прутки, профили для сегментов машиностроения, авиации, судостроения и др. транспорта',
        highlight: false,
    },
    {
        value: '18+',
        unit: 'тыс. тонн\nв год',
        label: 'SOFT ALLOYS: стандартный профиль по чертежам заказчика для сегментов строительства, мостостроения, несущих систем и транспорта',
        highlight: false,
    },
    {
        value: '70+',
        unit: 'алюминиевых\nмостов',
        label: 'Изготовлено для городов Российской Федерации и зарубежных заказчиков',
        highlight: false,
    },
];

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

    const col = index % 4;
    const isLastCol = index === total - 1;

    const anyNonHighlightHovered = hoveredIndex !== null && !STATS[hoveredIndex].highlight;
    const isHovered = hoveredIndex === index;

    const highlightBg = anyNonHighlightHovered ? 'bg-transparent' : 'bg-[#009C89]';
    const highlightText = anyNonHighlightHovered ? 'text-[#1a1a1a]' : 'text-white';
    const highlightSubText = anyNonHighlightHovered ? 'text-[#4a5c4d]' : 'text-white/80';

    const normalBg = isHovered ? 'bg-[#009C89]' : 'bg-transparent';
    const normalText = isHovered ? 'text-white' : 'text-[#1a1a1a]';
    const normalSubText = isHovered ? 'text-white/80' : 'text-[#4a5c4d]';

    const bg = stat.highlight ? highlightBg : normalBg;
    const textColor = stat.highlight ? highlightText : normalText;
    const subTextColor = stat.highlight ? highlightSubText : normalSubText;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: col * 0.09, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`relative flex flex-col justify-start p-6 md:p-8 rounded-2xl transition-colors duration-300 cursor-pointer min-h-[200px] ${bg}`}
            onMouseEnter={() => onMouseEnter(index)}
            onMouseLeave={onMouseLeave}
        >
            <>
                <div className="absolute top-0 left-4 right-4 h-[1px] bg-black/15" />
                <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-black/15" />
                <div className="absolute left-0 top-4 bottom-4 w-[1px] bg-black/15" />

                <div className="absolute right-0 top-4 bottom-4 w-[1px] bg-black/15" />
            </>

            {/* Top: big number + small unit label side by side */}
            <div className="flex items-start justify-between gap-3">
                <span className={`other_font text-5xl md:text-4xl font-bold leading-none tracking-tight transition-colors duration-300 ${textColor}`}>
                    {stat.value}
                </span>
                <span className={`other_font text-xs font-semibold leading-snug mt-1 whitespace-pre-line transition-colors duration-300 uppercase tracking-wide ${subTextColor}`}>
                    {stat.unit}
                </span>
            </div>

            {/* Bottom: description */}
            <p className={`other_font text-base leading-snug mt-3 transition-colors duration-300 ${textColor}`}>
                {stat.label}
            </p>
        </motion.div>
    );
}

const ProductionS3 = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="py-32 container">
            <div className="w-full pb-10">
                <h1 className="other_font uppercase font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-[#2B362D]">
                    Один из крупнейших переработчиков страны
                </h1>
                <p className="other_font w-full mt-4 md:w-1/2 text-sm md:text-base text-[#2B362D]">
                    Накопленный годами опыт и система контроля качества на всех этапах производства гарантируют
                    потребителям алюминиевых полуфабрикатов надежность, точность и постоянство характеристик
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 pt-4">
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
    );
};

export default ProductionS3;