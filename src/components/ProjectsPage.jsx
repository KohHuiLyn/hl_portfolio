import React, { useMemo, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProjectCard } from './ProjectCard';

export function ProjectsPage({ projects }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = useMemo(() => {
    const counts = new Map();
    projects.forEach((project) => project.tags.forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1)));
    return [['All', projects.length], ...counts.entries()];
  }, [projects]);
  const visibleProjects = activeFilter === 'All' ? projects : projects.filter((project) => project.tags.includes(activeFilter));

  return (
    <section className="all-projects section-pad">
      <Link className="back-link" to="/"><ArrowLeft size={25} />back</Link>
      <h1>PROJECTS</h1>
      <div className="project-filters" aria-label="Filter projects">
        {filters.map(([tag, count]) => (
          <button key={tag} className={activeFilter === tag ? 'active' : ''} type="button" onClick={() => setActiveFilter(tag)}>
            {tag} ({count})
          </button>
        ))}
      </div>
      <div className="all-project-grid">
        {visibleProjects.map((project) => <ProjectCard key={project.id} project={project} />)}
      </div>
    </section>
  );
}
