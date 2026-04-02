'use client';

import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { sweepNavigate } from '@/components/UI/Pagetransition';
import logo from "@/assets/Gurlan_global-03.png"
import Image from "next/image";

interface NavbarProps {
    lang: string;
}

const EASE = [0.76, 0, 0.24, 1] as const;

const NAV_LINKS = [
    { label: 'О компании', href: '/about' },
    { label: 'Производство',   href: '/production' },
    { label: 'Контакты',   href: '/contact' },
];

const LOCALES = ['en', 'ru'] as const;



// ── Phone icon ─────────────────────────────────────────────
function PhoneIcon({ color = '#1a1a1a' }: { color?: string }) {
    return (
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <path d="M2 2.5C2 2.5 3.5 1 5 2.5L6.5 4.5C7 5.2 6.8 6 6.2 6.5L5.5 7C5.5 7 5.8 8.2 7 9.5C8.2 10.8 9.5 11 9.5 11L10 10.3C10.5 9.7 11.3 9.5 12 10L14 11.5C15.5 12.7 14 14.5 14 14.5C12.5 16 3 10 2 2.5Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
    );
}

// ── Arrow icon ─────────────────────────────────────────────
function ArrowRight({ color = 'rgba(255,255,255,0.5)' }: { color?: string }) {
    return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

// ── SweepLink — sweepNavigate bilan ishlaydigan link ──────
function SweepLink({
                       href,
                       children,
                       style,
                       onMouseEnter,
                       onMouseLeave,
                       onClick,
                   }: {
    href: string;
    children: React.ReactNode;
    style?: React.CSSProperties;
    onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLAnchorElement>;
    onClick?: () => void;
}) {
    return (
        <a
            href={href}
            style={{ cursor: 'pointer', ...style }}
            onClick={(e) => {
                e.preventDefault();
                onClick?.();
                sweepNavigate(href);
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {children}
        </a>
    );
}

// ── Mobile Menu ────────────────────────────────────────────
function MobileMenu({ open, onClose, lang }: { open: boolean; onClose: () => void; lang: string }) {
    const pathname = usePathname();

    useEffect(() => {
        if (open) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed', inset: 0,
                            background: 'rgba(0,0,0,0.25)',
                            zIndex: 9980,
                        }}
                    />

                    <motion.div
                        key="mobile-menu"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.45, ease: EASE }}
                        style={{
                            position: 'fixed',
                            top: 0, right: 0, bottom: 0,
                            width: '100%', maxWidth: 420,
                            background: '#009C89',
                            zIndex: 9990,
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '20px 24px 40px',
                            overflowY: 'auto',
                        }}
                    >
                        {/* Top bar */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 36 }}>
                            {/*<SweepLink href={`/${lang}`} onClick={onClose}>*/}
                            {/*    <Image src={logo} alt={"Sad"} width={32} height={32}/>*/}
                            {/*</SweepLink>*/}

                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <button style={{
                                    width: 38, height: 38, borderRadius: '50%',
                                    border: '1.5px solid rgba(255,255,255,0.35)',
                                    background: 'transparent', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <PhoneIcon color="#fff" />
                                </button>

                                {LOCALES.map(l => (
                                    <SweepLink key={l} href={`/${l}`} onClick={onClose} style={{
                                        width: 34, height: 34, borderRadius: '50%',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 12, fontWeight: 600, letterSpacing: '0.05em',
                                        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                                        textDecoration: 'none',
                                        background: l === lang ? '#fff' : 'transparent',
                                        color: l === lang ? '#009C89' : 'rgba(255,255,255,0.65)',
                                        border: l === lang ? 'none' : '1.5px solid rgba(255,255,255,0.3)',
                                        transition: 'all 0.2s',
                                    }}>{l}</SweepLink>
                                ))}

                                <button onClick={onClose} style={{
                                    width: 38, height: 38, background: 'transparent',
                                    border: 'none', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                        <path d="M1 1L17 17M17 1L1 17" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div style={{ marginBottom: 28 }}>
                            <p style={{
                                fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
                                color: 'rgba(255,255,255,0.45)',
                                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                                marginBottom: 14, textTransform: 'uppercase',
                            }}>Действия:</p>
                            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                                {[
                                    { label: 'Связаться с нами', pdf: false },
                                    { label: 'Скачать каталог', pdf: true },
                                ].map(({ label, pdf }) => (
                                    <button key={label} style={{
                                        padding: '9px 18px', borderRadius: 24,
                                        border: '1.5px solid rgba(255,255,255,0.4)',
                                        background: 'transparent', color: '#fff',
                                        fontSize: 13,
                                        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                                        cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', gap: 8,
                                    }}>
                                        {label}
                                        {pdf && (
                                            <span style={{
                                                background: 'rgba(255,255,255,0.15)',
                                                border: '1px solid rgba(255,255,255,0.3)',
                                                borderRadius: 5, padding: '1px 6px',
                                                fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
                                            }}>PDF</span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={{ height: 1, background: 'rgba(255,255,255,0.18)', marginBottom: 4 }} />

                        {/* Nav links */}
                        <nav style={{ flex: 1 }}>
                            {NAV_LINKS.map(({ label, href }, i) => {
                                const full = `/${lang}${href}`;
                                const active = pathname.startsWith(full);
                                return (
                                    <motion.div
                                        key={href}
                                        initial={{ x: 24, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.08 + i * 0.065, duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
                                    >
                                        <SweepLink
                                            href={full}
                                            onClick={onClose}
                                            style={{
                                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                                padding: '18px 0',
                                                borderBottom: '1px solid rgba(255,255,255,0.13)',
                                                textDecoration: 'none',
                                                color: active ? 'rgba(255,255,255,0.85)' : '#fff',
                                                fontSize: 22, fontWeight: active ? 500 : 400,
                                                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                                                letterSpacing: '-0.01em',
                                            }}
                                        >
                                            {label}
                                            <ArrowRight />
                                        </SweepLink>
                                    </motion.div>
                                );
                            })}
                        </nav>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// ── Main Navbar ────────────────────────────────────────────
export default function Navbar({ lang }: NavbarProps) {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const isHeroPage = pathname === `/${lang}` || pathname === `/${lang}/`;

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > window.innerHeight * 0.85);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const showBg = scrolled || !isHeroPage;
    const textColor = showBg ? '#1a1a1a' : '#ffffff';
    const borderColor = showBg ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.45)';

    return (
        <>
            <motion.header
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.05 }}
                style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0,
                    zIndex: 1000,
                    background: showBg ? 'rgba(244,248,247,0.88)' : 'transparent',
                    backdropFilter: showBg ? 'blur(14px)' : 'none',
                    WebkitBackdropFilter: showBg ? 'blur(14px)' : 'none',
                    borderBottom: showBg ? '1px solid rgba(0,0,0,0.07)' : 'none',
                    transition: 'background 0.4s, border-color 0.4s, backdrop-filter 0.4s',
                }}
            >
                <div style={{
                    width: '100%',
                    height: 72,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 16,
                    boxSizing: 'border-box',
                }}
                     className={"px-0 md:px-5"}
                >


                    <SweepLink
                        href={`/${lang}`}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 0,
                            textDecoration: 'none', flexShrink: 0,
                        }}
                    >
                        <Image
                            src={logo}
                            alt={"Gurlan Global Teks"}
                            width={200}
                            height={102}
                            style={{ height: 44, width: 'auto', objectFit: 'contain' }}
                        />
                    </SweepLink>

                    {/* DESKTOP NAV */}
                    <nav className="nav-desktop" style={{
                        display: 'flex', alignItems: 'center',
                        gap: 'clamp(16px, 2.5vw, 36px)',
                        flex: 1, justifyContent: 'center',
                    }}>
                        {NAV_LINKS.map(({ label, href }) => {
                            const full = `/${lang}${href}`;
                            const active = pathname.startsWith(full);
                            return (
                                <SweepLink
                                    key={href}
                                    href={full}
                                    style={{
                                        fontSize: 18, fontWeight: 400,
                                        letterSpacing: '0.01em',
                                        color: textColor, textDecoration: 'none',
                                        opacity: active ? 1 : 0.7,
                                        borderBottom: active ? `1.5px solid ${textColor}` : '1.5px solid transparent',
                                        paddingBottom: 2,
                                        transition: 'opacity 0.2s, border-color 0.2s, color 0.4s',
                                        whiteSpace: 'nowrap',
                                    }}
                                    onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                                    onMouseLeave={e => (e.currentTarget.style.opacity = active ? '1' : '0.7')}
                                >
                                    {label}
                                </SweepLink>
                            );
                        })}
                    </nav>

                    {/* DESKTOP ACTIONS */}
                    <div className="nav-desktop" style={{
                        display: 'flex', alignItems: 'center',
                        gap: 8, flexShrink: 0,
                    }}>
                        <button style={{
                            display: 'flex', alignItems: 'center', gap: 7,
                            padding: '8px 16px', borderRadius: 24,
                            border: `1.5px solid ${borderColor}`,
                            background: 'transparent', color: textColor,
                            fontSize: 14, cursor: 'pointer', whiteSpace: 'nowrap',
                            transition: 'border-color 0.4s, color 0.4s',
                        }}>
                            Скачать каталог
                            <span style={{
                                background: '#009C89', color: '#fff',
                                borderRadius: 5, padding: '2px 6px',
                                fontSize: 10, fontWeight: 700, letterSpacing: '0.05em',
                            }}>PDF</span>
                        </button>

                        <button style={{
                            display: 'flex', alignItems: 'center', gap: 7,
                            padding: '8px 16px', borderRadius: 24,
                            border: `1.5px solid ${borderColor}`,
                            background: 'transparent', color: textColor,
                            fontSize: 14, cursor: 'pointer', whiteSpace: 'nowrap',
                            transition: 'border-color 0.4s, color 0.4s',
                        }}>
                            Связаться с нами
                        </button>

                        <button style={{
                            width: 36, height: 36, borderRadius: '50%',
                            border: `1.5px solid ${borderColor}`,
                            background: 'transparent',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', transition: 'border-color 0.4s',
                        }}>
                            <PhoneIcon color={textColor} />
                        </button>

                        {/* Lang */}
                        <div style={{ display: 'flex', gap: 4, marginLeft: 2 }}>
                            {LOCALES.map(l => (
                                <SweepLink key={l} href={`/${l}`} style={{
                                    width: 32, height: 32, borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 12, fontWeight: 600, letterSpacing: '0.04em',
                                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                                    textDecoration: 'none',
                                    background: l === lang ? (showBg ? '#1a1a1a' : '#fff') : 'transparent',
                                    color: l === lang ? (showBg ? '#fff' : '#009C89') : textColor,
                                    border: l === lang ? 'none' : `1.5px solid ${borderColor}`,
                                    opacity: l === lang ? 1 : 0.65,
                                    transition: 'all 0.3s',
                                }}>{l}</SweepLink>
                            ))}
                        </div>
                    </div>

                    {/* MOBILE RIGHT */}
                    <div className="nav-mobile" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <button style={{
                            display: 'flex', alignItems: 'center', gap: 6,
                            padding: '7px 13px', borderRadius: 20,
                            border: `1.5px solid ${borderColor}`,
                            background: 'transparent', color: textColor,
                            fontSize: 12,
                            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                            cursor: 'pointer', whiteSpace: 'nowrap',
                        }}>
                            Скачать каталог
                            <span style={{
                                background: '#009C89', color: '#fff',
                                borderRadius: 4, padding: '1px 5px',
                                fontSize: 9, fontWeight: 700,
                            }}>PDF</span>
                        </button>

                        <button
                            onClick={() => setMobileOpen(true)}
                            style={{
                                background: 'transparent', border: 'none',
                                cursor: 'pointer', padding: 4,
                                display: 'flex', flexDirection: 'column',
                                alignItems: 'flex-end', gap: 5,
                            }}
                            aria-label="Меню"
                        >
                            <span style={{ display: 'block', width: 22, height: 2, background: textColor, borderRadius: 2, transition: 'background 0.4s' }} />
                            <span style={{ display: 'block', width: 14, height: 2, background: textColor, borderRadius: 2, transition: 'background 0.4s' }} />
                        </button>
                    </div>

                </div>
            </motion.header>

            <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} lang={lang} />

            <style>{`
                .nav-desktop { display: flex !important; }
                .nav-mobile  { display: none  !important; }
                @media (max-width: 1100px) {
                    .nav-desktop { display: none  !important; }
                    .nav-mobile  { display: flex  !important; }
                }
            `}</style>
        </>
    );
}