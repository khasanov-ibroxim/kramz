"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, RefreshCw } from 'lucide-react';
import type { ContactDictionary } from '@/lib/dictionary';
import PrivacyModal from './PrivacyModal';

interface ContactS3Props {
    dict: ContactDictionary['s3'];
    lang: string;
}

const TELEGRAM_TOKEN = 'YOUR_BOT_TOKEN';
const CHAT_ID = 'YOUR_CHAT_ID';

// Simple math captcha
const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    return { question: `${a} + ${b}`, answer: a + b };
};

const ContactS3 = ({ dict, lang }: ContactS3Props) => {
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
    const [agreed, setAgreed] = useState(false);
    const [captcha, setCaptcha] = useState(generateCaptcha);
    const [captchaInput, setCaptchaInput] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [modalOpen, setModalOpen] = useState<'consent' | 'policy' | null>(null);

    const refreshCaptcha = () => {
        setCaptcha(generateCaptcha());
        setCaptchaInput('');
    };

    const validate = () => {
        const e: Record<string, string> = {};
        if (!form.name.trim()) e.name = dict.validation.required;
        if (!form.email.trim()) e.email = dict.validation.required;
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = dict.validation.invalidEmail;
        if (!form.phone.trim()) e.phone = dict.validation.required;
        if (!form.message.trim()) e.message = dict.validation.required;
        if (!agreed) e.agreed = dict.validation.consentRequired;
        if (!captchaInput.trim()) e.captcha = dict.validation.captchaRequired;
        else if (parseInt(captchaInput) !== captcha.answer) e.captcha = dict.validation.captchaWrong;
        return e;
    };

    const handleSubmit = async () => {
        const e = validate();
        if (Object.keys(e).length > 0) {
            setErrors(e);
            return;
        }
        setErrors({});
        setStatus('loading');

        const text = `📩 Новое сообщение с сайта\n\n👤 Имя / организация: ${form.name}\n📧 E-mail: ${form.email}\n📞 Телефон: ${form.phone}\n💬 Сообщение: ${form.message}`;

        try {
            const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML' }),
            });
            const data = await res.json();
            if (data.ok) {
                setStatus('success');
                setForm({ name: '', email: '', phone: '', message: '' });
                setAgreed(false);
                setCaptchaInput('');
                refreshCaptcha();
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    const handleChange = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const fields = [
        { key: 'name', placeholder: dict.fields.name },
        { key: 'email', placeholder: dict.fields.email },
        { key: 'phone', placeholder: dict.fields.phone },
        { key: 'message', placeholder: dict.fields.message },
    ];

    return (
        <div className="py-16 bg-[#0D3E29] ">
            <div className="container">
                <div className="h-screen flex flex-col items-start justify-center ">
                    <h1 className="other_font uppercase font-bold text-4xl md:text-5xl lg:text-6xl text-[#fff] mb-12">
                        {dict.title}
                    </h1>

                    <div className="max-w-2xl flex flex-col gap-2">
                        {/* Form fields */}
                        {fields.map(({ key, placeholder }) => (
                            <div key={key}>
                                <div className="relative">
                                    <input
                                        type={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'text'}
                                        placeholder={placeholder}
                                        value={form[key as keyof typeof form]}
                                        onChange={e => handleChange(key, e.target.value)}
                                        className={`other_font w-full bg-transparent border-b py-4 text-sm text-[#fff] placeholder-[#fff] outline-none transition-colors duration-200 focus:border-[#50D873] ${
                                            errors[key] ? 'border-red-400' : 'border-[#fff]/20'
                                        }`}
                                    />
                                </div>
                                {errors[key] && (
                                    <p className="other_font text-xs text-red-500 mt-1">{errors[key]}</p>
                                )}
                            </div>
                        ))}

                        {/* Checkbox */}
                        <div className="mt-6">
                            <label className="flex items-start gap-3 cursor-pointer">
                                <div
                                    onClick={() => {
                                        setAgreed(!agreed);
                                        if (errors.agreed) setErrors(prev => ({ ...prev, agreed: '' }));
                                    }}
                                    className={`mt-0.5 w-5 h-5 shrink-0 rounded border-2 flex items-center justify-center transition-colors duration-200 cursor-pointer ${
                                        agreed ? 'bg-[#50D873] border-[#50D873]' : errors.agreed ? 'border-red-400' : 'border-[#fff]/30'
                                    }`}
                                >
                                    {agreed && (
                                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </div>
                                <span className="other_font text-xs text-[#fff]/80 leading-relaxed">
                            {dict.consent.text}{' '}
                                    <a
                                        href="#"
                                        onClick={(e) => { e.preventDefault(); setModalOpen('consent'); }}
                                        className="text-[#50D873] hover:underline cursor-pointer"
                                    >
                                        {dict.consent.link1}
                                    </a>
                                    {' '}{dict.consent.middle}{' '}
                                    <a
                                        href="#"
                                        onClick={(e) => { e.preventDefault(); setModalOpen('policy'); }}
                                        className="text-[#50D873] hover:underline cursor-pointer"
                                    >
                                        {dict.consent.link2}
                                    </a>
                        </span>
                            </label>
                            {errors.agreed && (
                                <p className="other_font text-xs text-red-500 mt-1 ml-8">{errors.agreed}</p>
                            )}
                        </div>

                        {/* Submit + Captcha row */}
                        <div className="flex flex-wrap items-start gap-4 mt-6">
                            {/* Submit button */}
                            <button
                                onClick={handleSubmit}
                                disabled={status === 'loading'}
                                className="flex items-center gap-2 rounded-full border border-black/12 bg-transparent py-2 pl-5 pr-2 group hover:bg-[#50D873] hover:border-[#50D873] transition-colors duration-300 cursor-pointer disabled:opacity-60"
                            >
                        <span className="other_font text-sm font-medium text-[#fff] group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                            {status === 'loading' ? dict.buttons.sending : dict.buttons.submit}
                        </span>
                                <span className="w-9 h-9 rounded-full bg-[#50D873] group-hover:bg-white flex items-center justify-center transition-colors duration-300 shrink-0">
                            <ChevronRight size={18} className="stroke-white group-hover:stroke-[#50D873] transition-colors duration-300" strokeWidth={2.5} />
                        </span>
                            </button>

                            {/* Captcha */}
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2 border border-[#2B362D]/15 rounded-xl px-4 py-2 bg-white/40">
                            <span className="other_font text-sm font-semibold text-[#2B362D] min-w-[60px]">
                                {captcha.question} =
                            </span>
                                    <input
                                        type="number"
                                        value={captchaInput}
                                        onChange={e => {
                                            setCaptchaInput(e.target.value);
                                            if (errors.captcha) setErrors(prev => ({ ...prev, captcha: '' }));
                                        }}
                                        placeholder={dict.captcha.placeholder}
                                        className="other_font w-28 bg-transparent outline-none text-sm text-[#2B362D] placeholder-[#2B362D]/40"
                                    />
                                    <button
                                        onClick={refreshCaptcha}
                                        className="text-[#2B362D]/40 hover:text-[#50D873] transition-colors duration-200 cursor-pointer"
                                        title={dict.captcha.refreshTitle}
                                    >
                                        <RefreshCw size={14} />
                                    </button>
                                </div>
                                {errors.captcha && (
                                    <p className="other_font text-xs text-red-500">{errors.captcha}</p>
                                )}
                            </div>
                        </div>

                        {/* Success / Error messages */}
                        {status === 'success' && (
                            <motion.p
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="other_font text-sm text-[#50D873] mt-2"
                            >
                                {dict.messages.success}
                            </motion.p>
                        )}
                        {status === 'error' && (
                            <motion.p
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="other_font text-sm text-red-500 mt-2"
                            >
                                {dict.messages.error}
                            </motion.p>
                        )}
                    </div>
                </div>

            </div>

            {/* Privacy Modal */}
            <PrivacyModal
                isOpen={modalOpen !== null}
                onClose={() => setModalOpen(null)}
                type={modalOpen || 'consent'}
                lang={lang}
            />
        </div>
    );
};

export default ContactS3;