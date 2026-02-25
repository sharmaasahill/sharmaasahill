import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { services } from '../data/portfolioData';

export default function Services() {
    const titleRef = useRef(null);
    const gridRef = useRef(null);
    const titleInView = useInView(titleRef, { once: true, margin: '-60px' });
    const gridInView = useInView(gridRef, { once: true, margin: '-60px' });

    return (
        <section id="services" className="relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="section-container relative z-10">
                <motion.div
                    ref={titleRef}
                    initial={{ opacity: 0, y: 40 }}
                    animate={titleInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h2 className="section-title">
                        What I <span className="gradient-text">Offer</span>
                    </h2>
                    <p className="section-subtitle">Services tailored for startups, businesses, and entrepreneurs</p>
                </motion.div>

                <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {services.map((service, i) => {
                        const Icon = service.icon;
                        return (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 50, scale: 0.85 }}
                                animate={gridInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                                transition={{
                                    duration: 0.5,
                                    delay: i * 0.12,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                whileHover={{
                                    y: -8,
                                    scale: 1.03,
                                    transition: { duration: 0.25 },
                                }}
                                className="glass-card p-8 text-center h-full group cursor-default relative overflow-hidden"
                            >
                                {/* Subtle shimmer on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 via-primary-500/0 to-primary-500/0 group-hover:from-primary-500/5 group-hover:via-primary-500/0 group-hover:to-primary-500/5 transition-all duration-500" />

                                <div className="relative z-10">
                                    <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={gridInView ? { scale: 1, rotate: 0 } : {}}
                                        transition={{ delay: i * 0.12 + 0.2, type: 'spring', stiffness: 180, damping: 12 }}
                                        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/50 group-hover:scale-110 transition-all duration-300"
                                    >
                                        <Icon className="text-white" size={28} />
                                    </motion.div>

                                    <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-3">
                                        {service.title}
                                    </h3>

                                    <p className="text-sm text-dark-500 dark:text-dark-400 leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
