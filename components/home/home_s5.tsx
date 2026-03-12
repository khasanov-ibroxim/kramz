"use client"
import React, {useRef, useState, useEffect} from 'react';
import {AnimatePresence, motion, useInView} from "framer-motion";
import {StaticImageData} from "next/image";
import Image from "next/image";

import i0_1 from "@/assets/home/home_s5/0_1.jpg"
import i0_2 from "@/assets/home/home_s5/0_2.jpg"
import i0_3 from "@/assets/home/home_s5/0_3.jpg"
import i0_4 from "@/assets/home/home_s5/0_4.png"
import i0_5 from "@/assets/home/home_s5/0_5.png"

import i1_1 from "@/assets/home/home_s5/1_1.jpg"
import i1_2 from "@/assets/home/home_s5/1_2.jpg"
import i1_3 from "@/assets/home/home_s5/1_3.jpg"
import i1_4 from "@/assets/home/home_s5/1_4.jpg"
import i1_5 from "@/assets/home/home_s5/1_5.jpg"

import i2_1 from "@/assets/home/home_s5/2_1.png"
import i2_2 from "@/assets/home/home_s5/2_2.jpg"
import i2_3 from "@/assets/home/home_s5/2_3.jpg"
import i2_4 from "@/assets/home/home_s5/2_4.png"
import i2_5 from "@/assets/home/home_s5/2_5.jpg"

interface ProjectItem {
    title: string;
    listTitle: string;
    list: string[];
    image: StaticImageData | string;
    location: string;
    description?: string;
    year?: string;
    area?: string;
    materials?: string[];
}

const TEXTS = ['Объекты, при строительстве которых использовались системы КраМЗа'];
const TABS = ['Строительство', 'Транспорт', 'Инфраструктура'] as const;

