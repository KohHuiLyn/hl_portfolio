import React from 'react';
import { Link } from 'react-router-dom';

export function ProjectTabs({ projectId, tabs, activeTabId }) {
  if (!tabs?.length) return null;

  return (
    <nav className="case-study-tabs" aria-label="Project sections">
      {tabs.map((tab, index) => {
        const to = index === 0 ? `/projects/${projectId}` : `/projects/${projectId}/${tab.id}`;
        return <Link className={tab.id === activeTabId ? 'active' : ''} key={tab.id} to={to}>{tab.label}</Link>;
      })}
    </nav>
  );
}
