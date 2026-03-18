"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const TABS = [
    { id: 'clients', label: 'Клиентам' },
    { id: 'general', label: 'Общие' },
    { id: 'suppliers', label: 'Поставщикам' },
    { id: 'applicants', label: 'Соискателям' },
    { id: 'dealers', label: 'Официальные дилеры и представители' },
];

const CONTACTS_DATA: Record<string, {
    title: string;
    departments: {
        name: string;
        phones: string[];
        emails: string[];
    }[];
}[]> = {
    clients: [
        {
            title: 'Коммерческая дирекция',
            departments: [
                {
                    name: 'Направление по продажам твердой экструзии на внутреннем рынке',
                    phones: ['+7 391 256 43 18', '+7 391 252 56 35', '+7 391 224 90 74', '+7 391 252 57 90'],
                    emails: ['Vyacheslav.Shein@kramz.biz'],
                },
                {
                    name: 'Направление по продажам мягкой экструзии на внутреннем рынке',
                    phones: ['+7 391 224 90 26', '+7 391 252 56 19', '+7 391 252 58 90', '+7 391 252 58 00'],
                    emails: ['Lyudmila.Musienko@kramz.biz'],
                },
                {
                    name: 'Направление внешнеэкономической деятельности',
                    phones: ['+7 391 256 40 71', '+7 391 252 57 07', '+7 391 252 58 98', '+7 391 226 70 97'],
                    emails: ['Olga.Komina@kramz.biz', 'Alisa.Nedomovnaya@kramz.biz', 'Anastasiya.Yurkova@kramz.biz', 'Valentina.Vasilovskaya@kramz.biz'],
                },
            ],
        },
        {
            title: 'Инжиниринговый центр',
            departments: [
                {
                    name: 'Отдел технического сопровождения',
                    phones: ['+7 391 256 40 00', '+7 391 252 56 10'],
                    emails: ['tech@kramz.biz'],
                },
            ],
        },
    ],
    general: [
        {
            title: 'Приёмная',
            departments: [
                {
                    name: 'Общий отдел',
                    phones: ['+7 391 256 40 00'],
                    emails: ['info@kramz.biz'],
                },
            ],
        },
    ],
    suppliers: [
        {
            title: 'Отдел снабжения',
            departments: [
                {
                    name: 'Закупки сырья и материалов',
                    phones: ['+7 391 256 41 00', '+7 391 252 56 40'],
                    emails: ['supply@kramz.biz'],
                },
            ],
        },
    ],
    applicants: [
        {
            title: 'Отдел кадров',
            departments: [
                {
                    name: 'Подбор персонала',
                    phones: ['+7 391 256 42 00'],
                    emails: ['hr@kramz.biz'],
                },
            ],
        },
    ],
    dealers: [
        {
            title: 'Дилерская сеть',
            departments: [
                {
                    name: 'Региональные представители',
                    phones: ['+7 391 256 43 00', '+7 391 252 57 50'],
                    emails: ['dealers@kramz.biz'],
                },
            ],
        },
    ],
};

const AccordionItem = ({
                           section,
                           defaultOpen = false,
                       }: {
    section: typeof CONTACTS_DATA['clients'][0];
    defaultOpen?: boolean;
}) => {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-black/10">
            {/* Header */}
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between py-5 cursor-pointer group"
            >
                <span className="other_font text-base text-[#2B362D] font-medium text-left">
                    {section.title}
                </span>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200 ${open ? 'bg-[#009C89]' : 'bg-black/8 group-hover:bg-black/12'}`}>
                    {open
                        ? <Minus size={16} className="text-white" />
                        : <Plus size={16} className="text-[#2B362D]" />
                    }
                </span>
            </button>

            {/* Content */}
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="overflow-hidden"
                    >
                        <div className="pb-6 flex flex-col gap-8">
                            {section.departments.map((dept, i) => (
                                <div key={i}>
                                    <p className="other_font text-sm text-[#009C89] mb-4 font-medium">
                                        {dept.name}
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <p className="other_font text-xs text-black/40 mb-2 uppercase tracking-wide">Телефон:</p>
                                            <div className="flex flex-col gap-1">
                                                {dept.phones.map((phone, j) => (
                                                    <a
                                                        key={j}
                                                        href={`tel:${phone.replace(/\s/g, '')}`}
                                                        className="other_font text-sm text-[#2B362D] hover:text-[#009C89] transition-colors duration-200"
                                                    >
                                                        {phone}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="other_font text-xs text-black/40 mb-2 uppercase tracking-wide">E-mail:</p>
                                            <div className="flex flex-col gap-1">
                                                {dept.emails.map((email, j) => (
                                                    <a
                                                        key={j}
                                                        href={`mailto:${email}`}
                                                        className="other_font text-sm text-[#009C89] hover:underline transition-colors duration-200"
                                                    >
                                                        {email}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    {i < section.departments.length - 1 && (
                                        <div className="mt-6 border-b border-black/8" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ContactS1 = () => {
    const [activeTab, setActiveTab] = useState('clients');
    const sections = CONTACTS_DATA[activeTab] || [];

    return (
        <div className="container">
            {/* Tabs */}
            <div className="flex items-start gap-1 bg-[#009C89]/5 rounded-2xl p-1 w-full md:w-fit flex-wrap">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`other_font relative px-5 py-2 rounded-xl text-sm font-medium transition-colors duration-300 cursor-pointer whitespace-nowrap ${
                            activeTab === tab.id ? 'text-white' : 'text-[#2B362D] hover:text-[#009C89]'
                        }`}
                    >
                        {activeTab === tab.id && (
                            <motion.span
                                layoutId="contact-tab-bg"
                                className="absolute inset-0 bg-[#009C89] rounded-xl"
                                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                            />
                        )}
                        <span className="relative z-10">{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Tab title */}
            <AnimatePresence mode="wait">
                <motion.h1
                    key={activeTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="other_font uppercase font-medium text-4xl md:text-5xl text-[#2B362D] mt-10 mb-8"
                >
                    {TABS.find(t => t.id === activeTab)?.label}
                </motion.h1>
            </AnimatePresence>

            {/* Accordion sections — first item always open by default */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {sections.map((section, i) => (
                        <AccordionItem
                            key={`${activeTab}-${i}`}
                            section={section}
                            defaultOpen={i === 0}
                        />
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default ContactS1;