'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const BRAND = '#009C89';
const EASE = [0.76, 0, 0.24, 1] as const;
const SWEEP_DURATION = 550;

type SweepCallback = (href: string) => void;
let globalSweepNavigate: SweepCallback | null = null;

export function sweepNavigate(href: string) {
    if (globalSweepNavigate) globalSweepNavigate(href);
}

// ── Counter 0→100 ──────────────────────────────────────────
function useCounter(active: boolean, duration = 1400) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!active) return;
        const start = performance.now();
        let raf: number;
        const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setCount(Math.round(eased * 100));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [active, duration]);
    return count;
}

// ── Watermark ──────────────────────────────────────────────
function WatermarkSVG({ exiting }: { exiting: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={exiting ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            style={{
                position: 'absolute', inset: 0,
                pointerEvents: 'none', userSelect: 'none',
                overflow: 'hidden', zIndex: 0,
            }}
        >
            <svg
                width="100%" height="100%"
                viewBox="0 0 1681 1471"
                fill="none"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            >
                <defs>
                    <linearGradient id="grad-loader-watermark" x1="1420.1" x2="1341.5" y1="1493.86" y2="31.8811" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#B5DDD6" stopOpacity="0" />
                        <stop offset="0.588542" stopColor="#A5D9CC" stopOpacity="1" />
                        <stop offset="1" stopColor="#B5DDD1" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="grad-loader-reveal" x1="0" y1="1471" x2="0" y2="0" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="white" stopOpacity="0" />
                        <stop offset="0.45" stopColor="white" stopOpacity="1" />
                        <stop offset="1" stopColor="white" stopOpacity="0.55" />
                    </linearGradient>
                    <mask id="mask-loader-reveal">
                        <rect width="1681" height="1471" fill="url(#grad-loader-reveal)" />
                    </mask>
                </defs>
                <path
                    opacity="0.2"
                    d="M308.183 1466.53H0L861.513 0H1260.75V1110.76H955.193L875.521 1247.71H1418.34V0H1681V1470.87H481.536L817.736 891.22H998.094V289.103L308.183 1466.53Z"
                    fill="url(#grad-loader-watermark)"
                    mask="url(#mask-loader-reveal)"
                />
            </svg>
        </motion.div>
    );
}

// ── Brand Text ─────────────────────────────────────────────
function BrandText({ exiting, align }: { exiting: boolean; align: 'right' | 'center' }) {
    return (
        <div style={{ textAlign: align, position: 'relative', zIndex: 1 }}>
            {[
                { text: 'КРАСНОЯРСКИЙ',     opacity: 0.45 },
                { text: 'МЕТАЛЛУРГИЧЕСКИЙ', opacity: 0.72 },
                { text: 'ЗАВОД',            opacity: 1.0  },
            ].map(({ text, opacity }, i) => (
                <motion.div
                    key={text}
                    initial={{ y: 22, opacity: 0 }}
                    animate={exiting ? { y: 22, opacity: 0 } : { y: 0, opacity: 1 }}
                    transition={{
                        delay: exiting ? 0 : 0.2 + i * 0.08,
                        duration: 0.55,
                        ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    style={{
                        fontSize: 'clamp(10px, 1.3vw, 15px)',
                        fontWeight: 600,
                        letterSpacing: '0.14em',
                        lineHeight: 1.75,
                        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                        color: `rgba(255,255,255,${opacity})`,
                    }}
                >{text}</motion.div>
            ))}
            {align === 'right' && (
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={exiting ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 0.35 }}
                    transition={{ delay: 0.15, duration: 0.9, ease: 'easeOut' }}
                    style={{ marginTop: 14, height: '1px', background: '#fff', transformOrigin: 'right' }}
                />
            )}
        </div>
    );
}

// ── Full-screen loader ─────────────────────────────────────
function FullLoader({ onDone }: { onDone: () => void }) {
    const [exiting, setExiting] = useState(false);
    const count = useCounter(!exiting, 1400);

    useEffect(() => {
        const t = setTimeout(() => {
            setExiting(true);
            setTimeout(onDone, 700);
        }, 1600);
        return () => clearTimeout(t);
    }, []);

    const counterEl = (fontSize: string) => (
        <div style={{
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize, fontWeight: 200, color: '#fff',
            letterSpacing: '-0.04em', lineHeight: 1,
            position: 'relative', zIndex: 1,
        }}>
            [ {String(count).padStart(2, '0')} ]
        </div>
    );

    return (
        <motion.div
            initial={{ y: 0 }}
            animate={exiting ? { y: '100%' } : { y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            style={{
                position: 'fixed', inset: 0,
                background: BRAND, zIndex: 9999, overflow: 'hidden',
            }}
        >
            <WatermarkSVG exiting={exiting} />
            <div className="loader-desktop" style={{
                position: 'absolute', inset: 0, display: 'flex',
                alignItems: 'flex-end', justifyContent: 'space-between',
                padding: 'clamp(24px, 5vw, 56px) clamp(24px, 6vw, 72px)', zIndex: 1,
            }}>
                {counterEl('clamp(72px, 11vw, 130px)')}
                <BrandText exiting={exiting} align="right" />
            </div>
            <div className="loader-mobile" style={{
                position: 'absolute', inset: 0, display: 'flex',
                flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                zIndex: 1, gap: 28, padding: '24px',
            }}>
                {counterEl('clamp(64px, 20vw, 100px)')}
                <BrandText exiting={exiting} align="center" />
            </div>
        </motion.div>
    );
}

// ── Main component ─────────────────────────────────────────
export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [initialLoading, setInitialLoading] = useState(true);
    const [sweeping, setSweeping] = useState(false);
    const [displayChildren, setDisplayChildren] = useState(children);
    const isFirst = useRef(true);

    globalSweepNavigate = useCallback((href: string) => {
        // 1. Sweep kiradi
        setSweeping(true);

        // 2. Sweep to'liq ekranni yopganda (SWEEP_DURATION ms) — navigate
        setTimeout(() => {
            router.push(href);
        }, SWEEP_DURATION);
    }, [router]);

    useEffect(() => {
        // Birinchi render — skip
        if (isFirst.current) { isFirst.current = false; return; }

        // Pathname o'zgardi: children yangilab, sweep chiqarамиз
        setDisplayChildren(children);
        setTimeout(() => setSweeping(false), 50);
    }, [pathname]);

    return (
        <>
            <AnimatePresence>
                {initialLoading && <FullLoader onDone={() => setInitialLoading(false)} />}
            </AnimatePresence>

            <AnimatePresence>
                {sweeping && (
                    <motion.div
                        key="sweep"
                        initial={{ y: '-100%' }}
                        animate={{ y: '0%' }}
                        exit={{ y: '100%' }}
                        transition={{ duration: SWEEP_DURATION / 1000, ease: EASE }}
                        style={{
                            position: 'fixed', inset: 0,
                            background: BRAND,
                            zIndex: 9998,
                            pointerEvents: 'none',
                        }}
                    />
                )}
            </AnimatePresence>

            <motion.div
                key={pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.05 }}
            >
                {displayChildren}
            </motion.div>

            <style>{`
                .loader-desktop { display: flex !important; }
                .loader-mobile  { display: none  !important; }
                @media (max-width: 768px) {
                    .loader-desktop { display: none  !important; }
                    .loader-mobile  { display: flex  !important; }
                }
            `}</style>
        </>
    );
}