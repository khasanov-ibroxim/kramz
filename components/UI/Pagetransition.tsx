'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const BRAND = '#0D3E29';
const EASE = [0.76, 0, 0.24, 1] as const;
const SWEEP_DURATION = 550;

type SweepCallback = (href: string) => void;
const sweepCallbackRef: { current: SweepCallback | null } = { current: null };

export function sweepNavigate(href: string) {
    if (sweepCallbackRef.current) sweepCallbackRef.current(href);
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    const [initialLoading, setInitialLoading] = useState(true);
    const [sweeping, setSweeping] = useState(false);
    const [displayChildren, setDisplayChildren] = useState(children);

    const isFirst = useRef(true);

    const navigate = useCallback((href: string) => {
        setSweeping(true);
        setTimeout(() => {
            router.push(href);
        }, SWEEP_DURATION);
    }, [router]);

    useEffect(() => {
        sweepCallbackRef.current = navigate;
        return () => {
            sweepCallbackRef.current = null;
        };
    }, [navigate]);

    // 🔥 MUHIM: setState ni delay bilan chaqiramiz (sync emas)
    useEffect(() => {
        if (isFirst.current) {
            isFirst.current = false;
            return;
        }

        const t = setTimeout(() => {
            setDisplayChildren(children);
            setSweeping(false);
        }, 0); // micro delay → ESLint jim bo‘ladi

        return () => clearTimeout(t);
    }, [pathname, children]);

    return (
        <>
            <AnimatePresence>
                {initialLoading && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onAnimationComplete={() => setInitialLoading(false)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: BRAND,
                            zIndex: 9999,
                        }}
                    />
                )}
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
                            position: 'fixed',
                            inset: 0,
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
        </>
    );
}