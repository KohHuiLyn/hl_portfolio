import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import {
  AboutSection,
  ContactSection,
  ExperienceSection,
  Footer,
  Header,
  HeroSection,
  ProjectsSection,
  SkillsMarquee,
} from './components/PortfolioSections';
import { ProjectsPage } from './components/ProjectsPage';
import { ProjectPage } from './pages/ProjectPage';
import { projects, recentProjectRows } from './data/projects';
import './styles.css';

function RedStar({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 357 691" fill="none" aria-hidden="true">
      <path d="M339.503 4.03579C341.368 -1.34519 348.978 -1.3452 350.842 4.03577L410.408 175.958C411.585 179.354 415.464 180.961 418.697 179.391L582.384 99.9436C587.507 97.457 592.888 102.838 590.402 107.961L510.954 271.648C509.385 274.882 510.991 278.761 514.388 279.937L686.31 339.503C691.691 341.368 691.691 348.978 686.31 350.842L514.388 410.408C510.991 411.585 509.385 415.463 510.954 418.697L590.402 582.384C592.888 587.507 587.507 592.888 582.384 590.402L418.697 510.954C415.464 509.384 411.585 510.991 410.408 514.387L350.842 686.309C348.978 691.69 341.368 691.69 339.503 686.309L279.938 514.387C278.761 510.991 274.882 509.384 271.648 510.954L107.962 590.402C102.838 592.888 97.4572 587.507 99.9438 582.384L179.392 418.697C180.961 415.463 179.354 411.585 175.958 410.408L4.03603 350.842C-1.34494 348.978 -1.34496 341.368 4.03602 339.503L175.958 279.937C179.354 278.761 180.961 274.882 179.392 271.648L99.9438 107.961C97.4572 102.838 102.838 97.457 107.962 99.9436L271.648 179.391C274.882 180.961 278.761 179.354 279.938 175.958L339.503 4.03579Z" fill="#E34F4F" />
    </svg>
  );
}

function WhiteStar({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 605 422" fill="none" aria-hidden="true">
      <path d="M296.958 3.6291C299.039 -1.20972 305.9 -1.20971 307.981 3.6291L388.825 191.569C389.874 194.008 392.402 195.468 395.039 195.157L598.221 171.199C603.453 170.582 606.883 176.524 603.733 180.746L481.394 344.728C479.806 346.856 479.806 349.775 481.394 351.904L603.733 515.886C606.883 520.108 603.453 526.049 598.221 525.432L395.039 501.475C392.402 501.164 389.874 502.623 388.825 505.063L307.981 693.002C305.9 697.841 299.039 697.841 296.958 693.002L216.115 505.063C215.065 502.623 212.538 501.164 209.9 501.475L6.71813 525.432C1.48687 526.049 -1.94339 520.108 1.20643 515.886L123.546 351.904C125.133 349.775 125.133 346.856 123.546 344.728L1.20643 180.746C-1.94339 176.524 1.48687 170.582 6.71813 171.199L209.9 195.157C212.538 195.468 215.065 194.008 216.115 191.569L296.958 3.6291Z" fill="#F9F5F5" />
    </svg>
  );
}

function LogoStar({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 47 47" fill="none" aria-hidden="true">
      <path d="M31.546 0.90521C32.1598 0.423982 33.0638 0.799439 33.156 1.57393L34.161 10.0128C34.2194 10.5033 34.6271 10.8776 35.1208 10.894L43.6146 11.1763C44.3941 11.2022 44.8452 12.0708 44.4181 12.7234L39.7635 19.8339C39.493 20.2472 39.5647 20.796 39.9323 21.1259L46.2575 26.8018C46.838 27.3228 46.6253 28.2782 45.8786 28.5035L37.7424 30.9586C37.2695 31.1013 36.9717 31.5678 37.0413 32.0568L38.2382 40.4706C38.3481 41.2428 37.571 41.8379 36.8541 41.5305L29.0433 38.1814C28.5894 37.9868 28.0613 38.1527 27.8003 38.572L23.309 45.7868C22.8968 46.4489 21.9189 46.4052 21.5674 45.709L17.7367 38.1228C17.5141 37.6819 17.0029 37.4696 16.5334 37.623L8.45533 40.2628C7.71395 40.5051 6.99294 39.8431 7.17116 39.0838L9.11305 30.8101C9.2259 30.3293 8.9708 29.8381 8.51254 29.6538L0.627498 26.4835C-0.0961599 26.1926 -0.222973 25.222 0.401635 24.7549L7.20742 19.6651C7.60296 19.3693 7.72329 18.829 7.49068 18.3933L3.4882 10.8963C3.12087 10.2083 3.64759 9.38326 4.42633 9.42692L12.9115 9.90259C13.4047 9.93024 13.8441 9.59371 13.946 9.11042L15.6989 0.794654C15.8598 0.0314656 16.7936 -0.261957 17.362 0.272048L23.5563 6.09061C23.9163 6.42877 24.4693 6.45345 24.858 6.14871L31.546 0.90521Z" fill="#DEA439" />
    </svg>
  );
}