const TAB_DATA: Record<number, ProjectItem[]> = {
    0: [
        { title: `ФГАОУ ВПО «Сибирский Федеральный Университет»`, location: "г. Красноярск", image: i0_1, listTitle: "Применённые системы", list: ["Алюминиевые фасадные системы", "Светопрозрачные конструкции", "Кровельные профили"], description: "Крупнейший университетский комплекс Сибири. При строительстве применялись фасадные алюминиевые системы КраМЗа, обеспечивающие высокую теплоизоляцию и долговечность в условиях сибирского климата.", year: "2006", area: "140 000 м²", materials: ["Алюминиевый профиль АД31", "Фасадные системы серии КМЗ-500"] },
        { title: `Дворец спорта им. Ивана Ярыгина`, location: "г. Красноярск", image: i0_2, listTitle: "Применённые системы", list: ["Несущие алюминиевые конструкции", "Кровельные системы"], description: "Многофункциональный спортивный комплекс, рассчитанный на проведение соревнований международного уровня.", year: "2007", area: "25 000 м²", materials: ["Несущий профиль серии НП-200", "Кровельные панели"] },
        { title: `Мкр. «Взлётный»`, location: "г. Красноярск", image: i0_3, listTitle: "Применённые системы", list: ["Оконные системы", "Балконные ограждения", "Фасадные элементы"], description: "Жилой квартал премиум-класса с применением современных алюминиевых оконных и фасадных систем производства КраМЗа.", year: "2015", area: "85 000 м²", materials: ["Оконный профиль серии ОП-72", "Алюминиевые ограждения"] },
        { title: `Торгово-развлекательный центр «Планета»`, location: "г. Красноярск", image: i0_4, listTitle: "Применённые системы", list: ["Световые фонари", "Навесные вентилируемые фасады", "Алюминиевые перегородки"], description: "Один из крупнейших торговых центров Красноярска.", year: "2013", area: "120 000 м²", materials: ["Фасадные системы серии КМЗ-600", "Световые фонари ФС-300"] },
        { title: `Бизнес-центр «Первая башня»`, location: "г. Красноярск", image: i0_5, listTitle: "Применённые системы", list: ["Структурное остекление", "Алюминиевые витражи", "Входные группы"], description: "Современный высотный бизнес-центр класса А.", year: "2019", area: "45 000 м²", materials: ["Структурное остекление СО-160", "Алюминиевый профиль АД31Т1"] },
    ],
    1: [
        { title: `Железнодорожный вокзал Красноярск-Главный`, location: "г. Красноярск", image: i1_1, listTitle: "Применённые системы", list: ["Перронные навесы", "Фасадные системы", "Кровельные конструкции"], description: "Реконструкция главного железнодорожного вокзала города.", year: "2011", area: "18 500 м²", materials: ["Навесные конструкции серии НК-400", "Кровельный профиль КП-150"] },
        { title: `Метромост через реку Енисей`, location: "г. Красноярск", image: i1_2, listTitle: "Применённые системы", list: ["Несущие алюминиевые элементы", "Защитные ограждения", "Декоративные панели"], description: "Уникальное инженерное сооружение — совмещённый мост для метро и автомобильного транспорта.", year: "2021", area: "—", materials: ["Алюминиевые панели АП-300", "Ограждения серии ОГ-200"] },
        { title: `Аэропорт «Красноярск» (Емельяново)`, location: "г. Красноярск", image: i1_3, listTitle: "Применённые системы", list: ["Терминальные фасады", "Светопрозрачные кровли", "Переходные галереи"], description: "Новый терминал международного аэропорта.", year: "2022", area: "55 000 м²", materials: ["Фасадная система ФС-800", "Светопрозрачная кровля СК-200"] },
        { title: `Автовокзал «Северный»`, location: "г. Красноярск", image: i1_4, listTitle: "Применённые системы", list: ["Навесы над платформами", "Оконные системы", "Фасадные панели"], description: "Современный автовокзал с развитой инфраструктурой.", year: "2018", area: "8 200 м²", materials: ["Навесные конструкции НК-300", "Оконный профиль ОП-60"] },
        { title: `Путепровод на ул. Шахтёров`, location: "г. Красноярск", image: i1_5, listTitle: "Применённые системы", list: ["Перильные ограждения", "Шумозащитные экраны", "Декоративные элементы"], description: "Современный путепровод с алюминиевыми шумозащитными экранами КраМЗа.", year: "2020", area: "—", materials: ["Шумозащитные экраны ШЭ-500", "Перильные ограждения ПО-120"] },
    ],
    2: [
        { title: `Краевая клиническая больница`, location: "г. Красноярск", image: i2_1, listTitle: "Применённые системы", list: ["Медицинские перегородки", "Фасадные системы", "Оконные блоки"], description: "Крупнейший медицинский комплекс края.", year: "2016", area: "95 000 м²", materials: ["Перегородочная система ПС-100", "Медицинский профиль МП-80"] },
        { title: `Стадион «Енисей»`, location: "г. Красноярск", image: i2_2, listTitle: "Применённые системы", list: ["Козырьки трибун", "Фасадные системы", "Осветительные мачты"], description: "Реконструированный стадион с современной инфраструктурой.", year: "2018", area: "35 000 м²", materials: ["Козырьковые системы КС-600", "Фасадный профиль ФП-200"] },
        { title: `Набережная реки Енисей`, location: "г. Красноярск", image: i2_3, listTitle: "Применённые системы", list: ["Ограждения", "Навесы", "Малые архитектурные формы"], description: "Благоустройство центральной набережной города.", year: "2019", area: "—", materials: ["Ограждения серии ОГ-180", "Навесные конструкции НК-250"] },
        { title: `Технопарк «Сибирь»`, location: "г. Красноярск", image: i2_4, listTitle: "Применённые системы", list: ["Структурные фасады", "Алюминиевые перекрытия", "Инженерные системы"], description: "Инновационный технопарк для высокотехнологичных производств.", year: "2021", area: "28 000 м²", materials: ["Структурный фасад СФ-900", "Алюминиевые перекрытия АП-400"] },
        { title: `МФЦ «Мои документы»`, location: "г. Красноярск", image: i2_5, listTitle: "Применённые системы", list: ["Входные группы", "Световые витражи", "Офисные перегородки"], description: "Сеть многофункциональных центров предоставления государственных услуг.", year: "2017", area: "4 500 м²", materials: ["Витражная система ВС-160", "Перегородки серии ПС-80"] },
    ]
};

// ── Shimmer skeleton ───────────────────────────────────────
function ImageSkeleton() {
    return (
        <>
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(90deg, #e8eeec 25%, #f0f5f3 50%, #e8eeec 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.4s infinite',
            }}/>
            <style>{`@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`}</style>
        </>
    );
}

