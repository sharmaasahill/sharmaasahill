/*
 * The decorative loops (status pings, the wordmark caret, the hero packets) run forever, and
 * even when they're scrolled out of view each tick makes the browser restyle them on the main
 * thread. This marks each region `data-offscreen` while none of it is visible, and CSS pauses
 * every animation inside it ("Motion" in index.css).
 */
export function pauseOffscreen(selectors) {
  const regions = selectors.map((s) => document.querySelector(s)).filter(Boolean);
  if (!regions.length || !('IntersectionObserver' in window)) return () => {};

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) entry.target.toggleAttribute('data-offscreen', !entry.isIntersecting);
  });
  regions.forEach((region) => observer.observe(region));
  return () => observer.disconnect();
}
