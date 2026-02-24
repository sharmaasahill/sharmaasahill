import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FiDownload, FiArrowRight } from 'react-icons/fi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { heroData, contactInfo } from '../data/portfolioData';

export default function Hero() {
    return (
        <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
            {/* Background gradient blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary-500/10 dark:bg-primary-500/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-primary-400/10 dark:bg-primary-400/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-300/5 dark:bg-primary-600/5 rounded-full blur-3xl" />
            </div>

            <div className="section-container relative z-10 w-full">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left — Text content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="order-2 lg:order-1 text-center lg:text-left"
                    >
                        {/* Greeting badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-950/50 border border-primary-200 dark:border-primary-800/50 mb-6"
                        >
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                                Available for freelance projects
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4"
                        >
                            <span className="text-dark-900 dark:text-white">{heroData.greeting}</span>
                            <br />
                            <span className="gradient-text">{heroData.name}</span>
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="flex items-center gap-3 justify-center lg:justify-start mb-6"
                        >
                            <div className="h-px w-8 bg-primary-500" />
                            <p className="text-lg md:text-xl font-semibold text-primary-500 dark:text-primary-400">
                                {heroData.title}
                            </p>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="text-base md:text-lg text-dark-500 dark:text-dark-400 max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed"
                        >
                            {heroData.tagline}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="flex flex-wrap items-center gap-4 justify-center lg:justify-start mb-8"
                        >
                            <Link
                                to="projects"
                                smooth
                                offset={-80}
                                duration={500}
                                className="btn-primary cursor-pointer"
                            >
                                See My Work <FiArrowRight />
                            </Link>

                            <a
                                href="/Sahil-Sharma-SDE.pdf"
                                download="Sahil-Sharma-SDE.pdf"
                                className="btn-outline"
                            >
                                <FiDownload /> Download Resume
                            </a>

                            <Link
                                to="contact"
                                smooth
                                offset={-80}
                                duration={500}
                                className="px-6 py-3 text-dark-600 dark:text-dark-300 font-medium hover:text-primary-500 dark:hover:text-primary-400 transition-colors cursor-pointer"
                            >
                                Let's Talk →
                            </Link>
                        </motion.div>

                        {/* Social links */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="flex items-center gap-4 justify-center lg:justify-start"
                        >
                            {contactInfo.socials.slice(0, 4).map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-xl bg-dark-100 dark:bg-dark-800 text-dark-500 dark:text-dark-400 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-dark-200 dark:hover:bg-dark-700 transition-all"
                                    aria-label={social.name}
                                >
                                    <social.icon size={20} />
                                </a>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right — Profile visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                        className="order-1 lg:order-2 flex justify-center"
                    >
                        <div className="relative">
                            {/* Outer glow ring */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-400 via-primary-500 to-primary-700 blur-2xl opacity-20 dark:opacity-30 scale-110 animate-glow" />

                            {/* Profile circle */}
                            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-primary-400 via-primary-500 to-primary-700 p-1 animate-float">
                                <div className="w-full h-full rounded-full bg-dark-50 dark:bg-dark-900 flex items-center justify-center overflow-hidden">
                                    {/* Initials as placeholder — replace with your image */}
                                    <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold gradient-text select-none">
                                        SS
                                    </span>
                                </div>
                            </div>

                            {/* Floating tech badges */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                className="absolute -top-2 -right-2 sm:top-2 sm:right-2 glass-card px-3 py-2 sm:px-4 sm:py-2.5"
                            >
                                <span className="text-xs sm:text-sm font-semibold text-dark-700 dark:text-dark-200 flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-[#61DAFB]"></span>React
                                </span>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                                className="absolute -bottom-2 -left-2 sm:bottom-4 sm:left-0 glass-card px-3 py-2 sm:px-4 sm:py-2.5"
                            >
                                <span className="text-xs sm:text-sm font-semibold text-dark-700 dark:text-dark-200 flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-[#339933]"></span>Node.js
                                </span>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                                className="absolute top-1/2 -left-8 sm:-left-16 glass-card px-3 py-2 sm:px-4 sm:py-2.5"
                            >
                                <span className="text-xs sm:text-sm font-semibold text-dark-700 dark:text-dark-200 flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-[#3776AB]"></span>Python
                                </span>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                                className="absolute top-6 -left-4 sm:top-8 sm:-left-10 glass-card px-3 py-2 sm:px-4 sm:py-2.5"
                            >
                                <span className="text-xs sm:text-sm font-semibold text-dark-700 dark:text-dark-200 flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-[#888888]"></span>Next.js
                                </span>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, -6, 0] }}
                                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                                className="absolute -bottom-4 right-4 sm:-bottom-2 sm:right-8 glass-card px-3 py-2 sm:px-4 sm:py-2.5"
                            >
                                <span className="text-xs sm:text-sm font-semibold text-dark-700 dark:text-dark-200 flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-[#3178C6]"></span>TypeScript
                                </span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <Link to="about" smooth offset={-80} duration={500} className="cursor-pointer">
                    <div className="w-6 h-10 rounded-full border-2 border-dark-300 dark:border-dark-600 flex justify-center pt-2">
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-1.5 h-1.5 rounded-full bg-primary-500"
                        />
                    </div>
                </Link>
            </motion.div>
        </section>
    );
}
