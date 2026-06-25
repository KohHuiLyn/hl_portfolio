import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function ProjectCard({ project, showDescription = true }) {
  const [areTagsExpanded, setAreTagsExpanded] = useState(false);
  const visibleTags = project.tags.slice(0, 3);
  const hiddenTags = project.tags.slice(3);

  return (
    <article className="project-card" data-project-id={project.id}>
      <Link className="project-card-link" to={`/projects/${project.id}`} aria-label={`View ${project.title} project`}>
        <div className="project-media" style={{ backgroundColor: project.accent }}>
          {project.image ? <img src={project.image} alt="" /> : <span className="mini-spark" />}
        </div>
        <h3>{project.title}</h3>
        {showDescription && <p className="project-description">{project.description}</p>}
      </Link>
      <div className={`tag-row${areTagsExpanded ? ' is-expanded' : ''}`} aria-label={`${project.title} tags`}>
        {visibleTags.map((tag) => <span key={tag}>{tag}</span>)}
        {hiddenTags.map((tag) => <span className="is-extra" key={tag}>{tag}</span>)}
        {hiddenTags.length > 0 && (
          <button
            className="tag-more"
            type="button"
            aria-expanded={areTagsExpanded}
            aria-label={areTagsExpanded ? `Show fewer ${project.title} tags` : `Show ${hiddenTags.length} more ${project.title} tags`}
            onClick={() => setAreTagsExpanded((expanded) => !expanded)}
          >
            {areTagsExpanded ? '×' : `+${hiddenTags.length}`}
          </button>
        )}
      </div>
    </article>
  );
}
