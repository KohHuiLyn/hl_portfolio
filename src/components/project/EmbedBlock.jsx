import React from 'react';

export function EmbedBlock({ title, body, url, linkUrl, linkLabel, accent = 'blue' }) {
  return (
    <section className={`case-section case-embed accent-${accent}`}>
      {title && <h2>{title}</h2>}
      <div className="case-embed-content">
        <div className="case-embed-frame">
          <iframe
            src={url}
            title={title}
            loading="lazy"
            allow="fullscreen"
            allowFullScreen
          />
        </div>
        {body && <div className="case-embed-caption case-body"><p>{body}</p></div>}

      </div>
    </section>
  );
}
