import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { skillCategories } from '../data/portfolioData';

export default function Skills() {
    const titleRef = useRef(null);
    const gridRef = useRef(null);
    const titleInView = useInView(titleRef, { once: true, margin: '-60px' });
    const gridInView = useInView(gridRef, { once: true, margin: '-60px' });

    return (
        <section id="skills" className="relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="section-container relative z-10">
                <motion.div
                    ref={titleRef}
                    initial={{ opacity: 0, y: 40 }}
                    animate={titleInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h2 className="section-title">
                        My <span className="gradient-text">Skills</span>
                    </h2>
                    <p className="section-subtitle">Technologies and tools I work with</p>
                </motion.div>

                <div ref={gridRef} className="grid md:grid-cols-2 gap-6">
                    {skillCategories.map((category, catIdx) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, x: catIdx % 2 === 0 ? -50 : 50 }}
                            animate={gridInView ? { opacity: 1, x: 0 } : {}}
                            transition={{
                                duration: 0.6,
                                delay: catIdx * 0.15,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            <div className="glass-card p-6 md:p-8 h-full">
                                <div className="flex items-center gap-3 mb-6">
                                    <motion.div
                                        initial={{ scale: 0, rotate: -90 }}
                                        animate={gridInView ? { scale: 1, rotate: 0 } : {}}
                                        transition={{ delay: catIdx * 0.15 + 0.3, type: 'spring', stiffness: 200 }}
                                        className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center"
                                    >
                                        <span className="text-lg font-bold gradient-text">{category.title.charAt(0)}</span>
                                    </motion.div>
                                    <h3 className="text-lg font-semibold text-dark-900 dark:text-white">{category.title}</h3>
                                    <div className="flex-1 h-px bg-dark-200 dark:bg-dark-700 ml-2" />
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {category.skills.map((skill, skillIdx) => (
                                        <motion.div
                                            key={skill.name}
                                            initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                            animate={gridInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                                            transition={{
                                                duration: 0.4,
                                                delay: catIdx * 0.15 + skillIdx * 0.05 + 0.3,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                            whileHover={{ y: -4, scale: 1.06, transition: { duration: 0.2 } }}
                                            className="flex items-center gap-3 p-3 rounded-xl bg-dark-50 dark:bg-dark-900/50 border border-dark-100 dark:border-dark-800 hover:border-primary-400 dark:hover:border-primary-600 hover:shadow-md hover:shadow-primary-500/10 transition-all group cursor-default"
                                        >
                                            <skill.icon
                                                size={22}
                                                style={{ color: skill.color }}
                                                className="flex-shrink-0 group-hover:scale-125 transition-transform duration-300"
                                            />
                                            <span className="text-sm font-medium text-dark-700 dark:text-dark-300 truncate">
                                                {skill.name}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
