import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animId;
        let particles = [];
        let mouse = { x: -999, y: -999 };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        // More particles, varied sizes
        const count = Math.min(80, Math.floor(window.innerWidth / 18));
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                size: Math.random() * 2.5 + 0.8,
                baseOpacity: Math.random() * 0.5 + 0.15,
                pulse: Math.random() * Math.PI * 2,
                hue: Math.random() * 40 - 20, // -20 to +20 offset from base hue
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const isDark = document.documentElement.classList.contains('dark');

            particles.forEach((p, i) => {
                // Mouse repulsion
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    const force = (150 - dist) / 150;
                    p.vx += (dx / dist) * force * 0.3;
                    p.vy += (dy / dist) * force * 0.3;
                }

                // Damping
                p.vx *= 0.98;
                p.vy *= 0.98;

                p.x += p.vx;
                p.y += p.vy;
                p.pulse += 0.015;

                // Wrap
                if (p.x < -10) p.x = canvas.width + 10;
                if (p.x > canvas.width + 10) p.x = -10;
                if (p.y < -10) p.y = canvas.height + 10;
                if (p.y > canvas.height + 10) p.y = -10;

                const glow = Math.sin(p.pulse) * 0.2 + p.baseOpacity;

                // Draw particle with hue variation
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                if (isDark) {
                    const hue = 263 + p.hue; // purple range
                    ctx.fillStyle = `hsla(${hue}, 70%, 60%, ${glow})`;
                    // Glow effect
                    ctx.shadowColor = `hsla(${hue}, 70%, 60%, ${glow * 0.5})`;
                    ctx.shadowBlur = 8;
                } else {
                    const hue = 240 + p.hue; // indigo range for light mode
                    ctx.fillStyle = `hsla(${hue}, 65%, 50%, ${glow * 0.7})`;
                    ctx.shadowColor = `hsla(${hue}, 65%, 50%, ${glow * 0.3})`;
                    ctx.shadowBlur = 6;
                }
                ctx.fill();
                ctx.shadowBlur = 0;

                // Connections
                particles.forEach((p2, j) => {
                    if (j <= i) return;
                    const cdx = p.x - p2.x;
                    const cdy = p.y - p2.y;
                    const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
                    if (cdist < 140) {
                        const lineOpacity = (1 - cdist / 140) * 0.18;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        if (isDark) {
                            ctx.strokeStyle = `rgba(139, 92, 246, ${lineOpacity})`;
                        } else {
                            ctx.strokeStyle = `rgba(99, 102, 241, ${lineOpacity * 0.8})`;
                        }
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                });
            });

            animId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
        />
    );
}
