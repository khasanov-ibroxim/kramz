"use client"
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image, {StaticImageData} from 'next/image';
import i1 from "@/assets/about/about_s4/Ismailov_Ismail.jpg"
import i2 from "@/assets/about/about_s4/Ismailov_Javlon.jpg"
import i3 from "@/assets/about/about_s4/Ismailov_Temur.jpg"
import i4 from "@/assets/about/about_s4/Samandarov_Temur.jpg"
import i5 from "@/assets/about/about_s4/Sherzod_Kurbanov.jpg"
import type { AboutDictionary } from '@/lib/dictionary';

const TEAM_IMAGES = [i1, i2, i3, i4, i5];

interface AboutS4Props {
    dict: AboutDictionary['s4'];
}

function LargeCard({ member, image, delay }: {
    member: { name: string; role: string }; image: StaticImageData|string; delay: number;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });
    return (
        <motion.div ref={ref}
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="bg-white/60 rounded-2xl overflow-hidden flex flex-col row-span-2 h-full"
        >
            <div className="w-full flex-1 overflow-hidden">
                <Image src={image} alt={member.name} className="w-full h-full md:aspect-[5/2] rounded-xl object-cover"/>
            </div>
            <div className="px-5 py-5">
                <p className="other_font font-bold text-[20px] text-[#2B362D] leading-snug mb-1">{member.name}</p>
                <p className="other_font text-[16px] text-black/50">{member.role}</p>
            </div>
        </motion.div>
    );
}

function SmallCard({ member, image, delay }: {
    member: { name: string; role: string }; image: StaticImageData | string; delay: number;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });
    return (
        <motion.div ref={ref}
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="bg-white/60 rounded-2xl overflow-hidden flex flex-row items-start gap-4 p-5"
        >
            <Image src={image} alt={member.name} className="w-[110px] h-[120px] rounded-xl object-contain"/>
            <div>
                <p className="other_font font-bold text-[20px] text-[#2B362D] leading-snug">{member.name}</p>
                <p className="other_font text-[16px] text-black/50 leading-snug">{member.role}</p>
            </div>
        </motion.div>
    );
}

const AboutS4 = ({ dict }: AboutS4Props) => {
    const [large, ...rest] = dict.team;
    return (
        <div className="relative py-16 bg-[#0D3E29] rounded-2xl overflow-hidden">
            <div className="container mx-auto px-6 lg:px-10">
                <h1 className="mt-10 other_font font-semibold text-5xl uppercase text-[#fff] mb-16">{dict.title}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:row-span-1 h-full">
                        <SmallCard member={large} image={TEAM_IMAGES[0]} delay={0} />
                    </div>
                    {rest.map((member:AboutDictionary['s4']['member'], i:number) => (
                        <SmallCard key={member.name} member={member} image={TEAM_IMAGES[i + 1]} delay={0.1 + i * 0.08} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutS4;