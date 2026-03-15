"use client"
import React, {useRef, useState} from 'react';
import {motion, useInView, AnimatePresence} from 'framer-motion';
import i1 from "@/assets/home/home_s3/1.jpg"
import i2 from "@/assets/home/home_s3/2.jpg"
import i3 from "@/assets/home/home_s3/3.jpg"
import i4 from "@/assets/home/home_s3/4.jpg"
import i5 from "@/assets/home/home_s3/5.jpg"
import i6 from "@/assets/home/home_s3/6.jpg"
import i7 from "@/assets/home/home_s3/7.jpg"
import i8 from "@/assets/home/home_s3/8.jpg"
import i9 from "@/assets/home/home_s3/9.jpg"
import Image, {StaticImageData} from "next/image";

// ── Data ───────────────────────────────────────────────────
const TABS = ['По типам продукции', 'Комплексные решения'] as const;

const TAB_DATA: Record<number, { title: string; desc: string; img: StaticImageData }[]> = {
    0: [
        {
            title: 'Прутки',
            desc: 'Мы предлагаем прутки прессованные круглые, квадратные, шестигранные, калиброванные размеров от 8 до 254 мм из различных сплавов',
            img: i1,
        },
        {
            title: 'Профили',
            desc: 'Мы производим алюминиевые профили различного назначения: архитектурно-строительные, интерьерные, строительные, стандартные, машиностроительные и по чертежам заказчика',
            img: i2,
        },
        {
            title: 'Трубы',
            desc: 'КраМЗ производит трубы: волоченые, прессованные, катаные и бухтового волочения',
            img: i3,
        },
        {
            title: 'Лента',
            desc: 'Прокатное производство КраМЗ базируется на стане холодной прокатки «Кварто 500» и установке бесслитковой прокатки ленты (БПЛ)',
            img: i4,
        },
        {
            title: 'Штамповки',
            desc: 'Прокатная продукция КраМЗ представлена пластинами, лентой ГРЭТС, лентой тонкой и стандартной',
            img: i5,
        },
    ],
    1: [
        {
            title: 'Строительство',
            desc: 'Мы предлагаем как готовые архитектурно-строительные системы, так и нестандартные решения под нужды заказчика',
            img: i6,
        },
        {
            title: 'Инфраструктура',
            desc: 'КраМЗ — первый среди производителей алюминиевых мостов и инфраструктурных решений',
            img: i7,
        },
        {
            title: 'Транспорт',
            desc: 'Продукция КраМЗ активно применяется для производства широкого спектра транспортных средств',
            img: i8,
        },
        {
            title: 'Комфортная среда',
            desc: 'Завод производит и поставляет продукцию для благоустройства городской и загородной среды',
            img: i9,
        },
    ],
};

// ── Card ───────────────────────────────────────────────────
function ProductCard({item, index}: { item: { title: string; desc: string; img: StaticImageData }; index: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, {once: true, margin: '-40px'});

    return (
        <motion.div
            ref={ref}
            initial={{opacity: 0, y: 20}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.5, delay: (index % 3) * 0.08, ease: [0.25, 0.46, 0.45, 0.94]}}
            className="flex h-[450px] md:h-auto flex-col gap-4 bg-[#fff] rounded-2xl p-5 cursor-pointer
                       hover:bg-[#E8F2F0] group transition-colors duration-300 min-w-[280px]"
        >
            {/* Title + arrow */}
            <div className="flex items-center gap-1.5">
                <h3 className="title_font text-[#009C89] text-[21px] font-bold tracking-tight leading-tight">
                    {item.title}
                </h3>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20" height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#009C89"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="hidden group-hover:block flex-shrink-0"
                >
                    <path d="m9 18 6-6-6-6"/>
                </svg>
            </div>

            {/* Description */}
            <p className="other_font text-[16px] leading-[1.6] text-black flex-1 min-h-[60px]">
                {item.desc}
            </p>

            {/* Image */}
            <div className="w-full h-44 rounded-xl overflow-hidden">
                <Image
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
            </div>
        </motion.div>
    );
}

// ── Main ───────────────────────────────────────────────────
const HomeS3 = () => {
    const [activeTab, setActiveTab] = useState(0);
    const titleRef = useRef(null);
    const titleInView = useInView(titleRef, {once: true, margin: '-40px'});

    const items = TAB_DATA[activeTab] ?? [];

    const firstRow = items.slice(0, 2);
    const secondRow = items.slice(2);

    return (
        <div className="w-full py-16 overflow-hidden">
            <div className="container">

                {/* Заголовок */}
                <motion.h2
                    ref={titleRef}
                    initial={{opacity: 0, y: 20}}
                    animate={titleInView ? {opacity: 1, y: 0} : {}}
                    transition={{duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94]}}
                    className="other_font font-semibold text-4xl md:text-4xl lg:text-5xl uppercase tracking-tight text-[#1a1a1a] mb-3"
                >
                    Продукция
                </motion.h2>

                {/* Подзаголовок */}
                <motion.p
                    initial={{opacity: 0, y: 12}}
                    animate={titleInView ? {opacity: 1, y: 0} : {}}
                    transition={{duration: 0.5, delay: 0.08}}
                    className="other_font text-[16px] text-black mb-8 max-w-sm leading-snug"
                >
                    Мы создаем технологии, алюминиевые продукты и решения для настоящего и будущего
                </motion.p>

                {/* Табы — уникальный layoutId "s3-tab" */}
                <motion.div
                    initial={{opacity: 0, y: 10}}
                    animate={titleInView ? {opacity: 1, y: 0} : {}}
                    transition={{duration: 0.5, delay: 0.14}}
                    className="flex gap-1 mb-8 p-1 rounded-full w-fit bg-white"
                >
                    {TABS.map((tab, i) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(i)}
                            className="relative px-5 sm:px-8 py-3 rounded-full text-[14px] sm:text-[16px] font-medium cursor-pointer other_font"
                        >
                            {activeTab === i && (
                                <motion.div
                                    layoutId="s3-activeTab"
                                    className="absolute inset-0 bg-[#009C89] rounded-full"
                                    transition={{duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94]}}
                                />
                            )}
                            <span
                                className={`relative z-10 transition-colors duration-300 ${
                                    activeTab === i ? "text-white" : "text-black"
                                }`}
                            >
                                {tab}
                            </span>
                        </button>
                    ))}
                </motion.div>

                {/* Grid — desktop */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -10}}
                        transition={{duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94]}}
                    >
                        {/* Desktop grid */}
                        <div className="hidden md:flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                {firstRow.map((item, i) => (
                                    <ProductCard key={item.title} item={item} index={i}/>
                                ))}
                            </div>

                            {secondRow.length > 0 && (
                                <div className={`grid gap-4 ${secondRow.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                                    {secondRow.map((item, i) => (
                                        <ProductCard key={item.title} item={item} index={i + firstRow.length}/>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Mobile swiper */}
                        <div className="md:hidden -mx-4 px-4">
                            <div
                                className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
                                style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}
                            >
                                {items.map((item, i) => (
                                    <div key={item.title} className="snap-start flex-shrink-0 w-[78vw] max-w-[300px]">
                                        <ProductCard item={item} index={i}/>
                                    </div>
                                ))}
                            </div>

                            {/* Scroll dots */}
                            <div className="flex justify-center gap-1.5 mt-2">
                                {items.map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-1.5 h-1.5 rounded-full bg-[#009C89]/30"
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

            </div>
        </div>
    );
};

export default HomeS3;