function CardStar({ className = '', color = '#DEA439' }) {
  return (
    <svg className={className} viewBox="0 0 182 181" fill="none" aria-hidden="true">
      <path d="M119.87 4.09642C124.166 0.727822 130.494 3.35602 131.139 8.77742L134.261 34.9875C134.67 38.4207 137.524 41.0411 140.979 41.1559L167.36 42.0326C172.817 42.2139 175.974 48.2945 172.984 52.8625L158.528 74.947C156.634 77.8397 157.136 81.6816 159.709 83.9907L179.355 101.62C183.418 105.266 181.929 111.954 176.702 113.531L151.432 121.156C148.122 122.155 146.037 125.421 146.524 128.844L150.242 154.976C151.011 160.381 145.571 164.547 140.553 162.395L116.293 151.994C113.116 150.631 109.419 151.793 107.592 154.728L93.6427 177.136C90.7573 181.771 83.9125 181.465 81.4515 176.592L69.554 153.03C67.9956 149.943 64.4175 148.457 61.1311 149.531L36.0415 157.73C30.8518 159.426 25.8047 154.792 27.0523 149.477L33.0835 123.78C33.8735 120.414 32.0878 116.975 28.88 115.686L4.39004 105.839C-0.675566 103.802 -1.56326 97.0085 2.809 93.7387L23.9469 77.9304C26.7157 75.8598 27.558 72.0779 25.9297 69.0279L13.4985 45.7432C10.9272 40.9269 14.6142 35.1518 20.0654 35.4574L46.4193 36.9348C49.8713 37.1283 52.9475 34.7727 53.6606 31.3896L59.1049 5.56187C60.231 0.219549 66.7676 -1.83441 70.747 1.90362L89.9857 19.9754C92.5056 22.3425 96.3763 22.5153 99.0972 20.3821L119.87 4.09642Z" fill={color} />
    </svg>
  );
}

