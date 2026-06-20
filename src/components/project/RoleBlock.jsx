import React from 'react';

export function RoleBlock({ title = 'My role', role, year, tools = [], contributions = [], body, accent = 'green' }) {
  return (
    <section className={`case-section case-role accent-${accent}`}>
      <h2>{title}</h2>
      <div className="case-role-meta"><p>{role}</p>{year && <strong>{year}</strong>}</div>
      {body && <div className="case-body"><p>{body}</p></div>}
      {tools.length > 0 && <div className="case-tools">{tools.map((tool) => <span key={tool}>{tool}</span>)}</div>}
      {contributions.length > 0 && <ul className="case-contributions">{contributions.map((item) => <li key={item}>{item}</li>)}</ul>}
    </section>
  );
}
