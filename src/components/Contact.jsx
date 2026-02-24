import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiSend } from 'react-icons/fi';

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

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_key: import.meta.env.VITE_WEB3FORMS_KEY,
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                }),
            });

            const result = await response.json();

            if (result.success) {
                setSubmitted(true);
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setSubmitted(false), 4000);
            } else {
                setError('Something went wrong. Please try again.');
            }
        } catch (err) {
            setError('Failed to send. Check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    const inputClasses = 'w-full px-4 py-3 rounded-xl bg-dark-50 dark:bg-dark-900/50 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white placeholder-dark-400 dark:placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm';

    return (
        <section id="contact" className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="section-container relative z-10">
                <AnimatedSection>
                    <h2 className="section-title">
                        Let's <span className="gradient-text">Work Together</span>
                    </h2>
                    <p className="section-subtitle">Have a project idea or need a developer? Drop me a message and let's discuss how I can help</p>
                </AnimatedSection>

                <AnimatedSection delay={0.1}>
                    <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-4 max-w-2xl mx-auto">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className={inputClasses}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className={inputClasses}
                            />
                        </div>
                        <input
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className={inputClasses}
                        />
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            className={`${inputClasses} resize-none`}
                        />
                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center py-6 space-y-2"
                            >
                                <div className="text-3xl">✔️</div>
                                <p className="text-lg font-semibold text-dark-900 dark:text-white">Message sent successfully!</p>
                                <p className="text-sm text-dark-500 dark:text-dark-400">Thanks for reaching out. I'll get back to you shortly.</p>
                            </motion.div>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>Sending...</>
                                ) : (
                                    <>
                                        <FiSend size={16} />
                                        Start a Conversation
                                    </>
                                )}
                            </motion.button>
                        )}
                        {error && (
                            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
                        )}
                    </form>
                </AnimatedSection>
            </div>
        </section >
    );
}
