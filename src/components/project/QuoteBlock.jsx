import React from 'react';

export function QuoteBlock({ title, quotes = [], accent = 'blue' }) {
  return (
    <section className={`case-section case-quotes accent-${accent}`}>
      {title && <h2>{title}</h2>}
      <div className="case-quote-list">
        {quotes.map((quote, index) => (
          <blockquote key={quote.id ?? index}>
            <span className="case-quote-mark" aria-hidden="true">"</span>
            <p>{quote.text ?? quote}</p>
            {quote.author && <footer>{quote.author}</footer>}
          </blockquote>
        ))}
      </div>
    </section>
  );
}
