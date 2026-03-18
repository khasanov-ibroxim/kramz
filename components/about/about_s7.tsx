"use client"
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Download, ChevronDown } from 'lucide-react';
import watermarker from "@/assets/loadingElement.svg";
import Image from 'next/image';

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

// ── Ma'lumotlar ────────────────────────────────────────────
const TABS = [
    {
        label: 'Охрана труда и промышленная безопасность',
        docs: [
            { title: 'Политика в области охраны труда', size: '714.93 КБ', type: 'PDF', file: '/docs/policy_labor.pdf' },
            { title: 'Политика по промышленной и пожарной безопасности', size: '679.24 КБ', type: 'PDF', file: '/docs/policy_fire.pdf' },
            { title: 'Сводная ведомость СОУТ 2021', size: '3.79 МБ', type: 'PDF', file: '/docs/sout_2021.pdf' },
            { title: 'Сводная ведомость СОУТ 2020', size: '2.14 МБ', type: 'PDF', file: '/docs/sout_2020.pdf' },
            { title: 'Сводная ведомость СОУТ 2019', size: '1.87 МБ', type: 'PDF', file: '/docs/sout_2019.pdf' },
            { title: 'Сводная ведомость СОУТ 2018', size: '1.52 МБ', type: 'PDF', file: '/docs/sout_2018.pdf' },
            { title: 'Положение об охране труда', size: '890.00 КБ', type: 'PDF', file: '/docs/ohrana_truda.pdf' },
            { title: 'Инструкция по пожарной безопасности', size: '540.12 КБ', type: 'PDF', file: '/docs/fire_instruction.pdf' },
        ],
    },
    {
        label: 'Экология и окружающая среда',
        docs: [
            { title: 'Экологическая политика предприятия', size: '620.00 КБ', type: 'PDF', file: '/docs/ecology_policy.pdf' },
            { title: 'Отчёт об экологической деятельности 2023', size: '4.20 МБ', type: 'PDF', file: '/docs/ecology_2023.pdf' },
            { title: 'Программа охраны окружающей среды', size: '1.10 МБ', type: 'PDF', file: '/docs/ecology_program.pdf' },
            { title: 'Разрешение на выброс загрязняющих веществ', size: '980.00 КБ', type: 'PDF', file: '/docs/emission_permit.pdf' },
            { title: 'Мониторинг водных ресурсов 2022', size: '2.30 МБ', type: 'PDF', file: '/docs/water_2022.pdf' },
        ],
    },
    {
        label: 'Сертификаты, лицензии и стандарты',
        docs: [
            { title: 'Сертификат ISO 9001:2015', size: '512.00 КБ', type: 'PDF', file: '/docs/iso_9001.pdf' },
            { title: 'Сертификат ISO 14001:2015', size: '498.00 КБ', type: 'PDF', file: '/docs/iso_14001.pdf' },
            { title: 'Лицензия на производственную деятельность', size: '340.00 КБ', type: 'PDF', file: '/docs/license.pdf' },
            { title: 'Сертификат соответствия ГОСТ Р', size: '720.00 КБ', type: 'PDF', file: '/docs/gost.pdf' },
            { title: 'Аккредитация испытательной лаборатории', size: '1.05 МБ', type: 'PDF', file: '/docs/lab_accreditation.pdf' },
            { title: 'Свидетельство о регистрации', size: '280.00 КБ', type: 'PDF', file: '/docs/registration.pdf' },
        ],
    },
];

const INITIAL_SHOW = 6;