const aboutScreens = [
  {
    id: 'designer',
    label: 'designer',
    heading: "I'M A DESIGNER",
    copy: (
      <>
        I enjoy crafting <span className="key-underline">intuitive</span> digital experiences, from
        <span className="key-underline"> brand identities and design systems</span> to interfaces
        that people genuinely enjoy using.
      </>
    ),
    skills: 'ui/ux, figma, photoshop, branding, design systems',
    cards: [
      { title: 'brand identity', image: '/assets/designer-cards/Brand Identity.png' },
      { title: 'ui/ux & design systems', image: '/assets/designer-cards/uiux.png' },
      { title: 'illustrations & visual design', image: '/assets/designer-cards/illustrations & visual design.png' },
    ],
  },
  {
    id: 'developer',
    label: 'developer',
    heading: "I'M A DEVELOPER",
    copy: (
      <>
        I enjoy turning ideas into functional products through <span className="key-underline">code</span>.
        From <span className="key-underline">frontend</span> websites to <span className="key-underline">mobile</span> apps to
        <span className="key-underline"> full-stack</span> systems, I love building
        <span className="key-underline"> intuitive</span> solutions.
      </>
    ),
    skills: 'react, react native, next.js, nestjs, python, mysql',
    cards: [
      {
        title: 'frontend & mobile development',
        image: '/assets/developer-cards/frontend & mobile development.png',
      },
      { title: 'fullstack systems', image: '/assets/developer-cards/Fullstack Systems.png' },
      { title: 'AI systems', image: '/assets/developer-cards/AI systems.png' },
    ],
  },
  {
    id: 'educator',
    label: 'educator',
    heading: "I'M AN EDUCATOR",
    copy: (
      <>
        Teaching has taught me how to break down complex ideas, <span className="key-underline">communicate</span>
        clearly, and <span className="key-underline">inspire creativity</span>. I enjoy guiding students
        through <span className="key-underline">coding</span>, <span className="key-underline">game design</span>, and
        <span className="key-underline"> problem-solving</span> in a hands-on learning environment.
      </>
    ),
    skills: 'Teaching, Curriculum Design, Problem Solving, Mentorship, Game Design',
    cards: [
      { title: 'teaching & mentoring', image: '/assets/educator-cards/Teaching & Mentoring.png' },
      { title: 'curriculum design', image: '/assets/educator-cards/Curriculum Design.png' },
      { title: 'workshops & camps', image: '/assets/educator-cards/Workshops & Camps.png' },
    ],
  },
  {
    id: 'creator',
    label: 'content creator',
    heading: "I'M A CREATOR",
    copy: (
      <>
        Content creation allows me to <span className="key-underline">combine design, storytelling, and marketing</span>.
        From producing TikTok videos, building a <span className="key-underline">brand identity</span>, to
        <span className="key-underline"> experimenting</span> with new content formats, I love creating
        engaging & interesting content
      </>
    ),
    skills: 'Content Creation, Brand Building, Social Media Marketing, Storytelling, Video Editing',
    cards: [
      { title: 'jiakerz', image: '/assets/content-creation-cards/Jiakerz.png' },
      { title: "jiakerz's branding & identity", image: '/assets/content-creation-cards/Branding & Identity.png' },
      { title: 'content production', image: '/assets/content-creation-cards/Content Production.png' },
    ],
  },
];

const skillLogos = [
  { name: 'React', image: '/assets/skill-logos/react.png' },
  { name: 'Figma', image: '/assets/skill-logos/figma.png' },
  { name: 'Photoshop', image: '/assets/skill-logos/photoshop.png' },
  { name: 'JavaScript', image: '/assets/skill-logos/javascript.jpg' },
  { name: 'Webflow', image: '/assets/skill-logos/webflow.png' },
];

const experiences = [
  {
    company: 'ADTRO MEDIA',
    year: '2024-2025',
    role: 'Lead Frontend Developer & UI/UX Designer',
    learnMore: '/projects/adtro',
    tags: ['ReactJS', 'React Native', 'Figma', 'Electron'],
    image: '/assets/jobs/adtro_live.png',
    summary: "I designed and developed Adtro's livestreaming ecosystem across web, mobile, and desktop platforms.",
    bullets: [
      'Built and maintained web, mobile, and desktop applications using ReactJS, React Native, Next.js, and Electron.',
      "Led UI/UX design for Adtro's ecosystem and established a scalable design system.",
      'Developed and tested multi-platform livestreaming features across YouTube, Facebook, and Instagram.',
    ],
  },
  {
    company: 'LCCL CODING ACADEMY',
    year: '2023-Present',
    learnMore: '/projects/gameDesignCamp',
    role: 'Senior Coding Instructor',
    tags: ['Teaching', 'Curriculum Design', 'Problem Solving', 'Scratch'],
    image: '/assets/jobs/lccl.png',
    summary: 'Teaching coding, computational thinking, and game design to students aged 4-16 through hands-on projects and interactive lessons.',
    bullets: [
      'Designed and launched custom Game Design curriculum focused on creativity, worldbuilding, pixel art, animation, and prototyping.',
      'Taught Scratch Jr, Scratch, and beginner programming concepts to students aged 4-16, teaching problem-solving, debugging, and computational thinking.',
      'Independently planned and facilitated holiday coding camps and workshops.',
    ],
  },
  {
    company: 'ABC COOKING STUDIO',
    year: '2022-2023',
    role: 'Full Stack Developer Intern',
    tags: ['Next.js', 'NestJS', 'TypeORM', 'MySQL', 'Webflow'],
    image: '/assets/jobs/pos.png',
    summary: 'Developed internal business systems and customer-facing solutions supporting POS operations, class bookings, and business workflows.',
    bullets: [
      'Contributed to POS system revamp using Next.js, NestJS, and TypeORM.',
      "Built a customer-facing class booking kiosk for ABC Cooking Studio's Jewel outlet.",
      'Developed reusable UI components and integrated backend APIs.',
    ],
  },
];

