"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import i1 from "@/assets/about/about_s3/1.png"
import i2 from "@/assets/about/about_s3/2.png"
import i3 from "@/assets/about/about_s3/3.png"
import i4 from "@/assets/about/about_s3/4.png"
import i5 from "@/assets/about/about_s3/6.png"
import i6 from "@/assets/about/about_s3/7.png"
import i7 from "@/assets/about/about_s3/8.png"

const HISTORY_DATA = [
    { period: '1960 - 1970', title: '1960 - 1970', description: 'Началось строительство Красноярского завода алюминиевого проката в системе авиационной промышленности. Он должен был восполнить нехватку проката продукции в стране и дать импульс развитию производственных сил Крайнего Востока. В 1967 году КраМЗ выдал первую продукцию — алюминиевый прокат.', image: i1 },
    { period: '1970 - 1980', title: '1970 - 1980', description: 'Завод стремительно расширял производственные мощности. Были введены в эксплуатацию новые прокатные станы, освоены передовые технологии обработки алюминиевых сплавов. Численность сотрудников выросла до нескольких тысяч человек.', image: i2 },
    { period: '1980 - 1990', title: '1980 - 1990', description: 'Период активной модернизации и технического перевооружения. Завод освоил производство новых видов продукции для авиационной и космической промышленности. Внедрены современные системы контроля качества.', image: i3 },
    { period: '1990 - 2000', title: '1990 - 2000', description: 'В условиях экономических реформ предприятие прошло через период реструктуризации. Были сохранены ключевые компетенции и производственный потенциал, налажены новые партнёрства с международными компаниями.', image: i4 },
    { period: '2000 - 2010', title: '2000 - 2010', description: 'Активное развитие экспортных направлений. Продукция завода получила признание на мировых рынках. Проведена масштабная инвестиционная программа по обновлению оборудования и расширению ассортимента.', image: i5 },
    { period: '2010 - 2020', title: '2010 - 2020', description: 'Цифровая трансформация производства, внедрение систем автоматизации и роботизации. Завод стал одним из лидеров отрасли по показателям производительности и качества продукции в России.', image: i6 },
    { period: '2020 - н.в.', title: '2020 - настоящее время', description: 'Несмотря на глобальные вызовы, предприятие продолжает уверенный рост. Реализуются проекты по расширению производства, разработке инновационных сплавов и укреплению позиций на международных рынках.', image: i7 },
];

function HistoryImage({ period, src }: { period: string; src: string | StaticImageData }) {
    return (
        <div className="w-full h-full rounded-2xl overflow-hidden">
            <Image src={src} alt={period} className="w-full h-full object-cover" />
        </div>
    );
}

// ── ease must be a 4-tuple so TS matches Framer's BezierDefinition type ──
const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const contentVariants: Variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40, transition: { duration: 0.3, ease: EASE } }),
};

const AboutS3 = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [direction, setDirection] = useState(1);

    const current = HISTORY_DATA[selectedIndex];

    function selectPeriod(index: number) {
        setDirection(index > selectedIndex ? 1 : -1);
        setSelectedIndex(index);
        setDropdownOpen(false);
    }

    function goNext() {
        if (selectedIndex < HISTORY_DATA.length - 1) { setDirection(1); setSelectedIndex(i => i + 1); }
    }

    function goPrev() {
        if (selectedIndex > 0) { setDirection(-1); setSelectedIndex(i => i - 1); }
    }

    return (
        <div className="relative py-16 bg-[#E9F0EF] rounded-2xl overflow-hidden">
            <div className="container mx-auto px-6 lg:px-10">

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="other_font font-bold text-4xl md:text-5xl uppercase tracking-tight text-[#1a1a1a] mb-10"
                >
                    История
                </motion.h2>

                <div className="flex items-center justify-between mb-8">
                    {/* Dropdown */}
                    <div className="relative z-20">
                        <button
                            onClick={() => setDropdownOpen(o => !o)}
                            className="other_font flex items-center gap-3 bg-white rounded-2xl px-5 py-3 text-[15px] text-[#1a1a1a] shadow-sm border border-black/5 hover:border-black/10 transition-all duration-200 min-w-[160px] justify-between"
                        >
                            <span>{current.period}</span>
                            <motion.span animate={{ rotate: dropdownOpen ? 0 : 180 }} transition={{ duration: 0.25 }}>
                                <ChevronUp size={16} className="text-black/40" />
                            </motion.span>
                        </button>

                        <AnimatePresence>
                            {dropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                                    transition={{ duration: 0.2, ease: EASE }}
                                    className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-lg border border-black/5 overflow-hidden min-w-[160px]"
                                >
                                    {HISTORY_DATA.map((item, i) => (
                                        <button
                                            key={item.period}
                                            onClick={() => selectPeriod(i)}
                                            className={[
                                                "other_font w-full text-left px-5 py-3 text-[15px] transition-colors duration-150",
                                                i === selectedIndex ? "text-[#009C89] font-semibold" : "text-[#1a1a1a] hover:bg-black/5",
                                            ].join(" ")}
                                        >
                                            {item.period}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Arrows */}
                    <div className="flex items-center gap-3">
                        <button onClick={goPrev} disabled={selectedIndex === 0} className="w-11 h-11 rounded-full bg-white border border-black/10 flex items-center justify-center text-[#1a1a1a] hover:border-[#009C89] hover:text-[#009C89] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm">
                            <ChevronLeft size={18} />
                        </button>
                        <button onClick={goNext} disabled={selectedIndex === HISTORY_DATA.length - 1} className="w-11 h-11 rounded-full bg-white border border-black/10 flex items-center justify-center text-[#1a1a1a] hover:border-[#009C89] hover:text-[#009C89] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm">
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="relative overflow-hidden bg-white p-10 rounded-2xl">
                    <AnimatePresence custom={direction} mode="wait">
                        <motion.div
                            key={selectedIndex}
                            custom={direction}
                            variants={contentVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
                        >
                            <div className="flex flex-col justify-between h-full gap-10">
                                <div>
                                    <h3 className="other_font font-bold text-4xl md:text-5xl text-[#1a1a1a] mb-6 tracking-tight">
                                        {current.title}
                                    </h3>
                                    <p className="other_font text-[15px] leading-[1.75] text-black/60">
                                        {current.description}
                                    </p>
                                </div>
                                <div className="flex items-center gap-0 self-start">
                                    <button
                                        style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 10px 10px 22px', borderRadius: 100, border: '1.5px solid rgba(0,0,0,0.12)', cursor: 'pointer', fontSize: 14, fontWeight: 500 }}
                                        className="bg-transparent mt-5 group hover:bg-[#009C89] text-black hover:text-white transition-colors duration-300"
                                    >
                                        Читать полностью
                                        <span style={{ width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="group-hover:bg-white bg-[#009C89] transition-colors duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right group-hover:stroke-[#009C89] stroke-white"><path d="m9 18 6-6-6-6" /></svg>
                                        </span>
                                    </button>
                                </div>
                            </div>

                            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
                                <HistoryImage period={current.period} src={current.image} />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
};

export default AboutS3;