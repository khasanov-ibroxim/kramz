"use client"
import React, { useRef } from 'react';
import { motion, useInView } from "framer-motion";
import type { HomeDictionary, CommonDictionary } from '@/lib/dictionary';
import Link from "next/link";

interface HomeS7Props {
    dict: HomeDictionary['s7'];
    commonDict: CommonDictionary;
    lang: string;
}

const HomeS7 = ({ dict , lang}: HomeS7Props) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <section ref={ref} className="w-full min-h-[50vh] bg-[#0e3f2a] py-16">
            <div className="container">
                <div className="mt-5">
                    <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-12">

                        {/* Left */}
                        <div className="flex flex-col gap-10 md:w-[55%]">
                            <motion.h2
                                initial={{ opacity: 0, y: 28 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
                                className="other_font text-[#fff] font-semibold uppercase text-3xl md:text-5xl leading-[1.05] tracking-[-0.01em]"
                            >
                                {dict.title.split('\n').map((line, i) => (
                                    <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
                                ))}
                            </motion.h2>

                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.25 }}
                                className="flex flex-wrap gap-4"
                            >
                                <Link href={`/${lang}/contact`} className="other_font group inline-flex items-center gap-4 pl-6 pr-2 py-2 rounded-full border border-[#50D873]/30 bg-transparent text-[#fff] text-[14px] font-medium cursor-pointer transition-all duration-300 hover:bg-[#009383] hover:text-white">
                                    {dict.buttons.feedback}
                                    <span className="w-8 h-8 rounded-full group-hover:bg-white bg-[#50D873] flex items-center justify-center flex-shrink-0">
                                        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                                            <path d="M3 8H13M13 8L8 3M13 8L8 13" className="stroke-white group-hover:stroke-[#50D873]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </span>
                                </Link>

                                <a href={"https://maps.app.goo.gl/v2xx9pVsNwsc8D5U6"} className="other_font group inline-flex items-center gap-4 pl-6 pr-2 py-2 rounded-full border border-[#50D873]/30 bg-transparent text-[#fff] text-[14px] font-medium cursor-pointer transition-all duration-300 hover:bg-[#009383] hover:text-white">
                                    {dict.buttons.directions}
                                    <span className="w-8 h-8 rounded-full group-hover:bg-white bg-[#50D873] flex items-center justify-center flex-shrink-0">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" className="stroke-white group-hover:stroke-[#50D873]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <circle cx="12" cy="10" r="3" className="stroke-white group-hover:stroke-[#50D873]" strokeWidth="2"/>
                                        </svg>
                                    </span>
                                </a>
                            </motion.div>
                        </div>

                        {/* Right — phones */}
                        <div className="flex flex-col gap-6 md:w-[35%] justify-center items-center">
                            {dict.phones.map((phone, i) => (
                                <motion.div key={i}
                                            initial={{ opacity: 0, y: 16 }}
                                            animate={inView ? { opacity: 1, y: 0 } : {}}
                                            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 + i * 0.1 }}
                                >
                                    <a href={`tel:${phone.number.replace(/\s/g, '')}`}
                                       className="other_font block text-[#fff] font-thin text-3xl leading-[1.1] hover:opacity-70 transition-opacity duration-200">
                                        {phone.number}
                                    </a>
                                    <span className="other_font text-[#fff]/60 text-[16px] mt-1 block">
                                        {phone.label}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeS7;