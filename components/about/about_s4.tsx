"use client"
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

import i1 from "@/assets/about/about_s4/1.png"
import i2 from "@/assets/about/about_s4/2.png"
import i3 from "@/assets/about/about_s4/3.png"
import i4 from "@/assets/about/about_s4/4.png"
import i5 from "@/assets/about/about_s4/5.png"

const TEAM = [
    {
        name: 'Буц Олег Владимирович',
        role: 'Генеральный директор',
        image: i1,
        large: true,
    },
    {
        name: 'Никитина Инга Викторовна',
        role: 'Коммерческий директор',
        image: i2,
        large: false,
    },
    {
        name: 'Лебедев Егор Сергеевич',
        role: 'Директор по стратегическому развитию производства',
        image: i3,
        large: false,
    },
    {
        name: 'Майдуров Вячеслав Юрьевич',
        role: 'Технический директор',
        image: i4,
        large: false,
    },
    {
        name: 'Буркацкая Анна Сергеевна',
        role: 'Директор по персоналу',
        image: i5,
        large: false,
    },
];

// Placeholder avatar
function Avatar({ name, large }: { name: string; large: boolean }) {
    const initials = name
        .split(' ')
        .slice(0, 2)
        .map(w => w[0])
        .join('');

    return (
        <div
            className={[
                'bg-[#c8d8d5] flex items-end justify-center overflow-hidden flex-shrink-0',
                large
                    ? 'w-full h-full md:aspect-[5/2] rounded-xl'
                    : 'w-[110px] h-[120px] rounded-xl',
            ].join(' ')}
        >
            <span className="other_font text-[#7aa09c] font-bold select-none"
                  style={{ fontSize: large ? 80 : 36, lineHeight: 1, paddingBottom: large ? 16 : 8 }}>
                {initials}
            </span>
        </div>
    );
}

// ── Large card (Генеральный директор) ─────────────────────
function LargeCard({ member, delay }: { member: typeof TEAM[0]; delay: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bg-white/60 rounded-2xl overflow-hidden flex flex-col row-span-2 h-full"
        >
            {/* Photo */}
            <div className="w-full flex-1 overflow-hidden">
                <Image src={member.image} alt={member.name} className={"w-full h-full md:aspect-[5/2] rounded-xl object-cover"}/>
            </div>

            {/* Info */}
            <div className="px-5 py-5">
                <p className="other_font font-bold text-[20px] text-[#2B362D] leading-snug mb-1">
                    {member.name}
                </p>
                <p className="other_font text-[16px] text-black/50">
                    {member.role}
                </p>
            </div>
        </motion.div>
    );
}

// ── Small card ─────────────────────────────────────────────
function SmallCard({ member, delay }: { member: typeof TEAM[0]; delay: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bg-white/60 rounded-2xl overflow-hidden flex flex-row items-start gap-4 p-5"
        >
            {/* Photo */}
            <Image src={member.image} alt={member.name} className={"w-[110px] h-[120px] rounded-xl"}/>

            {/* Info */}
            <div>
                <p className="other_font font-bold text-[20px] text-[#2B362D] leading-snug ">
                    {member.name}
                </p>
                <p className="other_font text-[16px] text-black/50 leading-snug">
                    {member.role}
                </p>
            </div>
        </motion.div>
    );
}

// ── Main ───────────────────────────────────────────────────
const AboutS4 = () => {
    const [large, ...rest] = TEAM;

    return (
        <div className="relative py-16 bg-[#A3C1BE] rounded-2xl overflow-hidden">
            <div className="container mx-auto px-6 lg:px-10">

               <h1 className={"mt-10 other_font font-semibold text-5xl uppercase text-[#2B362D] mb-16"}>Руководство КраМЗ</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Large card — spans 2 rows on md+ */}
                    <div className="md:row-span-2 h-full">
                        <LargeCard member={large} delay={0} />
                    </div>

                    {/* 4 small cards */}
                    {rest.map((member, i) => (
                        <SmallCard key={member.name} member={member} delay={0.1 + i * 0.08} />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default AboutS4;