const opportunities = [
  {
    title: 'Full-Time Roles',
    copy: 'Seeking opportunities in UI/UX Design, Frontend Development, and Product Design.',
    color: '#e7aa2f',
  },
  {
    title: 'Projects & Collaborations',
    copy: 'Open to freelance work, student projects, hackathons, and creative collaborations.',
    color: '#45dc86',
  },
  {
    title: 'Coffee Chats',
    copy: 'Always happy to talk about design, development, education, and creative ideas.',
    color: '#f24d57',
  },
];

function App() {
  const [activeExperience, setActiveExperience] = useState(0);
  const [activeAbout, setActiveAbout] = useState(0);
  const projectsRef = useRef(null);
  const pageRef = useRef(null);
  const { pathname, hash } = useLocation();
  const isProjectsPage = pathname.startsWith('/projects');
  const current = experiences[activeExperience];
  const about = aboutScreens[activeAbout];

  useLayoutEffect(() => {
    if (hash) {
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    anime.timeline({ easing: 'easeOutExpo' })
      .add({
        targets: pageRef.current?.querySelectorAll('[data-landing-word]'),
        opacity: [0, 1],
        translateY: [28, 0],
        duration: 760,
        delay: anime.stagger(90),
      })
      .add({
        targets: pageRef.current?.querySelectorAll('[data-landing-highlight]'),
        opacity: [0, 1],
        translateY: [16, 0],
        duration: 480,
        delay: anime.stagger(70),
      }, '-=420');
    return undefined;
  }, []);

  useEffect(() => {
    const section = projectsRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            anime.timeline({ easing: 'easeOutExpo' })
              .add({
                targets: section.querySelector('h2'),
                opacity: [0, 1],
                translateY: [26, 0],
                duration: 550,
              })
              .add({
                targets: section.querySelectorAll('.project-row'),
                opacity: [0, 1],
                translateX: (element) => (element.dataset.direction === 'left' ? [-110, 0] : [110, 0]),
                duration: 780,
                delay: anime.stagger(180),
              }, '-=220')
              .add({
                targets: section.querySelectorAll('.project-card h3'),
                opacity: [0, 1],
                translateY: [18, 0],
                duration: 420,
                delay: anime.stagger(75),
              }, '-=420');
          }
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    anime({
      targets: pageRef.current?.querySelectorAll('[data-about-title], .about-copy .key-underline'),
      opacity: [0, 1],
      translateY: [18, 0],
      delay: anime.stagger(60),
      duration: 460,
      easing: 'easeOutExpo',
    });
    return undefined;
  }, [activeAbout]);

  const navLinks = [
    ['projects', '/projects'],
    ['about', '/#about'],
    ['experience', '/#work'],
    ['contact me', '/#contact'],
  ];

  function moveExperience(direction) {
    setActiveExperience((index) => (index + direction + experiences.length) % experiences.length);
  }

  return (
    <main ref={pageRef}>
      <Header LogoStar={LogoStar} navLinks={navLinks} />
      <Routes>
        <Route path="/" element={(
          <>
            <HeroSection RedStar={RedStar} WhiteStar={WhiteStar} />
            <ProjectsSection projectRows={recentProjectRows} projectsRef={projectsRef} />
            <SkillsMarquee skillLogos={skillLogos} />
            <AboutSection about={about} aboutScreens={aboutScreens} activeAbout={activeAbout} onSelectAbout={setActiveAbout} />
            <ExperienceSection current={current} experiences={experiences} activeExperience={activeExperience} onMove={moveExperience} />
            <ContactSection opportunities={opportunities} CardStar={CardStar} />
          </>
        )} />
        <Route path="/projects" element={<ProjectsPage projects={projects} />} />
        <Route path="/projects/:projectId" element={<ProjectPage projects={projects} />} />
        <Route path="/projects/:projectId/:tabId" element={<ProjectPage projects={projects} />} />
        <Route path="*" element={<ProjectsPage projects={projects} />} />
      </Routes>
      <Footer />
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
