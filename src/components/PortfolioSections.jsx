import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import { Link } from 'react-router-dom';
import { ProjectCard } from './ProjectCard';

export function Header({ LogoStar, navLinks }) {
  return (
    <header className="topbar">
      <Link className="brand" to="/#top"><LogoStar className="brand-mark" />hui lyn</Link>
      <nav aria-label="Main navigation">
        {navLinks.map(([label, href]) => (
          <Link key={label} className={label === 'contact me' ? 'contact-link' : ''} to={href}>{label}</Link>
        ))}
      </nav>
    </header>
  );
}

export function HeroSection({ RedStar, WhiteStar }) {
  return (
    <>
      <section id="top" className="hero section-pad">
        <div className="hero-kicker">
          <span data-landing-word>UI/UX DESIGNER &</span><br />
          <span data-landing-word>FRONTEND DEVELOPER</span>
        </div>
        <p className="hero-note" data-landing-word>developing ideas into<br />products</p>
        <h1><span data-landing-word>HELLO!</span><br /><span data-landing-word>I'M HUI LYN!</span></h1>
        <RedStar className="hero-star" />
      </section>
      <section className="intro-band">
        <WhiteStar className="star" />
        <p>
          I enjoy designing and building <strong data-landing-highlight>digital products</strong> from start to finish.
          From crafting intuitive <strong data-landing-highlight>UI/UX experiences</strong> to developing responsive
          <strong data-landing-highlight> frontend applications</strong>, I love turning ideas into products that are both
          functional and enjoyable to use.
        </p>
      </section>
    </>
  );
}

export function ProjectsSection({ projectRows, projectsRef }) {
  return (
    <section id="projects" className="projects section-pad" ref={projectsRef}>
      <h2>RECENT PROJECTS</h2>
      <div className="project-rows">
        {projectRows.map((row, rowIndex) => (
          <div className="project-row" data-direction={rowIndex % 2 === 0 ? 'left' : 'right'} key={`row-${rowIndex}`}>
            {row.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ))}
      </div>
      <Link className="outline-button" to="/projects">view more projects <ArrowRight size={16} /></Link>
    </section>
  );
}

export function SkillsMarquee({ skillLogos }) {
  return (
    <section className="tool-strip" aria-label="Tools and technologies">
      <div className="tool-marquee" aria-hidden="true">
        {[...skillLogos, ...skillLogos, ...skillLogos].map((tool, index) => (
          <span key={`${tool.name}-${index}`} className="tool"><img src={tool.image} alt="" /></span>
        ))}
      </div>
    </section>
  );
}

export function AboutSection({ about, aboutScreens, activeAbout, onSelectAbout }) {
  return (
    <section id="about" className="about section-pad">
      <h2>ABOUT ME</h2>
      <div className="about-copy">
        <div><h3 data-about-title>{about.heading}</h3><p>{about.copy}</p><strong>{about.skills}</strong></div>
        <div className="about-selector" aria-label="About me categories">
          {aboutScreens.map((item, index) => (
            <button key={item.id} type="button" className={index === activeAbout ? 'active' : ''} onClick={() => onSelectAbout(index)}>{item.label}</button>
          ))}
        </div>
      </div>
      <div className="lane-grid">
        {about.cards.map((lane) => (
          <article key={lane.title}>
            {lane.image ? <img src={lane.image} alt="" /> : <span className="about-placeholder" />}
            <h4>{lane.title}</h4>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ExperienceSection({ current, experiences, activeExperience, onMove }) {
  return (
    <section id="work" className="experience section-pad">
      <p className="section-label">WORK EXPERIENCE</p>
      <div className="experience-layout">
        <div>
          <h2>{current.company}</h2><p className="year">{current.year}</p><h3>{current.role}</h3>
          <div className="pill-row">{current.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <p className="experience-summary">{current.summary}</p>
          <ul>{current.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
          <a className="outline-button compact" href={current.learnMore} target="_blank" rel="noopener noreferrer">
            learn more <ArrowRight size={16} />
          </a>
        </div>
        <img className="experience-image" src={current.image} alt={`${current.company} work`} />
      </div>
      <div className="carousel-controls" aria-label="Work experience carousel controls">
        <button type="button" onClick={() => onMove(-1)} aria-label="Previous experience"><ArrowLeft /></button>
        <div className="dots" aria-hidden="true">{experiences.map((experience, index) => <span key={experience.company} className={index === activeExperience ? 'active' : ''} />)}</div>
        <button type="button" onClick={() => onMove(1)} aria-label="Next experience"><ArrowRight /></button>
      </div>
    </section>
  );
}

export function ContactSection({ opportunities, CardStar }) {
  return (
    <section id="contact" className="contact-section section-pad">
      <h2>READY FOR THE NEXT<br />CHALLENGE!</h2>
      <div className="opportunity-grid">
        {opportunities.map((item) => (
          <article key={item.title}><CardStar className="opportunity-star" color={item.color} /><h3>{item.title}</h3><p>{item.copy}</p></article>
        ))}
      </div>
      <p className="email-line">Drop me an email at <a href="mailto:kohhuilyn@gmail.com">kohhuilyn@gmail.com</a></p>
    </section>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="socials" aria-label="Social links">
        <a href="https://www.tiktok.com/@jiakerz" target="_blank" rel="noreferrer" aria-label="TikTok"><SiTiktok /></a>
        <a href="https://www.linkedin.com/in/hui-lyn-koh/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
        <a href="https://github.com/KohHuiLyn" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
        <a href="mailto:kohhuilyn@gmail.com" aria-label="Email"><FaEnvelope /></a>
      </div>
      <strong>hui lyn</strong><span>2026</span>
    </footer>
  );
}
