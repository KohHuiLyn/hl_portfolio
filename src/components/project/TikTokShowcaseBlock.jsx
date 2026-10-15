import React from 'react';
import { ExternalLink } from 'lucide-react';
import { SiTiktok } from 'react-icons/si';

export function TikTokShowcaseBlock({ title, items = [], accent = 'red' }) {
  return (
    <section className={`case-section case-tiktok-showcase accent-${accent}`}>
      {title && <h2>{title}</h2>}
      <div className="case-tiktok-grid">
        {items.map((item) => (
          <article className="case-tiktok-card" key={item.id ?? item.url}>
            <a href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${item.label ?? 'TikTok post'} on TikTok`}>
              {item.image && (
                <span className="case-tiktok-preview">
                  <img src={item.image} alt={`${item.label ?? 'TikTok post'} preview`} />
                  <span className="case-tiktok-preview-badge" aria-hidden="true"><SiTiktok /></span>
                </span>
              )}
              <span className="case-tiktok-card-footer">
                <span className="case-tiktok-icon" aria-hidden="true"><SiTiktok /></span>
                <span className="case-tiktok-card-copy">
                  <span>{item.url.includes('/photo/') ? 'Photo post' : 'Video'}</span>
                  <h3>{item.label ?? 'View TikTok post'}</h3>
                  <strong>Open on TikTok</strong>
                </span>
                <ExternalLink className="case-tiktok-external" aria-hidden="true" />
              </span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
