import { useState, useRef, useEffect } from 'react';
import { gsap } from '../lib/gsap';
import MagneticButton from './MagneticButton';
import { contactInfo } from '../data/portfolioData';
import { FiSend, FiMail } from 'react-icons/fi';

const CMDS = {
  help:     () => ['  Commands: email · linkedin · github · hire · clear'],
  email:    () => { window.open('mailto:i.sahilkrsharma@gmail.com'); return ['  Opening email…']; },
  linkedin: () => { window.open('https://www.linkedin.com/in/sharmaasahill/', '_blank'); return ['  Opening LinkedIn…']; },
  github:   () => { window.open('https://github.com/sharmaasahill', '_blank'); return ['  Opening GitHub…']; },
  hire:     () => ["  Let's build something. Fill the form or email directly."],
  whoami:   () => ['  Sahil Sharma — Full Stack Developer'],
  clear:    () => null,
};

function Terminal() {
  const [lines, setLines] = useState([{ type: 'sys', text: 'Type "help" to see commands.' }]);
  const [input, setInput] = useState('');
  const [hist, setHist] = useState([]);
  const [hi, setHi] = useState(-1);
  const outRef = useRef(null);
  const inRef  = useRef(null);

  useEffect(() => { if (outRef.current) outRef.current.scrollTop = outRef.current.scrollHeight; }, [lines]);

  const run = (cmd) => {
    const t = cmd.trim().toLowerCase();
    const next = [...lines, { type: 'in', text: t }];
    if (!t) { setLines(next); return; }
    if (t === 'clear') { setLines([{ type: 'sys', text: 'Cleared.' }]); }
    else if (CMDS[t]) { const out = CMDS[t](); setLines([...next, ...(out||[]).map(s=>({type:'out',text:s}))]); setHist(p=>[t,...p]); }
    else { setLines([...next, { type: 'err', text: `  Unknown: "${t}". Try "help".` }]); setHist(p=>[t,...p]); }
    setInput(''); setHi(-1);
  };

  const onKey = (e) => {
    if (e.key==='Enter')     run(input);
    if (e.key==='ArrowUp')   { e.preventDefault(); const i=Math.min(hi+1,hist.length-1); setHi(i); setInput(hist[i]||''); }
    if (e.key==='ArrowDown') { e.preventDefault(); const i=Math.max(hi-1,-1); setHi(i); setInput(hist[i]||''); }
  };

  return (
    <div className="rounded-2xl overflow-hidden glass" onClick={() => inRef.current?.focus()}>
      <div className="flex items-center gap-1.5 px-4 py-3" style={{ borderBottom: '1px solid var(--line)' }}>
        {['rgba(239,68,68,0.5)','rgba(234,179,8,0.5)','rgba(34,197,94,0.5)'].map((c,i) => (
          <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
        ))}
        <span className="mono text-xs ml-2" style={{ color: 'var(--text5)' }}>sahil@portfolio</span>
      </div>
      <div ref={outRef} className="h-44 overflow-y-auto p-4 space-y-1.5" style={{ scrollbarWidth: 'none' }}>
        {lines.map((l, i) => (
          <div key={i} className="mono text-xs leading-relaxed">
            {l.type==='in'  && <span><span style={{color:'var(--text5)'}}>›  </span><span style={{color:'var(--text3)'}}>{l.text}</span></span>}
            {l.type==='sys' && <span style={{color:'var(--text5)'}}>{l.text}</span>}
            {l.type==='out' && <span style={{color:'var(--text3)'}}>{l.text}</span>}
            {l.type==='err' && <span style={{color:'rgba(252,165,165,0.7)'}}>{l.text}</span>}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 px-4 py-3" style={{ borderTop: '1px solid var(--line)' }}>
        <span className="mono text-xs" style={{ color: 'var(--text5)' }}>›</span>
        <input ref={inRef} type="text" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={onKey}
          placeholder="type a command…" autoComplete="off"
          className="flex-1 bg-transparent outline-none mono text-xs"
          style={{ color: 'var(--text2)', caretColor: 'var(--accent)', '::placeholder': { color: 'var(--text5)' } }} />
        <span className="w-1 h-3 rounded-sm animate-blink" style={{ background: 'var(--accent)', opacity: 0.6 }} />
      </div>
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name:'', email:'', message:'' });
  const [status, setStatus] = useState('idle');
  const onChange = e => setForm({...form, [e.target.name]: e.target.value});
  const onSubmit = async e => {
    e.preventDefault(); setStatus('sending');
    await new Promise(r => setTimeout(r, 900));
    window.open(`mailto:i.sahilkrsharma@gmail.com?subject=Contact from ${form.name}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${form.email}`);
    setStatus('sent');
  };
  const iStyle = { background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius:10, padding:'11px 15px', fontSize:14, color:'#fff', outline:'none', width:'100%', fontFamily:'Inter,sans-serif', transition:'border-color 0.2s ease' };
  return (
    <form onSubmit={onSubmit} autoComplete="off" className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        {[{label:'Name',name:'name',type:'text',ph:'Your name'},{label:'Email',name:'email',type:'email',ph:'you@email.com'}].map(f=>(
          <div key={f.name}>
            <label className="mono text-xs block mb-1.5" style={{color:'var(--text5)'}}>{f.label}</label>
            <input type={f.type} name={f.name} value={form[f.name]} onChange={onChange} required autoComplete="off" placeholder={f.ph} style={iStyle}
              onFocus={e=>{e.target.style.borderColor='rgba(0,234,255,0.3)';}}
              onBlur={e=>{e.target.style.borderColor='var(--glass-border)';}} />
          </div>
        ))}
      </div>
      <div>
        <label className="mono text-xs block mb-1.5" style={{color:'var(--text5)'}}>Message</label>
        <textarea name="message" value={form.message} onChange={onChange} required rows={5} placeholder="Tell me about your project…"
          style={{...iStyle,resize:'none'}}
          onFocus={e=>{e.target.style.borderColor='rgba(0,234,255,0.3)';}}
          onBlur={e=>{e.target.style.borderColor='var(--glass-border)';}} />
      </div>
      <MagneticButton className="w-full">
        <button type="submit" disabled={status!=='idle'} className="btn-primary w-full justify-center">
          {status==='idle'&&<><FiSend size={14}/>Send Message</>}
          {status==='sending'&&'Sending…'}
          {status==='sent'&&'Sent!'}
        </button>
      </MagneticButton>
    </form>
  );
}

export default function Contact() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ct-heading', {
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.ct-heading', start: 'top 85%' },
      });
      // Left column slides from left, right column from right
      gsap.from('.ct-col:first-child', {
        x: -35, opacity: 0, scale: 0.97, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.ct-grid', start: 'top 80%', toggleActions: 'play none none none' },
      });
      gsap.from('.ct-col:last-child', {
        x: 35, opacity: 0, scale: 0.97, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.ct-grid', start: 'top 80%', toggleActions: 'play none none none' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={ref} className="relative">
      <div className="section-container">
        <div className="ct-heading text-center mb-16">
          <span className="section-label justify-center">Contact</span>
          <h2 className="section-title">Let's <span className="gradient-text">work together</span></h2>
          <p className="section-body mt-4 mx-auto text-center" style={{ maxWidth:'40ch', opacity:0.7 }}>
            Have a project? Use the terminal or send a message.
          </p>
        </div>
        <div className="ct-grid grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="ct-col space-y-5">
            <Terminal />
            <div className="p-6 rounded-2xl glass">
              <p className="mono text-xs mb-4" style={{color:'var(--text5)'}}>DIRECT</p>
              <div className="space-y-3">
                <a href="mailto:i.sahilkrsharma@gmail.com" className="flex items-center gap-3 text-sm transition-colors duration-200" style={{color:'var(--text4)'}}
                  onMouseEnter={e=>e.currentTarget.style.color='var(--text2)'} onMouseLeave={e=>e.currentTarget.style.color='var(--text4)'}>
                  <FiMail size={13}/> i.sahilkrsharma@gmail.com
                </a>
                {contactInfo.socials.map(s=>(
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm transition-colors duration-200" style={{color:'var(--text4)'}}
                    onMouseEnter={e=>e.currentTarget.style.color='var(--text2)'} onMouseLeave={e=>e.currentTarget.style.color='var(--text4)'}>
                    <s.icon size={13}/> {s.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="ct-col p-7 rounded-2xl glass">
            <p className="mono text-xs mb-6" style={{color:'var(--text5)'}}>SEND A MESSAGE</p>
            <ContactForm/>
          </div>
        </div>
      </div>
    </section>
  );
}
