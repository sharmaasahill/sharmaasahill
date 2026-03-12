import { useEffect, useCallback, useRef } from 'react';
import { useMotionValue, useSpring, motion } from 'framer-motion';

export default function CustomCursor() {
    const cursorX = useMotionValue(-200);
    const cursorY = useMotionValue(-200);
    const hovered = useRef(false);
    const hoveredEl = useRef(null);

    const springCfg = { damping: 35, stiffness: 700, mass: 0.1 };
    const sx = useSpring(cursorX, springCfg);
    const sy = useSpring(cursorY, springCfg);

    const onMove = useCallback((e) => {
        // Use requestAnimationFrame for smoother updates that sync with the screen refresh
        requestAnimationFrame(() => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        });
    }, [cursorX, cursorY]);

    useEffect(() => {
        window.addEventListener('mousemove', onMove);

        const addHover = (e) => { hovered.current = true; hoveredEl.current = e.currentTarget; };
        const removeHover = () => { hovered.current = false; hoveredEl.current = null; };

        const observe = () => {
            document.querySelectorAll('a, button, [role="button"], input, textarea, .cursor-hover').forEach((el) => {
                el.addEventListener('mouseenter', addHover);
                el.addEventListener('mouseleave', removeHover);
            });
        };

        observe();
        const observer = new MutationObserver(observe);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', onMove);
            observer.disconnect();
        };
    }, [onMove]);

    if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

    return (
        <>
            {/* Spotlight glow — large soft gradient that illuminates the area */}
            <motion.div
                className="fixed pointer-events-none z-[9997]"
                style={{
                    x: sx,
                    y: sy,
                    width: 300,
                    height: 300,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <div
                    className="w-full h-full rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, rgba(124,58,237,0.03) 40%, transparent 70%)',
                    }}
                />
            </motion.div>

            {/* Cursor ring — minimal animated ring, no dot */}
            <motion.div
                className="fixed pointer-events-none z-[9999]"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <svg width="40" height="40" viewBox="0 0 40 40" className="animate-[spin_8s_linear_infinite]">
                    <circle
                        cx="20" cy="20" r="16"
                        fill="none"
                        stroke="url(#cursorGrad)"
                        strokeWidth="1.5"
                        strokeDasharray="25 75"
                        strokeLinecap="round"
                    />
                    <defs>
                        <linearGradient id="cursorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#7c3aed" />
                            <stop offset="100%" stopColor="#c084fc" />
                        </linearGradient>
                    </defs>
                </svg>
            </motion.div>

            {/* Inner crosshair */}
            <motion.div
                className="fixed pointer-events-none z-[9999]"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <svg width="12" height="12" viewBox="0 0 12 12">
                    <line x1="6" y1="0" x2="6" y2="12" stroke="#7c3aed" strokeWidth="1" opacity="0.7" />
                    <line x1="0" y1="6" x2="12" y2="6" stroke="#7c3aed" strokeWidth="1" opacity="0.7" />
                </svg>
            </motion.div>
        </>
    );
}
