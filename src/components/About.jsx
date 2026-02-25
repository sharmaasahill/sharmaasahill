import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { HiCode, HiLightningBolt, HiUsers, HiCollection } from 'react-icons/hi';
import { aboutData } from '../data/portfolioData';

const iconMap = [HiLightningBolt, HiCollection, HiCode, HiUsers];

// Animated counter hook
function useCounter(target, inView) {
    const [count, setCount] = useState(0);
    const num = parseInt(target);

    useEffect(() => {
        if (!inView) return;
        const controls = animate(0, num, {
            duration: 1.8,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (v) => setCount(Math.round(v)),
        });
        return () => controls.stop();
    }, [inView, num]);

    return count + target.replace(/[\d]/g, '');
}

function CounterCard({ item, index, inView }) {
    const Icon = iconMap[index];
    const animatedValue = useCounter(item.value, inView);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.15 * index, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6, scale: 1.04 }}
            className="glass-card p-6 text-center group cursor-default"
        >
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={inView ? { scale: 1, rotate: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * index + 0.2, type: 'spring', stiffness: 200 }}
                className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-500 transition-colors duration-300"
            >
                <Icon className="text-primary-500 group-hover:text-white transition-colors duration-300" size={22} />
            </motion.div>
            <p className="text-2xl md:text-3xl font-bold gradient-text mb-1">{animatedValue}</p>
            <p className="text-sm text-dark-500 dark:text-dark-400 font-medium">{item.label}</p>
        </motion.div>
    );
}

export default function About() {
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const statsRef = useRef(null);
    const titleInView = useInView(titleRef, { once: true, margin: '-60px' });
    const textInView = useInView(textRef, { once: true, margin: '-60px' });
    const statsInView = useInView(statsRef, { once: true, margin: '-60px' });

    const cards = [
        { icon: HiCode, title: 'Who I Am', content: aboutData.intro },
        { icon: HiLightningBolt, title: 'My Goal', content: aboutData.objective },
    ];

    return (
        <section id="about" className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="section-container relative z-10">
                <motion.div
                    ref={titleRef}
                    initial={{ opacity: 0, y: 40 }}
                    animate={titleInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h2 className="section-title">
                        About <span className="gradient-text">Me</span>
                    </h2>
                    <p className="section-subtitle">Get to know who I am and what drives me</p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left — Text cards */}
                    <div ref={textRef} className="space-y-6">
                        {cards.map((card, i) => (
                            <motion.div
                                key={card.title}
                                initial={{ opacity: 0, x: -60 }}
                                animate={textInView ? { opacity: 1, x: 0 } : {}}
                                transition={{
                                    duration: 0.6,
                                    delay: i * 0.2,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                whileHover={{ x: 6, transition: { duration: 0.2 } }}
                                className="glass-card p-6 md:p-8"
                            >
                                <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-3 flex items-center gap-2">
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={textInView ? { scale: 1 } : {}}
                                        transition={{ delay: i * 0.2 + 0.3, type: 'spring', stiffness: 300 }}
                                        className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center"
                                    >
                                        <card.icon className="text-primary-500" size={18} />
                                    </motion.span>
                                    {card.title}
                                </h3>
                                <p className="text-dark-600 dark:text-dark-300 leading-relaxed">
                                    {card.content}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right — Stats grid with counters */}
                    <div ref={statsRef}>
                        <div className="grid grid-cols-2 gap-4 w-full">
                            {aboutData.highlights.map((item, i) => (
                                <CounterCard key={item.label} item={item} index={i} inView={statsInView} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
