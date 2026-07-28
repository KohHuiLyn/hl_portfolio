import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function StudentCreationsBlock({ title, sprites = [], tracks = [], accent = 'green' }) {
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const activeTrack = tracks[activeTrackIndex];
  const switchTrack = (direction) => {
    setActiveTrackIndex((index) => (index + direction + tracks.length) % tracks.length);
  };

  return (
    <section className={`case-section case-student-creations accent-${accent}`}>
      {title && <h2>{title}</h2>}

      <div className="case-creation-group">
        <h3>Sprites</h3>
        <div className="case-sprite-grid">
          {sprites.map((sprite, index) => (
            <figure className="case-sprite-card" key={sprite.id ?? sprite.src}>
              <img src={sprite.src} alt={sprite.alt ?? `Student sprite ${index + 1}`} loading="lazy" />
              <figcaption>{sprite.label ?? `Student sprite ${index + 1}`}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="case-creation-group case-music-group">
        <h3>Music</h3>
        {activeTrack && (
          <div className="case-track-carousel">
            <button type="button" aria-label="Previous song" onClick={() => switchTrack(-1)}>
              <ChevronLeft />
            </button>
            <article className="case-track" key={activeTrack.id ?? activeTrack.src}>
              <img className="case-track-cover" src={activeTrack.cover} alt={`${activeTrack.title} album cover`} loading="lazy" />
              <div className="case-track-info">
                <h4>{activeTrack.title}</h4>
                <p>{activeTrack.student}</p>
              </div>
              <div className="case-track-player">
                <audio controls preload="metadata" src={activeTrack.src}>
                  Your browser does not support this audio.
                </audio>
              </div>
            </article>
            <button type="button" aria-label="Next song" onClick={() => switchTrack(1)}>
              <ChevronRight />
            </button>
          </div>
        )}
        {tracks.length > 1 && (
          <div className="case-track-dots" aria-label="Song selection">
            {tracks.map((track, index) => (
              <button
                className={index === activeTrackIndex ? 'active' : ''}
                key={track.id ?? track.src}
                type="button"
                aria-label={`Show ${track.title}`}
                onClick={() => setActiveTrackIndex(index)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
