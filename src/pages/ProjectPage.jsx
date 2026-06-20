import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ChevronsRight } from 'lucide-react';
import anime from 'animejs/lib/anime.es.js';
import { Link, useParams } from 'react-router-dom';
import { ImageModal } from '../components/project/ImageModal';
import { OverviewStar } from '../components/project/OverviewStar';
import { ProjectSectionRenderer } from '../components/project/ProjectSectionRenderer';
import { ProjectTabs } from '../components/project/ProjectTabs';
import '../styles/projectPage.css';

function getFallbackSections(project) {
  return [
    { type: 'text', title: 'Overview', eyebrow: 'Project', body: project.description, accent: 'orange' },
    { type: 'imageText', title: 'Project preview', body: 'Case study details are coming soon.', image: project.image, alt: `${project.title} preview`, accent: 'green' },
  ];
}

function collectSectionImages(sections) {
  return sections.flatMap((section) => {
    if (section.type === 'gallery' || section.type === 'carousel') return section.images ?? [];
    if (section.type === 'imageText' || section.type === 'longImageSidebar') return section.image ? [{ src: section.image, alt: section.alt ?? section.title }] : [];
    return [];
  }).filter((image) => image.src);
}

export function ProjectPage({ projects }) {
  const { projectId, tabId } = useParams();
  const project = projects.find((item) => item.id === projectId);

  if (!project) {
    return (
      <section className="project-page section-pad">
        <Link className="case-back-link" to="/projects"><ArrowLeft size={25} />back to projects</Link>
        <h1 className="case-project-title">PROJECT NOT FOUND</h1>
      </section>
    );
  }

  const tabs = project.caseStudy?.tabs ?? [];
  const activeTab = tabs.find((tab) => tab.id === tabId) ?? tabs[0];
  const activeTabIndex = tabs.findIndex((tab) => tab.id === activeTab?.id);
  const showTabTitle = activeTabIndex > 0;
  const sourceSections = activeTab?.sections ?? project.caseStudy?.sections ?? getFallbackSections(project);
  const sections = showTabTitle
    ? sourceSections.map((section, index) => index === 0 ? { ...section, title: undefined } : section)
    : !activeTab && project.caseStudy?.sections
    ? sourceSections.map((section, index) => index === 0 && section.type === 'text' ? { ...section, body: project.description } : section)
    : sourceSections;
  const images = useMemo(() => collectSectionImages(sections), [sections]);
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const pageRef = useRef(null);
  const projectIndex = projects.findIndex((item) => item.id === project.id);
  const nextTab = activeTabIndex >= 0 ? tabs[activeTabIndex + 1] : null;
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const finalSection = sections.at(-1);
  const nextOnDark = ['carousel', 'gallery', 'longImageSidebar'].includes(finalSection?.type);

  useEffect(() => setActiveImageIndex(null), [projectId, tabId]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const page = pageRef.current;
    if (!page) return undefined;

    anime.set(page.querySelectorAll('.case-section, .case-next'), { opacity: 0, translateY: 36 });
    anime.timeline({ easing: 'easeOutExpo' })
      .add({ targets: page.querySelector('.case-project-title'), opacity: [0, 1], translateY: [30, 0], duration: 650 })
      .add({ targets: page.querySelectorAll('.case-study-tabs a'), opacity: [0, 1], translateY: [16, 0], delay: anime.stagger(55), duration: 420 }, '-=360');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        anime({ targets: entry.target, opacity: [0, 1], translateY: [36, 0], duration: 620, easing: 'easeOutExpo' });
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    page.querySelectorAll('.case-section, .case-next').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [projectId, tabId]);

  function openImage(image) {
    const index = images.findIndex((item) => item.src === image.src);
    setActiveImageIndex(index >= 0 ? index : null);
  }

  const nextDestination = nextTab
    ? { to: `/projects/${project.id}/${nextTab.id}`, label: `Continue to ${nextTab.label} Tab` }
    : { to: `/projects/${nextProject.id}`, label: 'See next project' };

  return (
    <div className="project-page" ref={pageRef}>
      <section className="case-study-header section-pad">
        <Link className="case-back-link" to="/projects"><ArrowLeft size={25} />back</Link>
        <h1 className="case-project-title">{project.title}</h1>
        <div className="case-project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <ProjectTabs projectId={project.id} tabs={tabs} activeTabId={activeTab?.id} />
      </section>
      {showTabTitle && <section className="case-tab-title section-pad"><OverviewStar /><h2>{activeTab.label}</h2></section>}
      <div className="case-study-content">
        <ProjectSectionRenderer sections={sections} onImageClick={openImage} />
        <div className={`case-next ${nextOnDark ? 'on-dark' : ''}`}>
          <Link to={nextDestination.to}>{nextDestination.label}<ChevronsRight size={26} /></Link>
        </div>
      </div>
      <ImageModal images={images} activeIndex={activeImageIndex} onClose={() => setActiveImageIndex(null)} onChange={setActiveImageIndex} />
    </div>
  );
}
