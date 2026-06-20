import React from 'react';
import { CaseMedia } from './CaseMedia';

export function ImageGallery({ title, images = [], accent = 'red', onImageClick }) {
  return (
    <section className={`case-section case-gallery accent-${accent}`}>
      {title && <h2>{title}</h2>}
      <div className="case-gallery-grid">
        {images.map((image, index) => (
          <CaseMedia className={image.variant === 'mobile' ? 'case-media-mobile' : ''} key={image.id ?? index} src={image.src} alt={image.alt ?? ''} onImageClick={onImageClick} />
        ))}
      </div>
    </section>
  );
}
