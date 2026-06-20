import React from 'react';
import { OverviewStar } from './OverviewStar';

export function TextBlock({ title, eyebrow, body, accent = 'blue' }) {
  const paragraphs = Array.isArray(body) ? body : [body];
  const isOverview = title?.toLowerCase() === 'overview';
  return (
    <section className={`case-section case-text-block ${isOverview ? 'case-overview' : ''} accent-${accent}`}>
      {eyebrow && !isOverview && <p className="case-eyebrow">{eyebrow}</p>}
      {title && (isOverview ? <div className="case-overview-heading"><OverviewStar /><h2>{title}</h2></div> : <h2>{title}</h2>)}
      <div className="case-body">{paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
    </section>
  );
}
