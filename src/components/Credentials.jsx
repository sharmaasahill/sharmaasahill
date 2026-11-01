import { certifications, education, skills, training } from '../data/portfolioData';

export default function Credentials() {
  return (
    <section id="credentials" className="section" aria-labelledby="credentials-title">
      <div className="rail">
        <div className="sec-rule" data-reveal>
          <p className="eyebrow">
            <b>04</b> / Toolchain
          </p>
          <span className="cross" aria-hidden="true">
            +
          </span>
        </div>

        <div className="cred__grid">
          <h2 id="credentials-title" className="h2 cred__title" data-lines>
            <span className="line">
              <span>The paper </span>
            </span>
            <span className="line muted">
              <span>
                trail<span className="signal">.</span>
              </span>
            </span>
          </h2>

          <div className="cred__list">
            <p className="eyebrow cred__label" data-reveal>
              Certifications
            </p>
            <ul className="certs">
              {certifications.map((cert) => (
                <li key={cert.title} className="cert" data-reveal>
                  <span className="cert__year">{cert.year}</span>
                  <div>
                    <div className="cert__title">{cert.title}</div>
                    <div className="cert__issuer">{cert.issuer}</div>
                  </div>
                </li>
              ))}
            </ul>

            <p className="eyebrow cred__label cred__label--gap" data-reveal>
              Training &amp; recognition
            </p>
            <ul className="certs">
              {training.map((item) => (
                <li key={item.title} className="cert" data-reveal>
                  <span className="cert__year">{item.year}</span>
                  <div>
                    <div className="cert__title">
                      {item.title} <span className="cert__badge">{item.badge}</span>
                    </div>
                    <div className="cert__body">{item.body}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="edu" data-reveal>
            <p className="eyebrow">Education</p>
            <p className="edu__degree">{education.degree}</p>
            <p className="edu__school">{education.school}</p>
            <p className="edu__meta">
              {education.years} · {education.place}
            </p>
          </div>
        </div>

        <div className="skills">
          <p className="eyebrow" data-reveal style={{ marginBottom: 18 }}>
            Everything in the toolchain
          </p>
          {skills.map((row) => (
            <div key={row.group} className="skills__row" data-reveal>
              <p className="eyebrow skills__group">{row.group}</p>
              <ul className="skills__items">
                {row.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
