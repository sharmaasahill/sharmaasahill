import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { HiBriefcase, HiLocationMarker } from 'react-icons/hi';
import { experiences } from '../data/portfolioData';

export default function Experience() {
    const titleRef = useRef(null);
    const timelineRef = useRef(null);
    const titleInView = useInView(titleRef, { once: true, margin: '-60px' });
    const timelineInView = useInView(timelineRef, { once: true, margin: '-60px' });

    return (
        <section id="experience" className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="section-container relative z-10">
                <motion.div
                    ref={titleRef}
                    initial={{ opacity: 0, y: 40 }}
                    animate={titleInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h2 className="section-title">
                        My <span className="gradient-text">Experience</span>
                    </h2>
                    <p className="section-subtitle">My professional journey so far</p>
                </motion.div>

                <div ref={timelineRef} className="relative max-w-4xl mx-auto">
                    {/* Animated vertical line */}
                    <motion.div
                        className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500 via-primary-400 to-transparent md:-translate-x-px"
                        initial={{ scaleY: 0 }}
                        animate={timelineInView ? { scaleY: 1 } : {}}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        style={{ transformOrigin: 'top' }}
                    />

                    {experiences.map((exp, i) => {
                        const isLeft = i % 2 === 0;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                                animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                                transition={{
                                    duration: 0.6,
                                    delay: i * 0.2 + 0.3,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >
                                <div className={`relative flex items-start gap-6 md:gap-0 mb-10 last:mb-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                    {/* Animated timeline dot */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={timelineInView ? { scale: 1 } : {}}
                                        transition={{ delay: i * 0.2 + 0.5, type: 'spring', stiffness: 300 }}
                                        className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary-500 ring-4 ring-primary-100 dark:ring-primary-950 -translate-x-1.5 md:-translate-x-1.5 mt-6 z-10"
                                    />

                                    <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-0 md:mr-auto' : 'md:pl-0 md:ml-auto'}`}>
                                        <motion.div
                                            whileHover={{ y: -4, scale: 1.01, transition: { duration: 0.2 } }}
                                            className="glass-card p-5 md:p-6"
                                        >
                                            <motion.span
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                                                transition={{ delay: i * 0.2 + 0.5 }}
                                                className="inline-block text-xs font-semibold px-2.5 py-1 rounded-md bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 border border-primary-100 dark:border-primary-900/50 mb-3"
                                            >
                                                {exp.type}
                                            </motion.span>

                                            <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-1">
                                                {exp.role}
                                            </h3>

                                            <div className="flex items-center gap-2 mb-2">
                                                <HiBriefcase className="text-primary-500 flex-shrink-0" size={16} />
                                                <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                                                    {exp.company}
                                                </span>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-dark-500 dark:text-dark-400 mb-3">
                                                <span>{exp.duration}</span>
                                                <span className="flex items-center gap-1">
                                                    <HiLocationMarker size={12} />
                                                    {exp.location}
                                                </span>
                                            </div>

                                            <p className="text-sm text-dark-600 dark:text-dark-300 leading-relaxed">
                                                {exp.description}
                                            </p>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
