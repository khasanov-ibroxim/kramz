"use client"
import React, {useState} from 'react';
import {motion, AnimatePresence, Variants} from 'framer-motion';
import {ChevronUp, ChevronLeft, ChevronRight} from 'lucide-react';
import Image, {StaticImageData} from 'next/image';
import i1 from "@/assets/about/about_s3/DSC04379.jpg"

import type {AboutDictionary} from '@/lib/dictionary';



interface AboutS3Props {
    dict: AboutDictionary['s3'];
}

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const contentVariants: Variants = {
    enter: (dir: number) => ({opacity: 0, x: dir > 0 ? 40 : -40}),
    center: {opacity: 1, x: 0, transition: {duration: 0.45, ease: EASE}},
    exit: (dir: number) => ({opacity: 0, x: dir > 0 ? -40 : 40, transition: {duration: 0.3, ease: EASE}}),
};

const AboutS3 = ({dict}: AboutS3Props) => {


    return (
        <div className="relative py-16 bg-[#E9F0EF] rounded-2xl overflow-hidden">
            <div className="container mx-auto px-6 lg:px-10">

                <motion.h2
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6, ease: EASE}}
                    className="other_font font-bold text-4xl md:text-5xl uppercase tracking-tight text-[#1a1a1a] mb-10"
                >{dict.title}</motion.h2>


                {/* Content */}
                <div className="relative overflow-hidden bg-white p-10 rounded-2xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            variants={contentVariants} initial="enter" animate="center" exit="exit"
                            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
                        >
                            <div className="flex flex-col justify-between h-full gap-10">
                                <div>
                                    <h3 className="other_font font-bold text-4xl md:text-5xl text-[#1a1a1a] mb-6 tracking-tight">
                                        {dict.period}
                                    </h3>
                                    {dict.description.map((item: string, index: number) => (
                                        <p key={index} className="other_font text-[15px] leading-[1.75] text-black/60">
                                            {item}
                                        </p>
                                    ))}

                                </div>

                            </div>

                            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
                                <Image src={i1} alt={dict.title} className="w-full h-full object-cover"/>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default AboutS3;