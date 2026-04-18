import { Link } from 'react-scroll';
import { FiArrowUp } from 'react-icons/fi';
import { navLinks, contactInfo } from '../data/portfolioData';

export default function Footer() {
  return (
    <footer style={{ position: 'relative', zIndex: 1, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <Link to="hero" smooth duration={600} className="cursor-pointer">
              <span className="font-heading font-bold text-sm text-white">Sahil Sharma</span>
            </Link>
            <p className="mono text-xs mt-1" style={{ color: 'var(--text5)' }}>Product Engineer</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} smooth offset={-72} duration={500}
                className="mono text-xs cursor-pointer transition-colors duration-200"
                style={{ color: 'var(--text5)' }}
                onMouseEnter={e=>e.target.style.color='var(--text2)'}
                onMouseLeave={e=>e.target.style.color='var(--text5)'}>
                {l.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            {contactInfo.socials.slice(0,4).map(s=>(
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name}
                className="transition-colors duration-200" style={{ color: 'var(--text5)' }}
                onMouseEnter={e=>e.currentTarget.style.color='#fff'} onMouseLeave={e=>e.currentTarget.style.color='var(--text5)'}>
                <s.icon size={15}/>
              </a>
            ))}
            <Link to="hero" smooth duration={600} className="cursor-pointer ml-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                style={{ color:'var(--text5)', border:'1px solid var(--line)' }}
                onMouseEnter={e=>{e.currentTarget.style.color='var(--accent)';e.currentTarget.style.borderColor='rgba(0,234,255,0.2)';}}
                onMouseLeave={e=>{e.currentTarget.style.color='var(--text5)';e.currentTarget.style.borderColor='var(--line)';}}>
                <FiArrowUp size={14}/>
              </div>
            </Link>
          </div>
        </div>
        <div className="divider my-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="mono text-xs" style={{ color: 'var(--text5)' }}>
            © {new Date().getFullYear()} Sahil Sharma.
          </p>
          <div className="flex items-center gap-2">
            <span className="status-dot" style={{ width:6, height:6 }}/>
            <span className="mono text-xs" style={{color:'var(--text5)'}}>Open to opportunities</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
