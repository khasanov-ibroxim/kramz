"use client"
import React from "react";
import { motion } from "framer-motion";
import type { ContactDictionary } from "@/lib/dictionary";

interface ContactS1Props {
    dict: ContactDictionary['s1'];
}

const ContactS1 = ({ dict }: ContactS1Props) => {
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
                    {dict.subtitle}
                </p>
                <h1 className="title_font text-[32px] md:text-[44px] font-normal uppercase tracking-[0.04em] leading-none text-[#2B362D]">
                    {dict.title}
                </h1>
            </motion.div>

            <div className="border-t border-black/10" />

            {/* Ustunlar — yuklangan fayldagi grid tuzilmasi */}
            <div className="grid grid-cols-2 justify-items-center sm:grid-cols-3 lg:grid-cols-5 gap-10 md:gap-6 pt-12 md:pt-14">
                {dict.contacts.map((col: typeof dict.contacts[0], i: number) => (
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
                            {col.lines.map((line: typeof col.lines[0]) => (
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