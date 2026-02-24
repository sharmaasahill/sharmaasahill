import { useState, useEffect } from 'react';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const { darkMode, toggleDarkMode } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close mobile nav on link click
    const handleLinkClick = () => setMobileOpen(false);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-white/80 dark:bg-dark-950/80 backdrop-blur-xl shadow-lg shadow-dark-900/5 dark:shadow-dark-950/30'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <a
                        href="#hero"
                        className="text-xl md:text-2xl font-bold cursor-pointer select-none"
                    >
                        <span className="gradient-text">sharma</span>
                        <span className="text-dark-900 dark:text-white">asahill</span>
                    </a>

                    {/* Desktop nav links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="px-3 py-2 text-sm font-medium text-dark-600 dark:text-dark-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors rounded-lg hover:bg-dark-100/50 dark:hover:bg-dark-800/50"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Right side: theme toggle + hamburger */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleDarkMode}
                            aria-label="Toggle dark mode"
                            className="p-2.5 rounded-xl bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-dark-200 dark:hover:bg-dark-700 transition-colors"
                        >
                            {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
                        </button>

                        {/* Hamburger */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Toggle menu"
                            className="md:hidden p-2.5 rounded-xl bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-dark-200 dark:hover:bg-dark-700 transition-colors"
                        >
                            {mobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden bg-white/95 dark:bg-dark-950/95 backdrop-blur-xl border-t border-dark-200 dark:border-dark-800">
                    <div className="px-4 py-3 space-y-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={handleLinkClick}
                                className="block px-4 py-2.5 text-sm font-medium text-dark-600 dark:text-dark-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-dark-100/50 dark:hover:bg-dark-800/50 rounded-lg transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
