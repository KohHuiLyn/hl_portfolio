import React from 'react';
import { Link } from 'react-router-dom';

export function ProjectCard({ project, showDescription = true }) {
  return (
    <article className="project-card" data-project-id={project.id}>
      <Link className="project-card-link" to={`/projects/${project.id}`} aria-label={`View ${project.title} project`}>
        <div className="project-media" style={{ backgroundColor: project.accent }}>
          {project.image ? <img src={project.image} alt="" /> : <span className="mini-spark" />}
          <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        </div>
        <h3>{project.title}</h3>
        {showDescription && <p className="project-description">{project.description}</p>}
      </Link>
    </article>
  );
}