// ── Optimized Image — blur placeholder + fade on load ──────
function OptimizedImage({src, alt, fill, priority = false, sizes, style}: {
    src: StaticImageData | string;
    alt: string;
    fill?: boolean;
    priority?: boolean;
    sizes?: string;
    style?: React.CSSProperties;
}) {
    const [loaded, setLoaded] = useState(false);
    return (
        <>
            {!loaded && <ImageSkeleton/>}
            <Image
                src={src}
                alt={alt}
                fill={fill}
                priority={priority}
                sizes={sizes}
                quality={75}
                placeholder={typeof src === 'object' ? 'blur' : 'empty'}
                style={{
                    objectFit: 'cover',
                    transition: 'opacity 0.35s ease, transform 0.5s ease',
                    opacity: loaded ? 1 : 0,
                    ...style,
                }}
                onLoad={() => setLoaded(true)}
            />
        </>
    );
}

// ── Project Popup ──────────────────────────────────────────
function ProjectPopup({item, onClose}: { item: ProjectItem; onClose: () => void }) {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
        };
    }, [onClose]);

    return (
        <motion.div
            initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}
            transition={{duration: 0.25}}
            onClick={onClose}
            style={{position: 'fixed', inset: 0, background: 'rgba(10,20,18,0.65)', backdropFilter: 'blur(6px)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px'}}
        >
            <motion.div
                initial={{opacity: 0, y: 32, scale: 0.97}}
                animate={{opacity: 1, y: 0, scale: 1}}
                exit={{opacity: 0, y: 20, scale: 0.97}}
                transition={{duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94]}}
                onClick={e => e.stopPropagation()}
                style={{background: '#fff', borderRadius: 20, width: '100%', maxWidth: 900, maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 32px 80px rgba(0,0,0,0.22)'}}
            >
                <div style={{position: 'relative', width: '100%', height: 340, flexShrink: 0, overflow: 'hidden'}}>
                    {/* priority=true — popup ochilganda darhol yuklanadi */}
                    <OptimizedImage src={item.image} alt={item.title} fill priority sizes="(max-width: 768px) 100vw, 900px"/>
                    <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)', zIndex: 1}}/>
                    <div style={{position: 'absolute', top: 20, left: 24, zIndex: 2, background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 100, padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 6}}>
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 1C5.24 1 3 3.24 3 6c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5zm0 6.75A1.75 1.75 0 1 1 8 4.25a1.75 1.75 0 0 1 0 3.5z" fill="white"/></svg>
                        <span style={{fontSize: 12, fontWeight: 500, color: '#fff', letterSpacing: '0.03em', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'}}>{item.location}</span>
                    </div>
                    <button onClick={onClose} style={{position: 'absolute', top: 20, right: 20, zIndex: 2, width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s'}} onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.3)')} onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.18)')}>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M1 1L15 15M15 1L1 15" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
                    </button>
                    <div style={{position: 'absolute', bottom: 24, left: 24, right: 24, zIndex: 2}}>
                        <h2 style={{margin: 0, fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: 600, color: '#fff', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', letterSpacing: '-0.02em', lineHeight: 1.25}}>{item.title}</h2>
                    </div>
                </div>

                <div style={{overflowY: 'auto', padding: '28px 28px 32px', flex: 1}}>
                    {(item.year || item.area) && (
                        <div style={{display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24}}>
                            {item.year && <div style={{background: '#F4F8F7', borderRadius: 12, padding: '10px 18px', display: 'flex', flexDirection: 'column', gap: 2}}><span style={{fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: '#009C89', textTransform: 'uppercase', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'}}>Год</span><span style={{fontSize: 18, fontWeight: 700, color: '#1a1a1a', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', letterSpacing: '-0.02em'}}>{item.year}</span></div>}
                            {item.area && item.area.trim() !== '—' && <div style={{background: '#F4F8F7', borderRadius: 12, padding: '10px 18px', display: 'flex', flexDirection: 'column', gap: 2}}><span style={{fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: '#009C89', textTransform: 'uppercase', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'}}>Площадь</span><span style={{fontSize: 18, fontWeight: 700, color: '#1a1a1a', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', letterSpacing: '-0.02em'}}>{item.area}</span></div>}
                        </div>
                    )}
                    {item.description && <p style={{margin: '0 0 24px', fontSize: 15, lineHeight: 1.7, color: '#444', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'}}>{item.description}</p>}
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
                        {item.list.length > 0 && (
                            <div style={{background: '#F4F8F7', borderRadius: 14, padding: '18px 20px'}}>
                                <p style={{margin: '0 0 12px', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#009C89', textTransform: 'uppercase', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'}}>{item.listTitle || 'Системы'}</p>
                                <ul style={{margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8}}>
                                    {item.list.map((l, i) => <li key={i} style={{display: 'flex', alignItems: 'flex-start', gap: 8}}><span style={{width: 6, height: 6, borderRadius: '50%', background: '#009C89', flexShrink: 0, marginTop: 6}}/><span style={{fontSize: 13.5, color: '#333', lineHeight: 1.5, fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'}}>{l}</span></li>)}
                                </ul>
                            </div>
                        )}
                        {item.materials && item.materials.length > 0 && (
                            <div style={{background: '#F4F8F7', borderRadius: 14, padding: '18px 20px'}}>
                                <p style={{margin: '0 0 12px', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#009C89', textTransform: 'uppercase', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'}}>Материалы</p>
                                <ul style={{margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8}}>
                                    {item.materials.map((m, i) => <li key={i} style={{display: 'flex', alignItems: 'flex-start', gap: 8}}><span style={{width: 6, height: 6, borderRadius: '50%', background: '#1a1a1a', flexShrink: 0, marginTop: 6}}/><span style={{fontSize: 13.5, color: '#333', lineHeight: 1.5, fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'}}>{m}</span></li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ── Product Card ───────────────────────────────────────────
function ProductCard({item, index, onClick, priority = false}: {
    item: ProjectItem; index: number; onClick: () => void; priority?: boolean;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, {once: true, margin: '-30px'});
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            ref={ref}
            initial={{opacity: 0, y: 18}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.45, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94]}}
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{borderRadius: 16, overflow: 'hidden', background: '#fff', cursor: 'pointer', position: 'relative'}}
        >
            <div style={{position: 'relative', width: '100%', paddingTop: '66%', overflow: 'hidden'}}>
                <OptimizedImage
                    src={item.image}
                    alt={item.title}
                    fill
                    priority={priority}
                    sizes="(max-width: 768px) 80vw, (max-width: 1200px) 33vw, 400px"
                    style={{transform: hovered ? 'scale(1.04)' : 'scale(1)'}}
                />
            </div>
            <div style={{padding: '14px 20px 10px'}}>
                <p style={{margin: '0 0 4px', fontSize: 12, color: '#888', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', letterSpacing: '0.01em'}}>{item.location}</p>
                <h3 style={{margin: 0, fontSize: 'clamp(13px, 1.1vw, 16px)', fontWeight: 500, color: '#1a1a1a', lineHeight: 1.35, fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', letterSpacing: '-0.01em'}}>{item.title}</h3>
            </div>
        </motion.div>
    );
}

// ── Text Para ──────────────────────────────────────────────
function TextPara({text, delay}: { text: string; delay: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, {once: true, margin: '-40px'});
    return (
        <motion.p ref={ref} initial={{opacity: 0, y: 16}} animate={inView ? {opacity: 1, y: 0} : {}} transition={{duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94]}} className="other_font text-[15px] leading-[1.65] text-black m-0">
            {text}
        </motion.p>
    );
}

// ── Main ───────────────────────────────────────────────────
const HomeS5 = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedItem, setSelectedItem] = useState<ProjectItem | null>(null);
    const titleRef = useRef(null);
    const titleInView = useInView(titleRef, {once: true, margin: '-40px'});

    const items = TAB_DATA[activeTab] ?? [];
    const firstRow = items.slice(0, 3);
    const secondRow = items.slice(3);

    return (
        <div className="container py-16">
            <motion.h2 ref={titleRef} initial={{opacity: 0, y: 20}} animate={titleInView ? {opacity: 1, y: 0} : {}} transition={{duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94]}} className="title_font font-semibold text-4xl md:text-5xl lg:text-5xl uppercase mb-10 tracking-tight text-[#1a1a1a]">
                Реализованные проекты
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mb-10">
                {TEXTS.map((text, i) => <TextPara key={i} text={text} delay={i * 0.1}/>)}
            </div>

            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 12}}>
                <motion.div initial={{opacity: 0, y: 10}} animate={titleInView ? {opacity: 1, y: 0} : {}} transition={{duration: 0.5, delay: 0.14}} style={{display: 'flex', gap: 4, padding: 4, borderRadius: 100, background: '#fff', width: 'fit-content'}}>
                    {TABS.map((tab, i) => (
                        <button key={tab} onClick={() => setActiveTab(i)} style={{position: 'relative', padding: '10px 20px', borderRadius: 100, fontSize: 14, fontWeight: 500, cursor: 'pointer', border: 'none', background: 'transparent', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', color: activeTab === i ? '#fff' : '#1a1a1a', transition: 'color 0.3s', zIndex: 1}}>
                            {activeTab === i && <motion.div layoutId="activeTab" style={{position: 'absolute', inset: 0, background: '#009C89', borderRadius: 100, zIndex: -1}} transition={{duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94]}}/>}
                            {tab}
                        </button>
                    ))}
                </motion.div>

                <motion.button initial={{opacity: 0, x: 10}} animate={titleInView ? {opacity: 1, x: 0} : {}} transition={{duration: 0.5, delay: 0.2}} style={{ alignItems: 'center', gap: 10, padding: '10px 10px 10px 22px', borderRadius: 100, border: '1.5px solid rgba(0,0,0,0.12)', cursor: 'pointer', fontSize: 14, fontWeight: 500}} className="hidden md:flex bg-transparent group hover:bg-[#009C89] text-black hover:text-white transition-colors duration-300">
                    Все проекты
                    <span style={{width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="group-hover:bg-white bg-[#009C89] transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right group-hover:stroke-[#009C89] stroke-white"><path d="m9 18 6-6-6-6"/></svg>
                    </span>
                </motion.button>
            </div>

            <AnimatePresence mode="wait">
                <motion.div key={activeTab} initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -10}} transition={{duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94]}}>
                    <div className="hidden md:flex flex-col gap-4">
                        {firstRow.length > 0 && (
                            <div className="grid grid-cols-3 gap-4">
                                {firstRow.map((item, i) => (
                                    <ProductCard key={`${activeTab}-${i}`} item={item} index={i} priority={activeTab === 0} onClick={() => setSelectedItem(item)}/>
                                ))}
                            </div>
                        )}
                        {secondRow.length > 0 && (
                            <div className={`grid gap-4 ${secondRow.length === 3 ? 'grid-cols-3' : secondRow.length === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                                {secondRow.map((item, i) => (
                                    <ProductCard key={`${activeTab}-${i + firstRow.length}`} item={item} index={i + firstRow.length} priority={false} onClick={() => setSelectedItem(item)}/>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="md:hidden">
                        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
                            {items.map((item, i) => (
                                <div key={`${activeTab}-mobile-${i}`} className="snap-start flex-shrink-0 w-[80vw] max-w-[320px]">
                                    <ProductCard item={item} index={i} priority={i === 0 && activeTab === 0} onClick={() => setSelectedItem(item)}/>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center gap-1.5 mt-2">
                            {items.map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#009C89]/30"/>)}
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            <AnimatePresence>
                {selectedItem && <ProjectPopup item={selectedItem} onClose={() => setSelectedItem(null)}/>}
            </AnimatePresence>
            <motion.button initial={{opacity: 0, x: 10}} animate={titleInView ? {opacity: 1, x: 0} : {}} transition={{duration: 0.5, delay: 0.2}} style={{display: 'flex', alignItems: 'center', gap: 10, padding: '10px 10px 10px 22px', borderRadius: 100, border: '1.5px solid rgba(0,0,0,0.12)', cursor: 'pointer', fontSize: 14, fontWeight: 500}} className="bg-transparent mt-5 group hover:bg-[#009C89] text-black hover:text-white transition-colors duration-300">
                Все проекты
                <span style={{width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="group-hover:bg-white  bg-[#009C89] transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right group-hover:stroke-[#009C89] stroke-white"><path d="m9 18 6-6-6-6"/></svg>
                    </span>
            </motion.button>
        </div>
    );
};

export default HomeS5;