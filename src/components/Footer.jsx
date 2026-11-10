import { FiArrowUp, FiArrowUpRight } from 'react-icons/fi';
import useMonth from '../hooks/useMonth';
import { footer, links, site } from '../data/portfolioData';

export default function Footer() {
  const year = Math.floor(useMonth() / 12);

  return (
    <footer id="site-footer" className="footer">
      <div className="rail">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="#intro" className="wordmark" aria-label={`${site.handle}, back to the top`}>
              {site.handle}
              <span aria-hidden="true">_</span>
            </a>
            <p className="footer__tagline">{footer.tagline}</p>
          </div>
          <a className="text-link" href={links.github} target="_blank" rel="noreferrer">
            {footer.github} <FiArrowUpRight aria-hidden="true" />
          </a>
        </div>

        <div className="footer__bottom">
          <span>
            © {year} {site.fullName}
          </span>
          <nav className="footer__links" aria-label="Elsewhere">
            <a href={site.resume.href} download={site.resume.fileName}>
              {site.resume.label}
            </a>
            <a href={links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={`mailto:${links.email}`}>Email</a>
            <a href={links.whatsapp} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </nav>
          <a className="footer__top-link" href="#intro">
            {footer.top} <FiArrowUp aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
