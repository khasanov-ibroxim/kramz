'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const BRAND = '#009C89';
const EASE = [0.76, 0, 0.24, 1] as const;

// ── Counter 0→100 ──────────────────────────────────────────
function useCounter(active: boolean, duration = 1400) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!active) { setCount(0); return; }
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

// ── Full-screen loading (F5 / birinchi kirish) ─────────────
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

    return (
        <motion.div
            initial={{ y: 0 }}
            animate={exiting ? { y: '100%' } : { y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            style={{
                position: 'fixed',
                inset: 0,
                background: BRAND,
                zIndex: 9999,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                padding: 'clamp(24px, 5vw, 56px) clamp(24px, 6vw, 72px)',
                overflow: 'hidden',
            }}
        >
            {/* Watermark */}
            <div style={{
                position: 'absolute',
                right: '-2vw',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '65vw',
                fontWeight: 900,
                color: 'rgba(0,0,0,0.06)',
                lineHeight: 1,
                userSelect: 'none',
                pointerEvents: 'none',
                fontFamily: 'sans-serif',
            }}>Д</div>

            {/* Chap — counter */}
            <div style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontSize: 'clamp(72px, 14vw, 160px)',
                fontWeight: 200,
                color: '#fff',
                letterSpacing: '-0.05em',
                lineHeight: 1,
                position: 'relative',
                zIndex: 1,
            }}>
                {String(count).padStart(2, '0')}
                <span style={{ fontSize: '0.28em', fontWeight: 400, opacity: 0.45, verticalAlign: 'super', letterSpacing: '0.02em' }}>%</span>
            </div>

            {/* O'ng — matn */}
            <div style={{ textAlign: 'right', position: 'relative', zIndex: 1 }}>
                {[
                    { text: 'КРАСНОЯРСКИЙ',     opacity: 0.45 },
                    { text: 'МЕТАЛЛУРГИЧЕСКИЙ', opacity: 0.72 },
                    { text: 'ЗАВОД',            opacity: 1.0  },
                ].map(({ text, opacity }, i) => (
                    <motion.div
                        key={text}
                        initial={{ y: 28, opacity: 0 }}
                        animate={exiting ? { y: 28, opacity: 0 } : { y: 0, opacity: 1 }}
                        transition={{
                            delay: exiting ? 0 : 0.2 + i * 0.08,
                            duration: 0.55,
                            ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        style={{
                            fontSize: 'clamp(10px, 1.3vw, 15px)',
                            fontWeight: 600,
                            letterSpacing: '0.14em',
                            lineHeight: 1.7,
                            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                            color: `rgba(255,255,255,${opacity})`,
                        }}
                    >{text}</motion.div>
                ))}

                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={exiting ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 0.35 }}
                    transition={{ delay: 0.15, duration: 0.9, ease: 'easeOut' }}
                    style={{ marginTop: 14, height: '1px', background: '#fff', transformOrigin: 'right' }}
                />
            </div>
        </motion.div>
    );
}

// ── Main component ─────────────────────────────────────────
export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // F5 / birinchi kirish uchun
    const [initialLoading, setInitialLoading] = useState(true);

    // Page transition uchun
    const [sweeping, setSweeping] = useState(false);
    const [displayChildren, setDisplayChildren] = useState(children);
    const isFirst = useRef(true);

    useEffect(() => {
        // Birinchi render — transition yo'q
        if (isFirst.current) {
            isFirst.current = false;
            return;
        }

        // Bo'sh panel tepadan pastga
        setSweeping(true);

        const t1 = setTimeout(() => {
            setDisplayChildren(children); // content almashadi
        }, 500);

        const t2 = setTimeout(() => {
            setSweeping(false);
        }, 1100);

        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [pathname]);

    return (
        <>
            {/* ── FULL LOADER (F5) ── */}
            <AnimatePresence>
                {initialLoading && (
                    <FullLoader onDone={() => setInitialLoading(false)} />
                )}
            </AnimatePresence>

            {/* ── SWEEP (navigation) — bo'sh panel ── */}
            <AnimatePresence>
                {sweeping && (
                    <motion.div
                        key="sweep"
                        initial={{ y: '-100%' }}
                        animate={{ y: '0%' }}
                        exit={{ y: '100%' }}
                        transition={{ duration: 0.55, ease: EASE }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: BRAND,
                            zIndex: 9998,
                            pointerEvents: 'none',
                        }}
                    />
                )}
            </AnimatePresence>

            {/* ── CONTENT ── */}
            <motion.div
                key={pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.05 }}
            >
                {displayChildren}
            </motion.div>
        </>
    );
}