/**
 * Eyebrow ("02 / Experience"), a serif headline that ends in a signal-green dot,
 * and an optional link on the right.
 */
export default function SectionHeading({ id, index, label, title, action }) {
  return (
    <div className="sec-head">
      <div>
        <p className="eyebrow" data-reveal>
          <b>{index}</b> / {label}
        </p>
        <h2 id={id} className="h2" data-lines>
          <span className="line">
            <span>
              {title}
              <span className="dot">.</span>
            </span>
          </span>
        </h2>
      </div>
      {action && <div data-reveal>{action}</div>}
    </div>
  );
}
