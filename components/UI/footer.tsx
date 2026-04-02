"use client"
import React from 'react';
import type { CommonDictionary } from '@/lib/dictionary';

interface LinkItem {
    title: string;
    link: string;
}

interface FooterProps {
    dict: CommonDictionary;
}

const Footer = ({ dict }: FooterProps) => {
    const { footer } = dict;
    const addressLines = footer.address?.split('\n') ?? [];

    const navLinks = [
        { title: footer.columns.about.title,    children: footer.columns.about.links },
        { title: footer.columns.clients.title,  children: footer.columns.clients.links },
        { title: footer.columns.career.title,   children: footer.columns.career.links },
        { title: footer.columns.contacts.title, children: footer.columns.contacts.links },
    ];

    return (
        <footer className="w-full bg-[#F0F0EE] pt-14 pb-8 px-6 md:px-16">
            <div className="max-w-[1400px] mx-auto">

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">

                    {navLinks.map((col, i) => (
                        <div key={i} className="flex flex-col gap-3">
                            <span className="other_font text-[#1C1C1C] font-semibold text-[15px]">
                                {col.title}
                            </span>

                            <ul className="flex flex-col gap-2 mt-1">
                                {col.children.map((item: LinkItem, j: number) => (
                                    <li key={j}>
                                        <a
                                            href={item.link}
                                            className="other_font text-[14px] text-[#555] hover:text-[#50D873] transition"
                                        >
                                            {item.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* ✅ ADDRESS QAYTDI */}
                    <div className="flex flex-col gap-3">
                        <p className="other_font text-[#1C1C1C] font-semibold text-[15px] leading-[1.4]">
                            {addressLines.map((line:string, i:number) => (
                                <React.Fragment key={i}>
                                    {line}
                                    {i === 0 && <br />}
                                </React.Fragment>
                            ))}
                        </p>

                        <a
                            href="#"
                            className="other_font text-[#50D873] text-[14px] flex items-center gap-1 hover:opacity-70 transition-opacity duration-200 mt-1"
                        >
                            {footer.viewOnMap}
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                <path
                                    d="M6 3l5 5-5 5"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </a>
                    </div>

                </div>

                {/* pastki buttonlar o‘zgarmadi */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-8">

                    <button className="other_font inline-flex items-center gap-4 pl-6 pr-2 py-2 rounded-full border border-[#1C1C1C]/25 bg-transparent text-[#1C1C1C] text-[14px] font-medium cursor-pointer transition-all duration-300 hover:bg-[#1C1C1C]/5">
                        {footer.suppliers}
                        <span className="w-8 h-8 rounded-full bg-[#50D873] flex items-center justify-center text-white text-[10px] font-bold">
                            PDF
                        </span>
                    </button>

                    <button className="other_font inline-flex items-center gap-4 pl-6 pr-2 py-2 rounded-full border border-[#1C1C1C]/25 bg-transparent text-[#1C1C1C] text-[14px] font-medium cursor-pointer transition-all duration-300 hover:bg-[#1C1C1C]/5">
                        {footer.orderProducts}
                        <span className="w-8 h-8 rounded-full bg-[#50D873] flex items-center justify-center">
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