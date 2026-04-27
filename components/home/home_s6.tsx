"use client"
import React, {useRef} from 'react';
import {motion, useInView} from "framer-motion";
import type {HomeDictionary} from '@/lib/dictionary';
import Link from "next/link";

interface HomeS6Props {
    dict: HomeDictionary['s6'];
    lang: string;
}

const HomeS6 = ({dict, lang}: HomeS6Props) => {
    const ref = useRef(null);
    const inView = useInView(ref, {once: true, margin: '-60px'});

    return (
        <section ref={ref} className="relative overflow-hidden h-screen">
            <div className="relative w-full h-screen bg-[#F4F8F7] flex flex-col md:flex-row items-center">
                <div className="absolute inset-0 z-10 bg-gradient-to-l from-[#F4F8F7] via-[#fff] to-transparent"/>

                <div
                    className="relative z-20 w-full md:w-[70%] p-6 md:p-10 text-black order-2 md:order-1 left-0 lg:left-40">
                    <motion.h2
                        initial={{opacity: 0, y: 28}}
                        animate={inView ? {opacity: 1, y: 0} : {}}
                        transition={{duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2}}
                        className="title_font_bold text-black font-extrabold uppercase mb-6 text-[clamp(36px,4.5vw,60px)] leading-[1.05] tracking-[-0.01em]"
                    >
                        {dict.title.split('\n').map((line, i) => (
                            <React.Fragment key={i}>{line}{i === 0 && <br/>}</React.Fragment>
                        ))}
                    </motion.h2>

                    <motion.p
                        initial={{opacity: 0, y: 16}}
                        animate={inView ? {opacity: 1, y: 0} : {}}
                        transition={{duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3}}
                        className="other_font text-black/80 leading-[1.7] mb-10 text-[clamp(13px,1.1vw,15px)] max-w-[700px]"
                    >{dict.text}</motion.p>

                    <motion.div
                        initial={{opacity: 0, y: 12}}
                        animate={inView ? {opacity: 1, y: 0} : {}}
                        transition={{duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4}}
                    >
                        <Link href={`/${lang}/contact`}
                              className="other_font group inline-flex items-center gap-4 pl-6 pr-2 py-2 rounded-full border border-black/10 bg-transparent text-black text-[14px] font-medium cursor-pointer transition-all duration-300 hover:text-white hover:bg-[#50D873] hover:border-transparent">
                            {dict.button}
                            <span
                                className="w-8 h-8 bg-[#50D873] group-hover:bg-white rounded-full flex items-center justify-center flex-shrink-0">
                                <svg
                                    width="13"
                                    height="13"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    className="group-hover:text-black text-white"
                                >
  <path
      d="M3 8H13M13 8L8 3M13 8L8 13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
  />
</svg>
                            </span>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HomeS6;