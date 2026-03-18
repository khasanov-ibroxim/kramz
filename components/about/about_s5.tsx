"use client"
import React, {useRef, useState} from 'react';
import {motion, useInView} from 'framer-motion';
import Image from 'next/image';
import watermarker from "@/assets/loadingElement.svg";

const CARDS = [
    {
        title: 'Плавильное производство',
        description: 'Производство алюминиевой катанки Ø 9,5 мм и всего спектра алюминиевых сплавов, в том числе высоколегированных серий 2000, 5000, 7000',
    },
    {
        title: 'Прессовое производство',
        description: 'Производство экструзионной продукции из трудно- и легко-деформированных сплавов: трубы, прутки, профили',
    },
    {
        title: 'Прокатное производство',
        description: 'Прокатный участок ориентирован на производство рулонной ленты и пластины',
    },
    {
        title: 'Кузнечно-штамповочное производство',
        description: 'Изготовление поковок и штамповок для различных отраслей промышленности и штамповок автомобильных колес от 14 до 20 дюймов',
    },
    {
        title: 'Инструментальное производство',
        description: 'КраМЗ располагает собственной базой для проектирования прессового инструмента для собственного производства',
    },
    {
        title: 'Центр алюминиевых конструкций',
        description: 'Широкопрофильное производство, позволяющее изготавливать нестандартные конструкции из алюминия любой сложности и размеров',
    },
];

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];


function Card({
                  card,
                  index,
                  isActive,
                  onMouseEnter,
                  onMouseLeave,
              }: {
    card: typeof CARDS[0];
    index: number;
    isActive: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, {once: true, margin: '-40px'});

    return (
        <motion.div
            ref={ref}
            initial={{opacity: 0, y: 24}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.5, delay: (index % 3) * 0.08 + Math.floor(index / 3) * 0.1, ease: EASE}}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={[
                'relative overflow-hidden rounded-2xl p-7 flex flex-col gap-5 cursor-default',
                'transition-colors duration-300',
                isActive ? 'bg-[#009C89]' : 'bg-white',
            ].join(' ')}
        >
            <h3
                className={[
                    'other_font font-bold text-[22px] leading-snug relative z-10 transition-colors duration-300',
                    isActive ? 'text-white' : 'text-[#1a1a1a]',
                ].join(' ')}
            >
                {card.title}
            </h3>

            <p
                className={[
                    'other_font text-[16px]  relative z-10 transition-colors duration-300',
                    isActive ? 'text-white/80' : 'text-black/55',
                ].join(' ')}
            >
                {card.description}
            </p>
        </motion.div>
    );
}

const AboutS5 = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="relative py-16 rounded-2xl bg-[#E9F0EF] overflow-hidden">
            <div className="container">
                <div className="py-10">
                    <h1 className={"mt-10 other_font font-semibold text-4xl sm:text-5xl uppercase text-[#2B362D] mb-5"}>Направления производства</h1>
                    <p className={"w-full md:w-1/2"}>Красноярский металлургический завод — крупнейшее предприятие по глубокой переработке алюминия и
                        алюминиевых сплавов за Уралом</p>
                </div>
                <div className="relative z-10 mx-auto ">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {CARDS.map((card, i) => (
                            <Card
                                key={card.title}
                                card={card}
                                index={i}
                                isActive={activeIndex === i}
                                onMouseEnter={() => setActiveIndex(i)}
                                onMouseLeave={() => setActiveIndex(0)}
                            />
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AboutS5;