"use client"
import React, {useRef} from 'react';
import {motion, useInView} from "framer-motion";
import Image from "next/image";
import watermaker_s6 from "@/assets/production/production_s2/watermaker_p_s2.png";

const ProductionS2 = () => {
    const ref = useRef(null);
    const inView = useInView(ref, {once: true, margin: '-60px'});

    return (
        <section ref={ref} className="relative overflow-hidden">
            <div className="relative w-full h-[60vh] bg-[#009C89] flex flex-col md:flex-row items-center">

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
                    absolute top-5 md:top-10 z-20
                    w-full
                    p-6 md:p-10
                    text-white
                    order-2 md:order-1
                    left-0 lg:left-40
                ">
                    <motion.h2
                        initial={{opacity: 0, y: 28}}
                        animate={inView ? {opacity: 1, y: 0} : {}}
                        transition={{duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2}}
                        className="title_font_bold text-white font-extrabold uppercase mb-6 text-2xl md:text-5xl  leading-[1.05] tracking-[-0.01em]"
                    >
                        Производственные <br/> мощности  КраМЗ свыше <br/> 130 тыс. тн. в год

                    </motion.h2>

                    <motion.p
                        initial={{opacity: 0, y: 16}}
                        animate={inView ? {opacity: 1, y: 0} : {}}
                        transition={{duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3}}
                        className="other_font text-white/80 leading-[1.7] mb-10 text-[clamp(13px,1.1vw,15px)] max-w-[430px]"
                    >
                        Ежемесячно КраМЗ отгружает более 10 тыс. тонн готовой продукции в различные регионы страны, а
                        также ближнее и дальнее зарубежье
                    </motion.p>

                </div>

                {/* Image — ong tomon, h-full */}
                <div className="
                    absolute z-10
                    w-screen
                    overflow-hidden
                    md:flex-shrink-0
                     h-full
                    order-2 md:order-2
right-0
                ">
                    <Image
                        src={watermaker_s6}
                        alt="factory"
                        fill
                        className="object-cover object-bottom"
                    />
                </div>

            </div>
        </section>
    );
};

export default ProductionS2;