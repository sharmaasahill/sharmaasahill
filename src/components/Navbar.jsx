import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  FiArrowDown,
  FiArrowUpRight,
  FiAward,
  FiBriefcase,
  FiCommand,
  FiGitBranch,
  FiMail,
  FiTerminal,
  FiUser,
} from 'react-icons/fi';
import { cta, links, nav, site } from '../data/portfolioData';
import useActiveSection from '../hooks/useActiveSection';
import CommandPalette from './CommandPalette';
import ThemeToggle from './ThemeToggle';

const ICONS = {
  terminal: FiTerminal,
  user: FiUser,
  briefcase: FiBriefcase,
  branch: FiGitBranch,
  award: FiAward,
  mail: FiMail,
};
const SECTION_IDS = nav.map((item) => item.id);
// Everything behind the mobile menu that should be unreachable while it is open.
const BACKGROUND = ['topbar', 'main', 'site-footer'];
const IS_MAC = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/i.test(navigator.userAgent);
const SHORTCUT = IS_MAC ? '⌘K' : 'Ctrl K';

export default function Navbar() {
  const active = useActiveSection(SECTION_IDS);
  const [open, setOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const toggleRef = useRef(null);
  const firstLinkRef = useRef(null);
  const closedByLink = useRef(false);

  // Slide the highlight under whichever section is current.
  useLayoutEffect(() => {
    const navEl = navRef.current;
    const indicator = indicatorRef.current;
    if (!navEl || !indicator) return undefined;

    const place = () => {
      const link = navEl.querySelector(`[data-id="${active}"]`);
      if (!link) return;
      indicator.style.width = `${link.offsetWidth}px`;
      indicator.style.transform = `translateX(${link.offsetLeft}px)`;
    };
    place();
    document.fonts?.ready.then(place);
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [active]);

  // Ctrl/⌘ K opens the palette from anywhere, and toggles it closed again.
  useEffect(() => {
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen((value) => !value);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Mobile menu: lock scroll, make the page behind it inert, handle Escape and focus.
  useEffect(() => {
    if (!open) return undefined;
    const root = document.documentElement;
    const behind = BACKGROUND.map((id) => document.getElementById(id)).filter(Boolean);
    const toggle = toggleRef.current;

    root.style.overflow = 'hidden';
    behind.forEach((el) => el.setAttribute('inert', ''));
    firstLinkRef.current?.focus();

    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);

    // The toggle only exists below 1100px; widening the window must not strand the menu open.
    const desktop = window.matchMedia('(min-width: 1100px)');
    const onWiden = (event) => {
      if (event.matches) setOpen(false);
    };
    desktop.addEventListener('change', onWiden);

    return () => {
      root.style.overflow = '';
      behind.forEach((el) => el.removeAttribute('inert'));
      window.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onWiden);
      // After jumping to a section, let focus follow the link instead of the button.
      if (!closedByLink.current) toggle?.focus();
      closedByLink.current = false;
    };
  }, [open]);

  const closeFromLink = () => {
    closedByLink.current = true;
    setOpen(false);
  };

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <div id="topbar" className="topbar">
        <a href="#intro" className="wordmark" aria-label={`${site.handle}, back to the top`}>
          {site.handle}
          <span aria-hidden="true">_</span>
        </a>
        <div className="topbar__actions">
          <a className="topbar__link topbar__link--resume" href={site.resume.href} download={site.resume.fileName}>
            {site.resume.label} <FiArrowDown aria-hidden="true" />
          </a>
          <a className="topbar__link topbar__link--hire" href="#contact-form">
            <span className="status-dot" aria-hidden="true" />
            {cta.request} <FiArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>

      <nav id="section-nav" ref={navRef} className="nav" aria-label="Sections">
        <span ref={indicatorRef} className="nav__indicator" aria-hidden="true" />
        {nav.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <Fragment key={item.id}>
              {item.separated && <span className="nav__sep" aria-hidden="true" />}
              <a
                href={`#${item.id}`}
                data-id={item.id}
                className="nav__link"
                title={item.hint}
                aria-current={active === item.id ? 'true' : undefined}
              >
                <Icon aria-hidden="true" />
                <span>{item.label}</span>
              </a>
            </Fragment>
          );
        })}
        <button
          type="button"
          className="nav__palette"
          onClick={() => setPaletteOpen(true)}
          aria-haspopup="dialog"
          aria-keyshortcuts={IS_MAC ? 'Meta+K' : 'Control+K'}
          title={`${cta.palette} a section, build or link`}
        >
          <FiCommand aria-hidden="true" />
          <span className="sr-only">{cta.palette} a section, build or link</span>
          <kbd aria-hidden="true">{SHORTCUT}</kbd>
        </button>
        <ThemeToggle className="theme-toggle--nav" />
      </nav>

      {/* Below 1100px the pill is replaced by the menu, so the toggle floats beside it. */}
      <ThemeToggle className="theme-toggle--float" />

      <button
        ref={toggleRef}
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? 'Close' : 'Index'}
        <span className="menu-toggle__icon" aria-hidden="true" />
      </button>

      <div id="site-menu" className={`menu${open ? ' is-open' : ''}`} inert={!open}>
        <nav aria-label="Sections">
          <ul className="menu__list">
            {nav.map((item, i) => (
              <li key={item.id}>
                <a
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={`#${item.id}`}
                  className="menu__link"
                  style={{ transitionDelay: open ? `${90 + i * 45}ms` : '0ms' }}
                  aria-current={active === item.id ? 'true' : undefined}
                  onClick={closeFromLink}
                >
                  <small>{String(i).padStart(2, '0')}</small>
                  <span className="menu__label">
                    {item.label}
                    <em>{item.hint}</em>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#contact-form" className="btn btn--primary menu__cta" onClick={closeFromLink}>
          {cta.request} <FiArrowUpRight aria-hidden="true" />
        </a>
        <div className="menu__foot">
          <a href={site.resume.href} download={site.resume.fileName}>
            {site.resume.label} ↓
          </a>
          <a href={links.github} target="_blank" rel="noreferrer">
            GitHub <FiArrowUpRight aria-hidden="true" style={{ display: 'inline', width: 12 }} />
          </a>
          <a href={links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn <FiArrowUpRight aria-hidden="true" style={{ display: 'inline', width: 12 }} />
          </a>
          <a href={`mailto:${links.email}`}>{links.email}</a>
        </div>
      </div>

      {paletteOpen && <CommandPalette onClose={() => setPaletteOpen(false)} />}
    </>
  );
}
