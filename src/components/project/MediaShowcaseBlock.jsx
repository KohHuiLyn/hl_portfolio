import React from 'react';

export function MediaShowcaseBlock({ title, items = [], accent = 'orange' }) {
  return (
    <section className={`case-section case-media-showcase accent-${accent}`}>
      {title && <h2>{title}</h2>}
      <div className="case-media-showcase-grid">
        {items.map((item, index) => (
          <figure className="case-showcase-item" key={item.id ?? item.src}>
            {item.type === 'video' ? (
              <video controls playsInline preload="metadata">
                <source src={item.src} />
                Your browser does not support this video.
              </video>
            ) : (
              <img src={item.src} alt={item.alt ?? ''} loading="lazy" />
            )}
            <figcaption>{item.label ?? `Day ${index + 1}`}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
