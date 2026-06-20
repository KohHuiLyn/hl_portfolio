import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

export function ImageModal({ images, activeIndex, onClose, onChange }) {
  useEffect(() => {
    if (activeIndex === null) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') onChange((activeIndex - 1 + images.length) % images.length);
      if (event.key === 'ArrowRight') onChange((activeIndex + 1) % images.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, images.length, onChange, onClose]);

  if (activeIndex === null || !images.length) return null;
  const image = images[activeIndex];
  const move = (direction) => onChange((activeIndex + direction + images.length) % images.length);

  return (
    <div className="image-modal-backdrop" role="presentation" onClick={onClose}>
      <div className="image-modal" role="dialog" aria-modal="true" aria-label="Image preview" onClick={(event) => event.stopPropagation()}>
        <button className="image-modal-close" type="button" aria-label="Close image preview" onClick={onClose}><X /></button>
        {images.length > 1 && <button className="image-modal-arrow previous" type="button" aria-label="Previous image" onClick={() => move(-1)}><ArrowLeft /></button>}
        <img src={image.src} alt={image.alt} />
        {images.length > 1 && <button className="image-modal-arrow next" type="button" aria-label="Next image" onClick={() => move(1)}><ArrowRight /></button>}
        {images.length > 1 && <p className="image-modal-count">{activeIndex + 1} / {images.length}</p>}
      </div>
    </div>
  );
}
