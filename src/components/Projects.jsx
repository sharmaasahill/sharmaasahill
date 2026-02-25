import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiExternalLink, FiFolder } from 'react-icons/fi';
import { projects } from '../data/portfolioData';

function ProjectCard({ project, index, inView }) {
    // Alternate animation direction
    const directions = [
        { x: -40, y: 20 },
        { x: 0, y: 40 },
        { x: 40, y: 20 },
    ];
    const dir = directions[index % 3];

    return (
        <motion.div
            initial={{ opacity: 0, x: dir.x, y: dir.y, scale: 0.9 }}
            animate={inView ? { opacity: 1, x: 0, y: 0, scale: 1 } : {}}
            transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25 } }}
            className="glass-card h-full flex flex-col overflow-hidden group"
        >
            {/* Animated gradient bar */}
            <motion.div
                className="h-1 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600"
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
                style={{ transformOrigin: 'left' }}
            />

            <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4">
                    <motion.div
                        initial={{ rotate: -45, scale: 0 }}
                        animate={inView ? { rotate: 0, scale: 1 } : {}}
                        transition={{ delay: index * 0.1 + 0.2, type: 'spring', stiffness: 200 }}
                        className="w-11 h-11 rounded-xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center group-hover:bg-primary-500 transition-colors duration-300"
                    >
                        <FiFolder className="text-primary-500 group-hover:text-white transition-colors duration-300" size={22} />
                    </motion.div>
                    <div className="flex items-center gap-3">
                        {project.githubUrl && project.githubUrl !== '#' && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-dark-400 hover:text-primary-500 transition-colors hover:scale-110"
                                aria-label="View Project"
                            >
                                <FiExternalLink size={20} />
                            </a>
                        )}
                    </div>
                </div>

                <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-2 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                    {project.title}
                </h3>

                <p className="text-sm text-dark-500 dark:text-dark-400 leading-relaxed mb-4 flex-1">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-dark-100 dark:border-dark-800">
                    {project.tech.map((tech, ti) => (
                        <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: index * 0.1 + ti * 0.04 + 0.4 }}
                            className="text-xs font-medium px-2.5 py-1 rounded-md bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 border border-primary-100 dark:border-primary-900/50"
                        >
                            {tech}
                        </motion.span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default function Projects() {
    const titleRef = useRef(null);
    const gridRef = useRef(null);
    const titleInView = useInView(titleRef, { once: true, margin: '-60px' });
    const gridInView = useInView(gridRef, { once: true, margin: '-60px' });

    return (
        <section id="projects" className="relative overflow-hidden">
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="section-container relative z-10">
                <motion.div
                    ref={titleRef}
                    initial={{ opacity: 0, y: 40 }}
                    animate={titleInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h2 className="section-title">
                        My <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="section-subtitle">
                        A selection of my recent work, from full-stack apps to APIs and beyond
                    </p>
                </motion.div>

                <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, i) => (
                        <ProjectCard key={project.title} project={project} index={i} inView={gridInView} />
                    ))}
                </div>
            </div>
        </section>
    );
}
