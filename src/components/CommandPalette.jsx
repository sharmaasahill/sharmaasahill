import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FiArrowDown, FiArrowUpRight, FiCopy, FiCornerDownLeft, FiHash } from 'react-icons/fi';
import { builds, links, nav, site } from '../data/portfolioData';

/*
 * Ctrl/⌘ K: jump to a section, open a build, grab the résumé or copy the email.
 * Listbox pattern: focus stays in the input, arrow keys move aria-activedescendant.
 */

const BACKGROUND = ['topbar', 'main', 'site-footer', 'section-nav'];

function download(href, fileName) {
  const a = document.createElement('a');
  a.href = href;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function buildCommands(onCopied) {
  const sections = nav.map((item, i) => ({
    id: `go-${item.id}`,
    group: 'Sections',
    label: item.label,
    hint: `${String(i).padStart(2, '0')} · ${item.hint}`,
    icon: 'hash',
    run: () => {
      document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `#${item.id}`);
    },
  }));

  const projectCommands = builds.flatMap((b) => [
    ...(b.live
      ? [{ id: `live-${b.slug}`, group: 'Builds', label: `${b.name}: live demo`, hint: b.live.replace('https://', ''), icon: 'out', href: b.live }]
      : []),
    { id: `code-${b.slug}`, group: 'Builds', label: `${b.name}: source`, hint: 'github.com', icon: 'out', href: b.repo },
  ]);

  const elsewhere = [
    {
      id: 'resume',
      group: 'Elsewhere',
      label: `Download ${site.resume.label}`,
      hint: 'PDF',
      icon: 'down',
      run: () => download(site.resume.href, site.resume.fileName),
    },
    {
      id: 'copy-email',
      group: 'Elsewhere',
      label: 'Copy email address',
      hint: links.email,
      icon: 'copy',
      keepOpen: true,
      run: async () => {
        try {
          await navigator.clipboard.writeText(links.email);
          onCopied('Email copied to the clipboard.');
        } catch {
          onCopied(`Copy failed. The address is ${links.email}`);
        }
      },
    },
    { id: 'github', group: 'Elsewhere', label: 'GitHub profile', hint: 'github.com/sharmaasahill', icon: 'out', href: links.github },
    { id: 'linkedin', group: 'Elsewhere', label: 'LinkedIn', hint: 'in/sharmaasahill', icon: 'out', href: links.linkedin },
    { id: 'whatsapp', group: 'Elsewhere', label: 'WhatsApp', hint: '+91 85219 00395', icon: 'out', href: links.whatsapp },
  ];

  return [...sections, ...projectCommands, ...elsewhere];
}

const ICONS = { hash: FiHash, out: FiArrowUpRight, down: FiArrowDown, copy: FiCopy };

function score(command, terms) {
  if (!terms.length) return 1;
  const label = command.label.toLowerCase();
  const hay = `${label} ${command.hint.toLowerCase()} ${command.group.toLowerCase()}`;
  let total = 0;
  for (const term of terms) {
    if (!hay.includes(term)) return 0;
    total += label.startsWith(term) ? 3 : label.includes(term) ? 2 : 1;
  }
  return total;
}

// Mounted only while open, so every opening starts with a fresh query.
export default function CommandPalette({ onClose }) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [notice, setNotice] = useState('');
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const listId = useId();

  const commands = useMemo(() => buildCommands(setNotice), []);
  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    return commands
      .map((c, i) => ({ c, s: score(c, terms), i }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s || a.i - b.i)
      .map((r) => r.c);
  }, [commands, query]);

  // Results grouped in display order, with a flat index for keyboard movement.
  const groups = useMemo(() => {
    const order = [];
    const byGroup = new Map();
    results.forEach((c, flat) => {
      if (!byGroup.has(c.group)) {
        byGroup.set(c.group, []);
        order.push(c.group);
      }
      byGroup.get(c.group).push({ c, flat });
    });
    return order.map((g) => ({ name: g, items: byGroup.get(g) }));
  }, [results]);

  // While open: lock scroll, make the page inert, and give focus back on close.
  useEffect(() => {
    const returnTo = document.activeElement;
    const root = document.documentElement;
    const behind = BACKGROUND.map((id) => document.getElementById(id)).filter(Boolean);
    root.style.overflow = 'hidden';
    behind.forEach((el) => el.setAttribute('inert', ''));
    inputRef.current?.focus();
    return () => {
      root.style.overflow = '';
      behind.forEach((el) => el.removeAttribute('inert'));
      if (returnTo instanceof HTMLElement) returnTo.focus({ preventScroll: true });
    };
  }, []);

  // Keep the highlighted option in view.
  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [active, results]);

  const runCommand = (command) => {
    if (!command) return;
    if (command.href) {
      window.open(command.href, '_blank', 'noopener,noreferrer');
      onClose();
    } else if (command.keepOpen) {
      command.run?.();
    } else {
      // Close first so the page is scrollable again, then act on the next frame.
      onClose();
      requestAnimationFrame(() => command.run?.());
    }
  };

  const onKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (event.key === 'Home') {
      event.preventDefault();
      setActive(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      setActive(Math.max(0, results.length - 1));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      runCommand(results[active]);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
    } else if (event.key === 'Tab') {
      event.preventDefault(); // the input is the only stop inside the dialog
    }
  };

  const optionId = (flat) => `${listId}-opt-${flat}`;

  return createPortal(
    <div className="palette" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="palette__panel" role="dialog" aria-modal="true" aria-label="Jump to a section, build or link">
        <div className="palette__search">
          <span className="palette__prompt" aria-hidden="true">
            &gt;
          </span>
          <input
            ref={inputRef}
            className="palette__input"
            type="text"
            value={query}
            placeholder="Type a section, a build or a link"
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={results.length ? optionId(active) : undefined}
            autoComplete="off"
            spellCheck="false"
          />
          <kbd className="palette__esc">esc</kbd>
        </div>

        <div ref={listRef} id={listId} className="palette__list" role="listbox" aria-label="Commands">
          {groups.map((group) => (
            <div key={group.name} role="group" aria-labelledby={`${listId}-${group.name}`}>
              <p id={`${listId}-${group.name}`} className="palette__group" role="presentation">
                {group.name}
              </p>
              {group.items.map(({ c, flat }) => {
                const Icon = ICONS[c.icon] || FiHash;
                return (
                  <div
                    key={c.id}
                    id={optionId(flat)}
                    role="option"
                    aria-selected={flat === active}
                    className="palette__option"
                    onMouseMove={() => flat !== active && setActive(flat)}
                    onClick={() => runCommand(c)}
                  >
                    <Icon aria-hidden="true" />
                    <span className="palette__label">{c.label}</span>
                    <span className="palette__hint">{c.hint}</span>
                    <FiCornerDownLeft className="palette__enter" aria-hidden="true" />
                  </div>
                );
              })}
            </div>
          ))}
          {!results.length && <p className="palette__empty">Nothing matches “{query}”. Try “builds” or “email”.</p>}
        </div>

        <div className="palette__foot">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> move
          </span>
          <span>
            <kbd>↵</kbd> run
          </span>
          <span className="palette__notice" role="status" aria-live="polite">
            {notice}
          </span>
        </div>
      </div>
    </div>,
    document.body
  );
}
