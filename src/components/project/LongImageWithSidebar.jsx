import React from 'react';
import { CaseMedia } from './CaseMedia';

export function LongImageWithSidebar({ title, image, alt = '', sidebar = {}, accent = 'orange', onImageClick }) {
  return (
    <section className={`case-section case-long-image accent-${accent}`}>
      {title && <h2>{title}</h2>}
      <div className="case-long-image-layout">
        <CaseMedia className="case-long-media" src={image} alt={alt} onImageClick={onImageClick} />
        <aside className="case-sidebar">
          {sidebar.label && <p className="case-eyebrow">{sidebar.label}</p>}
          {sidebar.title && <h3>{sidebar.title}</h3>}
          {sidebar.body && <p>{sidebar.body}</p>}
          {sidebar.items?.length > 0 && <ul>{sidebar.items.map((item) => <li key={item}>{item}</li>)}</ul>}
        </aside>
      </div>
    </section>
  );
}
