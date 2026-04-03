"use client"
import React from "react";
import { motion } from "framer-motion";

const contacts = [
    {
        title: "Email",
        lines: [
            { text: "gurlanglobal@gmail.com", href: "mailto:gurlanglobal@gmail.com" },
        ],
    },
    {
        title: "Telefon",
        lines: [
            { text: "+998 97 857 00 05", href: "tel:+998978570005" },
        ],
    },
    {
        title: "Telegram",
        lines: [
            { text: "@ggt_inc", href: "https://t.me/ggt_inc" },
        ],
    },
    {
        title: "WhatsApp",
        lines: [
            { text: "+998 97 857 00 05", href: "https://wa.me/998978570005" },
        ],
    },
    {
        title: "Instagram",
        lines: [
            { text: "@ggt_textile", href: "https://www.instagram.com/ggt_textile/" },
        ],
    },
];

const ContactS1 = () => {
    return (
        <section className="w-full px-5 md:px-10  ">
            {/* Header — markazda, xuddi yuklangan fayldek */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center mb-12 md:mb-16"
            >
                <p className="other_font text-[11px] tracking-[0.18em] uppercase text-black/40 mb-3">
                    Контакты
                </p>
                <h1 className="title_font text-[32px] md:text-[44px] font-normal uppercase tracking-[0.04em] leading-none text-[#2B362D]">
                    Мы здесь, чтобы помочь
                </h1>
            </motion.div>

            <div className="border-t border-black/10" />

            {/* Ustunlar — yuklangan fayldagi grid tuzilmasi */}
            <div className="grid grid-cols-2 justify-items-center sm:grid-cols-3 lg:grid-cols-5 gap-10 md:gap-6 pt-12 md:pt-14">
                {contacts.map((col, i) => (
                    <motion.div
                        key={col.title}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.07 }}
                        className="flex flex-col gap-3"
                    >
                        <h2 className="other_font text-[11px] tracking-[0.16em] uppercase font-semibold text-[#2B362D]">
                            {col.title}
                        </h2>
                        <div className="flex flex-col gap-1">
                            {col.lines.map((line) => (
                                <p key={line.text} className="other_font text-[13px] text-black/60 leading-relaxed">
                                    <a
                                        href={line.href}
                                        target={line.href.startsWith("http") ? "_blank" : undefined}
                                        rel="noopener noreferrer"
                                        className="hover:text-[#50D873] transition-colors duration-200 underline-offset-2 hover:underline"
                                    >
                                        {line.text}
                                    </a>
                                </p>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default ContactS1;