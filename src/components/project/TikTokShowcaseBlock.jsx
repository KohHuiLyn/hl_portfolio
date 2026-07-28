import React from 'react';

function getTikTokEmbedUrl(url) {
  const match = url?.match(/tiktok\.com\/@[^/]+\/(?:video|photo)\/(\d+)/);
  return match ? `https://www.tiktok.com/embed/v2/${match[1]}` : null;
}

export function TikTokShowcaseBlock({ title, items = [], accent = 'red' }) {
  return (
    <section className={`case-section case-tiktok-showcase accent-${accent}`}>
      {title && <h2>{title}</h2>}
      <div className="case-tiktok-grid">
        {items.map((item) => (
          <article className="case-tiktok-card" key={item.id ?? item.url}>
            {item.label && <h3>{item.label}</h3>}
            <div className="case-tiktok-frame">
              <iframe
                src={getTikTokEmbedUrl(item.url)}
                title={item.label ?? 'TikTok post'}
                loading="lazy"
                allow="encrypted-media; fullscreen"
                allowFullScreen
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