// ── Doc card ───────────────────────────────────────────────
function DocCard({ doc, index }: { doc: typeof TABS[0]['docs'][0]; index: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-30px' });

    function handleDownload() {
        // Real proyektda fayl yo'li bo'ladi — hozir link simulatsiya
        const a = document.createElement('a');
        a.href = doc.file;
        a.download = doc.title + '.' + doc.type.toLowerCase();
        a.click();
    }

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: (index % 3) * 0.07, ease: EASE }}
            className="relative overflow-hidden rounded-2xl flex flex-col justify-between min-h-[350px] p-5 cursor-default group"
            style={{
                background: 'linear-gradient(135deg, #009C89 0%, #006e62 60%, #004d44 100%)',
            }}
        >
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <Image
                    src={watermarker}
                    alt=""
                    className="w-full h-full object-cover opacity-100"
                />
            </div>

            {/* Title */}
            <p className="other_font font-semibold text-[15px] leading-snug text-white relative z-10 max-w-[85%]">
                {doc.title}
            </p>

            {/* Bottom: size + download */}
            <div className="relative z-10 flex items-center justify-between mt-6">
                <div className="bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
                    <span className="other_font text-[13px] text-white/90 font-medium">
                        {doc.size}, {doc.type}
                    </span>
                </div>

                <button
                    onClick={handleDownload}
                    className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
                    title="Скачать"
                >
                    <Download size={16} className="text-white" />
                </button>
            </div>
        </motion.div>
    );
}

// ── Main ───────────────────────────────────────────────────
const AboutS7 = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [expandedTabs, setExpandedTabs] = useState<Record<number, boolean>>({});

    const titleRef = useRef(null);
    const titleInView = useInView(titleRef, { once: true, margin: '-40px' });

    const currentDocs = TABS[activeTab].docs;
    const isExpanded = expandedTabs[activeTab] ?? false;
    const visibleDocs = isExpanded ? currentDocs : currentDocs.slice(0, INITIAL_SHOW);
    const hasMore = currentDocs.length > INITIAL_SHOW;

    function toggleExpand() {
        setExpandedTabs(prev => ({ ...prev, [activeTab]: !prev[activeTab] }));
    }

    function switchTab(i: number) {
        setActiveTab(i);
    }

    return (
        <div className="relative py-16 bg-[#E9F0EF] rounded-2xl overflow-hidden">
            <div className="container mx-auto px-6 lg:px-10">

                {/* Заголовок */}
                <motion.h2
                    ref={titleRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={titleInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="other_font font-bold text-4xl md:text-5xl uppercase tracking-tight text-[#1a1a1a] mb-10"
                >
                    Документы
                </motion.h2>

                {/* Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={titleInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.14 }}
                    className="flex flex-col sm:flex-row flex-wrap gap-1 mb-8 p-1 rounded-2xl sm:rounded-full w-full sm:w-fit bg-white"
                >
                    {TABS.map((tab, i) => (
                        <button
                            key={i}
                            onClick={() => switchTab(i)}
                            className="relative w-full sm:w-auto px-5 sm:px-6 py-3 rounded-xl sm:rounded-full text-[13px] sm:text-[14px] font-medium cursor-pointer other_font text-left"
                        >
                            {activeTab === i && (
                                <motion.div
                                    layoutId="s7-activeTab"
                                    className="absolute inset-0 bg-[#009C89] rounded-xl sm:rounded-full"
                                    transition={{ duration: 0.4, ease: EASE }}
                                />
                            )}
                            <span className={`relative z-10 transition-colors duration-300 ${activeTab === i ? 'text-white' : 'text-black'}`}>
                                {tab.label}
                            </span>
                        </button>
                    ))}
                </motion.div>

                {/* Cards grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3, ease: EASE }}
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <AnimatePresence>
                                {visibleDocs.map((doc, i) => (
                                    <DocCard key={doc.title} doc={doc} index={i} />
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Показать все / Скрыть */}
                        {hasMore && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="flex justify-center mt-8"
                            >
                                <button
                                    onClick={toggleExpand}
                                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 10px 10px 22px', borderRadius: 100, border: '1.5px solid rgba(0,0,0,0.12)', cursor: 'pointer', fontSize: 14, fontWeight: 500 }}
                                    className="bg-transparent mt-5 group hover:bg-[#009C89] text-black hover:text-white transition-colors duration-300"
                                >
                                    {isExpanded ? 'Скрыть' : 'Показать все'}
                                    <span style={{ width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="group-hover:bg-white bg-[#009C89] transition-colors duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right group-hover:stroke-[#009C89] stroke-white"><path d="m9 18 6-6-6-6" /></svg>
                                        </span>
                                </button>

                            </motion.div>
                        )}
                    </motion.div>
                </AnimatePresence>

            </div>
        </div>
    );
};

export default AboutS7;