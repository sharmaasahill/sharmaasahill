import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { skillCategories } from '../data/portfolioData';

function AnimatedSection({ children, className = '', delay = 0 }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default function Skills() {
    return (
        <section id="skills" className="relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="section-container relative z-10">
                <AnimatedSection>
                    <h2 className="section-title">
                        My <span className="gradient-text">Skills</span>
                    </h2>
                    <p className="section-subtitle">Technologies and tools I work with</p>
                </AnimatedSection>

                <div className="grid md:grid-cols-2 gap-6">
                    {skillCategories.map((category, catIdx) => (
                        <AnimatedSection key={category.title} delay={catIdx * 0.1}>
                            <div className="glass-card p-6 md:p-8 h-full">
                                {/* Category header */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center">
                                        <span className="text-lg font-bold gradient-text">{category.title.charAt(0)}</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-dark-900 dark:text-white">{category.title}</h3>
                                    <div className="flex-1 h-px bg-dark-200 dark:bg-dark-700 ml-2" />
                                </div>

                                {/* Skills grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {category.skills.map((skill, skillIdx) => (
                                        <motion.div
                                            key={skill.name}
                                            whileHover={{ y: -3, scale: 1.03 }}
                                            transition={{ duration: 0.2 }}
                                            className="flex items-center gap-3 p-3 rounded-xl bg-dark-50 dark:bg-dark-900/50 border border-dark-100 dark:border-dark-800 hover:border-primary-300 dark:hover:border-primary-700 transition-colors group cursor-default"
                                        >
                                            <skill.icon
                                                size={22}
                                                style={{ color: skill.color }}
                                                className="flex-shrink-0 group-hover:scale-110 transition-transform"
                                            />
                                            <span className="text-sm font-medium text-dark-700 dark:text-dark-300 truncate">
                                                {skill.name}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
