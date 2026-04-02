"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, Instagram } from 'lucide-react';

const CONTACTS = [
    {
        icon: <Mail size={18} />,
        label: 'Email',
        value: 'gurlanglobal@gmail.com',
        href: 'mailto:gurlanglobal@gmail.com',
    },
    {
        icon: <Phone size={18} />,
        label: 'Telefon',
        value: '+998 97 857 00 05',
        href: 'tel:+998978570005',
    },
    {
        icon: <Send size={18} />,
        label: 'Telegram',
        value: '@ggt_inc',
        href: 'https://t.me/ggt_inc',
    },
    {
        icon: <Phone size={18} />,
        label: 'WhatsApp',
        value: '+998 97 857 00 05',
        href: 'https://wa.me/998978570005',
    },
    {
        icon: <Instagram size={18} />,
        label: 'Instagram',
        value: '@ggt_textile',
        href: 'https://www.instagram.com/ggt_textile/',
    },
];

const ContactS1 = () => {
    return (
        <div className="container">
            <motion.h1
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="other_font uppercase font-medium text-4xl md:text-5xl text-[#2B362D] mt-10 mb-8"
            >
                КОНТАКТЫ
            </motion.h1>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-4"
            >
                {CONTACTS.map((contact, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: i * 0.05 }}
                        className="border-b border-black/10 pb-4 flex items-center gap-4"
                    >
                        <span className="text-[#50D873]">{contact.icon}</span>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                            <p className="other_font text-xs text-black/40 uppercase tracking-wide w-24">
                                {contact.label}
                            </p>
                            <a
                                href={contact.href}
                                target={contact.href.startsWith('http') ? '_blank' : undefined}
                                rel="noopener noreferrer"
                                className="other_font text-sm text-[#2B362D] hover:text-[#50D873] transition-colors duration-200"
                            >
                                {contact.value}
                            </a>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default ContactS1;