import React from 'react';

export function CaseMedia({ src, alt = '', className = '', onImageClick }) {
  if (!src) {
    return <div className={`case-media ${className}`}><span className="case-placeholder">Add image</span></div>;
  }

  return (
    <button className={`case-media case-media-button ${className}`} type="button" onClick={() => onImageClick?.({ src, alt })}>
      <img src={src} alt={alt} />
      <span className="case-media-zoom">View image</span>
    </button>
  );
}
