import React, { useMemo, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
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

export function ProjectDetailPage({ projects }) {
  const { projectId } = useParams();
  const project = projects.find((item) => item.id === projectId);

  if (!project) {
    return (
      <section className="project-detail section-pad">
        <Link className="back-link" to="/projects"><ArrowLeft size={25} />back to projects</Link>
        <h1>PROJECT NOT FOUND</h1>
      </section>
    );
  }

  return (
    <section className="project-detail section-pad">
      <Link className="back-link" to="/projects"><ArrowLeft size={25} />back to projects</Link>
      <div className="project-detail-layout">
        <div>
          <p className="section-label">PROJECT</p>
          <h1>{project.title}</h1>
          <p className="project-detail-description">{project.description}</p>
          <div className="pill-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        </div>
        <div className="project-detail-media" style={{ backgroundColor: project.accent }}>
          {project.image ? <img src={project.image} alt={`${project.title} project preview`} /> : <span className="mini-spark" />}
        </div>
      </div>
    </section>
  );
}
