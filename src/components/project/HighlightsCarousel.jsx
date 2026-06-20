import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CaseMedia } from './CaseMedia';

export function HighlightsCarousel({ title = 'Highlights', images = [], accent = 'orange', onImageClick }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasImages = images.length > 0;
  const activeImage = images[activeIndex] ?? null;
  const move = (direction) => setActiveIndex((index) => (index + direction + images.length) % images.length);

  return (
    <section className={`case-section case-highlights accent-${accent}`}>
      <h2>{title}</h2>
      <div className="case-carousel">
        <button type="button" aria-label="Previous highlight" disabled={!hasImages} onClick={() => move(-1)}><ArrowLeft /></button>
        <CaseMedia className="case-carousel-media" src={activeImage?.src} alt={activeImage?.alt} onImageClick={onImageClick} />
        <button type="button" aria-label="Next highlight" disabled={!hasImages} onClick={() => move(1)}><ArrowRight /></button>
      </div>
      {hasImages && <div className="case-carousel-dots" aria-label="Highlight selection">
        {images.map((image, index) => <button key={image.id ?? index} className={index === activeIndex ? 'active' : ''} type="button" aria-label={`Show highlight ${index + 1}`} onClick={() => setActiveIndex(index)} />)}
      </div>}
    </section>
  );
}
