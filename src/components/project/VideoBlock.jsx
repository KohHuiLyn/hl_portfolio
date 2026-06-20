import React from 'react';

function getYouTubeEmbedUrl(url) {
  const match = url?.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/)|studio\.youtube\.com\/video\/)([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

function getTikTokEmbedUrl(url) {
  const match = url?.match(/tiktok\.com\/@[^/]+\/(?:video|photo)\/(\d+)/);
  return match ? `https://www.tiktok.com/embed/v2/${match[1]}` : null;
}

export function VideoBlock({ title, body, url, src, accent = 'green' }) {
  const embedUrl = getYouTubeEmbedUrl(url);
  const tiktokEmbedUrl = getTikTokEmbedUrl(url);

  return (
    <section className={`case-section case-video accent-${accent}`}>
      <h2>{title}</h2>
      <div className="case-video-frame">
        {embedUrl || tiktokEmbedUrl ? (
          <iframe className={tiktokEmbedUrl ? 'case-tiktok-embed' : ''} src={embedUrl ?? tiktokEmbedUrl} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
        ) : src ? (
          <video controls preload="metadata"><source src={src} /></video>
        ) : (
          <span className="case-placeholder">Add video</span>
        )}
      </div>
      {body && <div className="case-video-caption case-body"><p>{body}</p></div>}
    </section>
  );
}
