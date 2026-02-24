import { FaGithub, FaLinkedin, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { HiMail, HiLocationMarker, HiPhone } from 'react-icons/hi';
import { contactInfo } from '../data/portfolioData';

const socials = [
    { icon: FaGithub, url: 'https://github.com/sharmaasahill', label: 'GitHub' },
    { icon: FaLinkedin, url: 'https://www.linkedin.com/in/sharmaasahill/', label: 'LinkedIn' },
    { icon: FaWhatsapp, url: 'https://api.whatsapp.com/qr/DJRKRNUD3AXCB1?autoload=1&app_absent=0', label: 'WhatsApp' },
    { icon: FaInstagram, url: 'https://www.instagram.com/sharmaasahill/', label: 'Instagram' },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-dark-200 dark:border-dark-800 bg-white/50 dark:bg-dark-950/50 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-6 py-10">
                {/* Top row */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                    {/* Logo */}
                    <a href="#hero" className="text-xl font-bold select-none">
                        <span className="gradient-text">sharma</span>
                        <span className="text-dark-900 dark:text-white">asahill</span>
                    </a>

                    {/* Contact info */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 text-sm text-dark-500 dark:text-dark-400">
                        <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 hover:text-primary-500 transition-colors">
                            <HiMail className="text-primary-500" size={16} />
                            {contactInfo.email}
                        </a>
                        <a href="tel:+918521900395" className="flex items-center gap-2 hover:text-primary-500 transition-colors">
                            <HiPhone className="text-primary-500" size={16} />
                            +91 8521900395
                        </a>
                        <span className="flex items-center gap-2">
                            <HiLocationMarker className="text-primary-500" size={16} />
                            Chennai, Tamil Nadu, India
                        </span>
                    </div>

                    {/* Social icons */}
                    <div className="flex items-center gap-3">
                        {socials.map((s) => {
                            const Icon = s.icon;
                            return (
                                <a
                                    key={s.label}
                                    href={s.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-lg bg-dark-100 dark:bg-dark-800 flex items-center justify-center text-dark-400 hover:bg-primary-500 hover:text-white transition-all duration-300"
                                    aria-label={s.label}
                                >
                                    <Icon size={16} />
                                </a>
                            );
                        })}
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-dark-200 dark:bg-dark-800 mb-6" />

                {/* Bottom row */}
                <div className="text-center text-xs text-dark-400">
                    <p>© {year} Sahil Sharma. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
