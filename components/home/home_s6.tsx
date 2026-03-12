"use client"
import React, { useRef } from 'react';
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import watermaker_s6 from "@/assets/home/home_s6/watermaker_s6.png";

const HomeS6 = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <section ref={ref} className="relative overflow-hidden h-screen">
            <div className="relative w-full h-screen bg-[#009C89] flex flex-col md:flex-row items-center">

                {/* Gradient overlay */}
                <div
                    className="
                        absolute inset-0 z-10
                        bg-gradient-to-l
                        from-[#00474A]
                        via-[#00474A]
                        to-transparent
                    "
                />


                <div className="
                    relative z-20
                    w-full md:w-[70%]
                    p-6 md:p-10
                    text-white
                    order-2 md:order-1
                    left-0 lg:left-40
                ">
                    <motion.h2
                        initial={{ opacity: 0, y: 28 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
                        className="title_font_bold text-white font-extrabold uppercase mb-6 text-[clamp(36px,4.5vw,60px)] leading-[1.05] tracking-[-0.01em]"
                    >
                        ЛЮДИ — НАША<br />ГЛАВНАЯ ЦЕННОСТЬ
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
                        className="other_font text-white/80 leading-[1.7] mb-10 text-[clamp(13px,1.1vw,15px)] max-w-[430px]"
                    >
                        Для сотрудников ООО «КраМЗ» мы создаём безопасные условия
                        труда, предлагаем один из лучших социальных пакетов,
                        возможность постоянного обучения и карьерного роста, развитие
                        не только в профессиональной деятельности, но и активное
                        участие в жизни завода и города
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 }}
                    >
                        <button className="other_font inline-flex items-center gap-4 pl-6 pr-2 py-2 rounded-full border border-white/35 bg-transparent text-white text-[14px] font-medium cursor-pointer transition-all duration-300 hover:bg-[#000]/50 hover:border-transparent">
                            Работа у нас
                            <span className="w-8 h-8 bg-[#009C89] rounded-full   flex items-center justify-center flex-shrink-0">
                                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                                    <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </span>
                        </button>
                    </motion.div>
                </div>

                {/* Image — ong tomon, h-full */}
                <div className="
                    relative z-20
                    w-full md:w-[50%]
                    flex-shrink-0
                    h-[55vh] md:h-full
                    order-2 md:order-2
                    transform scale-125

                ">
                    <Image
                        src={watermaker_s6}
                        alt="factory"
                        fill
                        className="object-contain object-bottom"
                    />
                </div>

            </div>
        </section>
    );
};

export default HomeS6;