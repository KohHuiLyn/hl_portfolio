import React from 'react';
import { CaseMedia } from './CaseMedia';

export function ImageTextBlock({ title, body, image, alt = '', imagePosition = 'right', layout = 'split', accent = 'green', onImageClick }) {
  const isStacked = ['stacked', 'fullHeight'].includes(layout);
  const paragraphs = Array.isArray(body) ? body : body ? [body] : [];
  const text = paragraphs.length > 0 && <div className="case-body">{paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>;

  if (isStacked) {
    return (
      <section className={`case-section case-image-text case-image-text-stacked accent-${accent}`}>
        <h2>{title}</h2>
        <CaseMedia className={`case-image-text-media ${layout === 'fullHeight' ? 'case-media-full-height' : ''}`} src={image} alt={alt} onImageClick={onImageClick} />
        <div className="case-image-text-caption">{text}</div>
      </section>
    );
  }

  return (
    <section className={`case-section case-image-text image-${imagePosition} accent-${accent}`}>
      <div className="case-image-text-copy">
        {title && <h2>{title}</h2>}
        {text}
      </div>
      <CaseMedia className="case-image-text-media" src={image} alt={alt} onImageClick={onImageClick} />
    </section>
  );
}
