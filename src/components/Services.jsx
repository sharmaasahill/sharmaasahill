import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { services } from '../data/portfolioData';

function AnimatedSection({ children, className = '', delay = 0 }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut', delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default function Services() {
    return (
        <section id="services" className="relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="section-container relative z-10">
                <AnimatedSection>
                    <h2 className="section-title">
                        What I <span className="gradient-text">Offer</span>
                    </h2>
                    <p className="section-subtitle">Services tailored for startups, businesses, and entrepreneurs</p>
                </AnimatedSection>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {services.map((service, i) => {
                        const Icon = service.icon;
                        return (
                            <AnimatedSection key={service.title} delay={i * 0.12}>
                                <motion.div
                                    whileHover={{ y: -6 }}
                                    transition={{ duration: 0.25 }}
                                    className="glass-card p-8 text-center h-full group cursor-default"
                                >
                                    {/* Icon */}
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/40 transition-shadow">
                                        <Icon className="text-white" size={28} />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-3">
                                        {service.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm text-dark-500 dark:text-dark-400 leading-relaxed">
                                        {service.description}
                                    </p>
                                </motion.div>
                            </AnimatedSection>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
