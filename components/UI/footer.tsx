"use client"
import React from 'react';

const Footer = () => {
    const navLinks = [
        {
            title: 'О компании',
            href: '#',
            children: ['Устойчивое развитие', 'Производство'],
        },
        {
            title: 'Клиентам',
            href: '#',
            children: ['Стандартная продукция', 'Услуги', 'Портфолио'],
        },
        {
            title: 'Карьера',
            href: '#',
            children: ['Вакансии', 'Профессионалам', 'Студентам', 'Забота о персонале'],
        },
        {
            title: 'Контакты',
            href: '#',
            children: ['+7 391 226 70 99', 'office@kramz.biz'],
        },
    ];

    return (
        <footer className="w-full bg-[#F0F0EE] pt-14 pb-8 px-6 md:px-16">
            <div className="max-w-[1400px] mx-auto">

                {/* Top grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">

                    {/* Nav columns */}
                    {navLinks.map((col, i) => (
                        <div key={i} className="flex flex-col gap-3">
<a
                            href={col.href}
                            className="other_font text-[#1C1C1C] font-semibold text-[15px] flex items-center gap-1 hover:text-[#009C89] transition-colors duration-200"
                            >
                            {col.title}

                        </a>
                        <ul className="flex flex-col gap-2 mt-1">
                    {col.children.map((item, j) => (
                        <li key={j}>
<a
                    href="#"
                    className={`other_font text-[14px] transition-colors duration-200 hover:text-[#009C89] ${
                    item.includes('@') || item.includes('+')
                        ? 'text-[#555] font-medium text-[16px]'
                        : 'text-[#555]'
                }`}
                    >
                    {item}
                </a>
            </li>
            ))}
        </ul>
</div>
))}

{/* Address column */}
    <div className="flex flex-col gap-3">
        <p className="other_font text-[#1C1C1C] font-semibold text-[15px] leading-[1.4]">
            660111, Красноярск, ул.<br />Пограничников, 42
        </p>
<a
        href="#"
        className="other_font text-[#009C89] text-[14px] flex items-center gap-1 hover:opacity-70 transition-opacity duration-200 mt-1"
        >
        Посмотреть на карте
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </a>
</div>
</div>

    {/* Bottom row */}
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-8">

        {/* Left button — Поставщикам */}
        <button className="other_font inline-flex items-center gap-4 pl-6 pr-2 py-2 rounded-full border border-[#1C1C1C]/25 bg-transparent text-[#1C1C1C] text-[14px] font-medium cursor-pointer transition-all duration-300 hover:bg-[#1C1C1C]/5">
            Поставщикам
            <span className="w-8 h-8 rounded-full bg-[#009C89] flex items-center justify-center flex-shrink-0 text-white text-[10px] font-bold tracking-wide">
                            PDF
                        </span>
        </button>

        {/* Right button — Заказать продукцию */}
        <button className="other_font inline-flex items-center gap-4 pl-6 pr-2 py-2 rounded-full border border-[#1C1C1C]/25 bg-transparent text-[#1C1C1C] text-[14px] font-medium cursor-pointer transition-all duration-300 hover:bg-[#1C1C1C]/5">
            Заказать продукцию
            <span className="w-8 h-8 rounded-full bg-[#009C89] flex items-center justify-center flex-shrink-0">
                            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                                <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </span>
        </button>

    </div>
</div>
</footer>
);
};

export default Footer;