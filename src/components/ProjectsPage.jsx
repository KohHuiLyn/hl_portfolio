import React, { useMemo, useRef, useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProjectCard } from './ProjectCard';

const projectCategories = ['Development', 'Design', 'Creative'];

const developmentTags = new Set([
  'Web Dev',
  'Frontend Dev',
  'Frontend Development',
  'Mobile Dev',
  'Mobile Development',
  'ReactJS',
  'React Native',
  'Next.js',
  'Electron',
  'Kotlin',
  'Computer Vision',
  'MediaPipe',
  'OpenCV',
  'Python',
  'Blockchain',
  'Java',
  'Godot',
]);

const designTags = new Set([
  'UI/UX',
  'User Research',
  'Figma',
  'Logo',
  'Brand Identity',
  'Asset Creation',
]);

const creativeTags = new Set([
  'Content Creation',
  'Storytelling',
  'Social Media',
  'Game Design',
  'Teaching',
  'Sound Design',
]);

function projectIsInCategory(project, category) {
  if (category === 'Development') {
    return project.tags.some((tag) => developmentTags.has(tag));
  }

  if (category === 'Design') {
    return project.tags.some((tag) => designTags.has(tag));
  }

  if (category === 'Creative') {
    return project.tags.some((tag) => creativeTags.has(tag));
  }

  return false;
}

export function ProjectsPage({ projects }) {
  const filterRowRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('Development');
  const [activeFilter, setActiveFilter] = useState('All');

  const categoryProjects = useMemo(
    () => projects.filter((project) => projectIsInCategory(project, activeCategory)),
    [activeCategory, projects],
  );

  const filters = useMemo(() => {
    const counts = new Map();
    categoryProjects.forEach((project) => project.tags.forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1)));
    return [['All', categoryProjects.length], ...counts.entries()];
  }, [categoryProjects]);

  const visibleProjects = activeFilter === 'All'
    ? categoryProjects
    : categoryProjects.filter((project) => project.tags.includes(activeFilter));

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setActiveFilter('All');
    filterRowRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
  };

  const scrollFilters = (direction) => {
    filterRowRef.current?.scrollBy({
      left: direction * 320,
      behavior: 'smooth',
    });
  };

  return (
    <section className="all-projects section-pad">
      <Link className="back-link" to="/"><ArrowLeft size={25} />back</Link>
      <h1>PROJECTS</h1>

      <div className="project-category-tabs" aria-label="Project categories">
        {projectCategories.map((category) => (
          <button
            key={category}
            className={activeCategory === category ? 'active' : ''}
            type="button"
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="project-filter-shell">
        <button className="filter-scroll-button" type="button" aria-label="Scroll filters left" onClick={() => scrollFilters(-1)}>
          <ChevronLeft size={24} />
        </button>
        <div className="project-filters" aria-label="Filter projects" ref={filterRowRef}>
          {filters.map(([tag, count]) => (
            <button key={tag} className={activeFilter === tag ? 'active' : ''} type="button" onClick={() => setActiveFilter(tag)}>
              {tag} ({count})
            </button>
          ))}
        </div>
        <button className="filter-scroll-button" type="button" aria-label="Scroll filters right" onClick={() => scrollFilters(1)}>
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="all-project-grid">
        {visibleProjects.map((project) => <ProjectCard key={project.id} project={project} />)}
      </div>
    </section>
  );
}
