import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiExternalLink, FiGithub, FiFolder } from 'react-icons/fi';
import { projects } from '../data/portfolioData';

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

function ProjectCard({ project, index }) {
    return (
        <AnimatedSection delay={index * 0.08}>
            <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="glass-card h-full flex flex-col overflow-hidden group"
            >
                {/* Top color bar */}
                <div className="h-1 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600" />

                <div className="p-6 flex flex-col flex-1">
                    {/* Header — icon + links */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-11 h-11 rounded-xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center">
                            <FiFolder className="text-primary-500" size={22} />
                        </div>
                        <div className="flex items-center gap-3">
                            {project.githubUrl && project.githubUrl !== '#' && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-dark-400 hover:text-primary-500 transition-colors"
                                    aria-label="View Project"
                                >
                                    <FiExternalLink size={20} />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-2 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                        {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-dark-500 dark:text-dark-400 leading-relaxed mb-4 flex-1">
                        {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-dark-100 dark:border-dark-800">
                        {project.tech.map((tech) => (
                            <span
                                key={tech}
                                className="text-xs font-medium px-2.5 py-1 rounded-md bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 border border-primary-100 dark:border-primary-900/50"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </AnimatedSection>
    );
}

export default function Projects() {
    return (
        <section id="projects" className="relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="section-container relative z-10">
                <AnimatedSection>
                    <h2 className="section-title">
                        My <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="section-subtitle">
                        A selection of my recent work — from full-stack apps to APIs and beyond
                    </p>
                </AnimatedSection>

                {/* Project grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, i) => (
                        <ProjectCard key={project.title} project={project} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
