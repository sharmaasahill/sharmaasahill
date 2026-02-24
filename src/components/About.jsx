import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { HiCode, HiLightningBolt, HiUsers, HiCollection } from 'react-icons/hi';
import { aboutData } from '../data/portfolioData';

const iconMap = [HiLightningBolt, HiCollection, HiCode, HiUsers];

function AnimatedSection({ children, className = '' }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default function About() {
    return (
        <section id="about" className="relative overflow-hidden">
            {/* Subtle background accent */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="section-container relative z-10">
                <AnimatedSection>
                    <h2 className="section-title">
                        About <span className="gradient-text">Me</span>
                    </h2>
                    <p className="section-subtitle">Get to know who I am and what drives me</p>
                </AnimatedSection>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left — Text */}
                    <AnimatedSection>
                        <div className="space-y-6">

                            <div className="glass-card p-6 md:p-8">
                                <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-3 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center">
                                        <HiCode className="text-primary-500" size={18} />
                                    </span>
                                    Who I Am
                                </h3>
                                <p className="text-dark-600 dark:text-dark-300 leading-relaxed">
                                    {aboutData.intro}
                                </p>
                            </div>

                            <div className="glass-card p-6 md:p-8">
                                <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-3 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center">
                                        <HiLightningBolt className="text-primary-500" size={18} />
                                    </span>
                                    My Goal
                                </h3>
                                <p className="text-dark-600 dark:text-dark-300 leading-relaxed">
                                    {aboutData.objective}
                                </p>
                            </div>
                        </div>
                    </AnimatedSection>

                    {/* Right — Profile pic + Stats */}
                    <AnimatedSection>
                        <div className="flex flex-col items-center gap-8">
                            {/* Stats grid */}
                            <div className="grid grid-cols-2 gap-4 w-full">
                                {aboutData.highlights.map((item, i) => {
                                    const Icon = iconMap[i];
                                    return (
                                        <motion.div
                                            key={item.label}
                                            whileHover={{ y: -4, scale: 1.02 }}
                                            transition={{ duration: 0.2 }}
                                            className="glass-card p-6 text-center group cursor-default"
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-500 transition-colors duration-300">
                                                <Icon className="text-primary-500 group-hover:text-white transition-colors duration-300" size={22} />
                                            </div>
                                            <p className="text-2xl md:text-3xl font-bold gradient-text mb-1">{item.value}</p>
                                            <p className="text-sm text-dark-500 dark:text-dark-400 font-medium">{item.label}</p>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
}
