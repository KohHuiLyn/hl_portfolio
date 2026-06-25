// Replace any null value below with a public asset path, for example:
// '/assets/projects/adtro/mobile-setup.png'. Grey placeholders render until then.
const adtroCaseStudyAssets = {
  ecosystem: [
    '/assets/projects/adtro/overview/Adtro Preview Mobile(3).png',
    '/assets/projects/adtro/overview/Mobile.png',
    '/assets/projects/adtro/overview/web portal.png',
  ],
  brandIdentity: '/assets/projects/adtro/design/logo and brand identity.png',
  informationWebsite: '/assets/projects/adtro/infomation website/Adtro Preview Mobile(3).png',
  mobileFlow: '/assets/projects/adtro/mobile dev/adtro_live.png',
  mobileScreens: [
    '/assets/projects/adtro/mobile dev/gallery/1.png',
    '/assets/projects/adtro/mobile dev/gallery/2.png',
    '/assets/projects/adtro/mobile dev/gallery/3.png',
    '/assets/projects/adtro/mobile dev/gallery/4.png',
    '/assets/projects/adtro/mobile dev/gallery/5.png',
    '/assets/projects/adtro/mobile dev/Mobile Streaming.png',
  ],
  portal: '/assets/projects/adtro/web portal/gallery/2.png',
  portalScreens: [
    '/assets/projects/adtro/web portal/gallery/1.png',
    '/assets/projects/adtro/web portal/gallery/2.png',
    '/assets/projects/adtro/web portal/gallery/3.png',
    '/assets/projects/adtro/web portal/gallery/livestream.jpg',
    '/assets/projects/adtro/web portal/gallery/comments.jpg',
  ],
  desktop: '/assets/projects/adtro/desktop app/main.jpg',
  highlights: [
    '/assets/projects/adtro/highlight/Mobile Streaming.png',
    '/assets/projects/adtro/highlight/web portal.png',
    '/assets/projects/adtro/highlight/design language system.png',
    '/assets/projects/adtro/highlight/figma.png',
  ],
};

function galleryCaseStudy({ title, description, images, videos = [], featureSections = [], galleryTitle = 'Screens', galleryVariant, accent = 'blue' }) {
  return {
    sections: [
      { type: 'text', title: 'Overview', eyebrow: 'Project', body: description, accent },
      ...videos.map((video) => ({ type: 'video', accent, ...video })),
      ...featureSections,
      { type: 'gallery', title: galleryTitle, accent: accent === 'blue' ? 'red' : 'blue', images: images.map((src, index) => ({ id: `${title}-${index}`, src, alt: `${title} ${galleryTitle.toLowerCase()} ${index + 1}`, variant: galleryVariant })) },
    ],
  };
}

const styleSphereScreens = [
  '/assets/projects/stylesphere/design/dls.png',
  '/assets/projects/stylesphere/mobile screenshot/stylesphere.png',
  '/assets/projects/stylesphere/mobile screenshot/stylesphere(1).png',
  '/assets/projects/stylesphere/mobile screenshot/stylesphere(2).png',
  '/assets/projects/stylesphere/mobile screenshot/stylesphere(3).png',
  '/assets/projects/stylesphere/mobile screenshot/stylesphere(4).png',
  '/assets/projects/stylesphere/mobile screenshot/stylesphere(5).png',
  '/assets/projects/stylesphere/mobile screenshot/stylesphere(6).png',
  '/assets/projects/stylesphere/mobile screenshot/stylesphere(7).png',
  '/assets/projects/stylesphere/mobile screenshot/stylesphere(8).png',
  '/assets/projects/stylesphere/mobile screenshot/stylesphere(9).png',
  '/assets/projects/stylesphere/mobile screenshot/stylesphere(10).png',
  '/assets/projects/stylesphere/mobile screenshot/stylesphere(11).png',
  '/assets/projects/stylesphere/mobile screenshot/stylesphere(12).png',
  '/assets/projects/stylesphere/mobile screenshot/stylesphere(13).png',
  '/assets/projects/stylesphere/mobile screenshot/stylesphere(14).png',
];

const plantPalScreens = [
  '/assets/projects/plantpal/design/design.png',
  '/assets/projects/plantpal/mobile_screenshots/plantpal.png',
  ...Array.from({ length: 14 }, (_, index) => `/assets/projects/plantpal/mobile_screenshots/plantpal(${index + 1}).png`),
];

const eloScreens = Array.from({ length: 14 }, (_, index) => `/assets/projects/elo/screenshots/${index + 1}_${[
  'Login', 'Register', 'FindTournament_No_Champion', 'FindTournament_Champion_Modal', 'FindTournament_Champion_Selected', 'FindTournament_In_Queue', 'FindTournament_Speedup_Queue_Modal', 'TournamentBracket', 'TournamentBracket_Modal', 'TournamentBracket_Next_Round', 'Postgame', 'History', 'Profile', 'Profile_Edit_Profile',
][index]}.png`);

export const projects = [
  {
    id: 'adtro',
    title: 'Adtro',
    tags: ['Web Dev', 'Mobile Dev', 'UI/UX', 'User Research', 'ReactJS', 'React Native', 'Next.js', 'Electron', 'Logo', 'Figma', 'Asset Creation'],
    image: '/assets/projects/project-thumbnails/Adtro.png',
    accent: '#ee7041',
    description: 'Livestream commerce platform for multistreaming, product management, and business operations.',
    caseStudy: {
      tabs: [
        {
          id: 'overview',
          label: 'Overview',
          sections: [
            {
              type: 'text',
              title: 'Overview',
              accent: 'blue',
              body: [
                'Adtro is a livestream commerce platform that enables creators and businesses to stream across YouTube, Facebook, and Instagram while managing products, audience engagement, and business operations from a single ecosystem.',
                'I contributed across the web portal, mobile application, desktop application, and information website, working on both UI/UX design and frontend development.',
              ],
            },
            {
              type: 'gallery',
              title: 'Products',
              accent: 'red',
              images: adtroCaseStudyAssets.ecosystem.map((src, index) => ({
                id: `ecosystem-${index}`,
                src,
                alt: 'Adtro ecosystem preview',
              })),
            },
            {
              type: 'role',
              title: 'My role',
              role: 'Lead Frontend Developer & UI/UX Designer',
              year: '2024 - 2025',
              accent: 'green',
              body: 'I was responsible for shaping both the visual direction and technical implementation of key parts of the Adtro ecosystem, contributing across UI/UX design, frontend development, desktop applications, and livestreaming infrastructure.',
              tools: [
                'ReactJS',
                'React Native',
                'Next.js',
                'Electron',
                'Figma',
                'Flask',
                'FFmpeg',
                'NGINX'
              ],
              contributions: [
                'Designed web and mobile product interfaces',
                'Built frontend features across web, mobile, and desktop platforms',
                'Created and maintained Adtro’s design system',
                'Developed livestreaming workflows and media pipelines',
                'Implemented FFmpeg-based camera capture and stream processing',
                'Built Flask services that interfaced with NGINX streaming infrastructure',
                'Contributed to multi-platform streaming across YouTube, Facebook, and Instagram',
                'Designed brand assets, marketing visuals, and presentation decks'
              ]
            },
            {
              type: 'carousel',
              title: 'Highlights',
              accent: 'orange',
              images: adtroCaseStudyAssets.highlights.map((src, index) => ({
                id: `highlight-${index}`,
                src,
                alt: 'Adtro highlight',
              })),
            },
          ],
        },
        {
          id: 'design',
          label: 'Design',
          tags: ['Logo', 'Asset Creation', 'UI/UX', 'User Research', 'Figma'],
          sections: [
            {
              type: 'text',
              title: 'Design',
              accent: 'green',
              body: [
                'As Lead UI/UX Designer, I helped shape Adtro’s visual identity and product experience across web, mobile, and desktop platforms.',
                'My work included logo design, brand assets, marketing materials, design system creation, prototyping, and interface design for both web and mobile products.',
                'Working closely with stakeholders and developers, I translated ideas, sketches, and business requirements into interactive Figma prototypes and polished user experiences.',
              ],
            },
            {
              type: 'imageText',
              title: 'Logo & Brand Identity',
              accent: 'blue',
              image: adtroCaseStudyAssets.brandIdentity,
              body: 'Designed Adtro’s visual identity, including logo exploration, colour direction, typography choices, and supporting brand assets. The goal was to create a modern and trustworthy brand language that could scale across products, marketing materials, pitch decks, and customer-facing touchpoints.',
              imagePosition: 'right',
              layout: 'fullHeight',
            },
            {
              type: 'imageText',
              title: 'Design System',
              accent: 'green',
              image: '/assets/projects/adtro/design/design language system.png',
              body: 'Created a shared design language system consisting of reusable components, typography styles, colours, spacing rules, and UI patterns. This helped maintain consistency across the web portal, mobile application, desktop application, and future product expansions.',
              layout: 'stacked',
            },
            {
              type: 'imageText',
              title: 'Web & Mobile Design',
              accent: 'orange',
              image: '/assets/projects/adtro/design/uiux.png',
              body: 'Designed user flows, wireframes, and high-fidelity interfaces for both web and mobile products. The focus was on simplifying livestream setup, product management, and audience engagement workflows for creators and business users.',
            },
            {
              type: 'imageText',
              title: 'Prototyping',
              accent: 'red',
              image: '/assets/projects/adtro/design/figma.png',
              body: 'Translated rough meeting sketches, early ideas, and business requirements into user journeys and finally, into Figma prototypes. These prototypes helped align stakeholders, validate flows, and reduce ambiguity before development began.',
              imagePosition: 'right',
            },

          ],
        },
        {
          id: 'information-website',
          label: 'Information Website',
          tags: ['Figma', 'Asset Creation', 'UI/UX', 'Next.js', 'Webflow'],
          sections: [
            {
              type: 'longImageSidebar',
              title: 'Information Website',
              accent: 'orange',
              image: adtroCaseStudyAssets.informationWebsite,
              sidebar: {
                label: 'Marketing Website',
                title: 'Communicating the Ecosystem',
                body: 'Adtro’s product ecosystem includes livestreaming, product management, audience engagement, and business tools. I helped design and build a responsive marketing website that translated these capabilities into clear value propositions and product showcases.',
                items: [
                  'Responsive UI Design',
                  'Product Storytelling',
                  'Design System Integration',
                  'Frontend Development',
                ],
              },
            },
          ],
        },
        {
          id: 'mobile-development',
          label: 'Mobile Development',
          tags: ['React Native', 'Figma', 'Asset Creation', 'User Research'],
          sections: [
            {
              type: 'imageText',
              title: 'Mobile Experience',
              accent: 'blue',
              layout: 'fullHeight',
              image: adtroCaseStudyAssets.mobileFlow,
              body: 'Designed and developed mobile workflows that allowed creators to manage livestreams, products, and audience interactions with minimal friction. The focus was on keeping key actions accessible during live sessions while maintaining a clean and consistent interface.',
            },
            {
              type: 'video',
              title: 'Mobile Development Video',
              accent: 'green',
              src: '/assets/projects/adtro/mobile dev/adtro.mp4',
              body: 'This video showcases a user journey of a Livestreamer, where they go Live on Instagram and Youtube at the same time using Adtro\'s mobile app. They are able to receive and send out comments through Adtro.',
            },
            {
              type: 'gallery',
              title: 'Mobile Screens',
              accent: 'blue',
              images: adtroCaseStudyAssets.mobileScreens.map((src, index) => ({ id: `adtro-mobile-${index}`, src, alt: `Adtro mobile screen ${index + 1}`,  })),
            },
          ],
        },
        {
          id: 'web-portal',
          label: 'Web Portal',
          tags: ['ReactJS', 'Figma', 'User Research', 'UI/UX', 'Web Dev'],
          sections: [
            {
              type: 'imageText',
              title: 'Web Portal',
              accent: 'blue',
              image: adtroCaseStudyAssets.portal,
                body: 'The web portal acts as the operational hub for managing livestream commerce activities, bringing together product management, bookings, CRM, and livestream controls in one workspace.',

            },
            {
              type: 'gallery',
              title: 'Gallery',
              accent: 'green',
              images: adtroCaseStudyAssets.portalScreens.map((src, index) => ({ id: `adtro-portal-${index}`, src, alt: `Adtro web portal view ${index + 1}` })),
            },
          ],
        },
        {
          id: 'desktop-app',
          label: 'Desktop App',
          tags: ['Electron'],
          sections: [
            {
              type: 'imageText',
              title: 'Desktop Application',
              accent: 'red',
              image: adtroCaseStudyAssets.desktop,
              body: 'The desktop application supports livestreamers who require a multi-camera setup. It allows users to switch cameras, add overlays while streaming. Built with Electron and ReactJS, it extended Adtro’s ecosystem beyond web and mobile while maintaining consistency with the shared design system.',
            },

          ],
        },
      ],
    },
  },

  {
    id: 'stylesphere',
    title: 'StyleSphere',
    tags: ['UI/UX', 'Mobile Dev', 'Web Dev', 'User Research', 'React Native', 'Next.js', 'Figma'],
    image: '/assets/projects/project-thumbnails/Stylesphere.png',
    accent: '#4cc7a6',
    description: 'Fashion discovery app with personalised recommendations and visual-fit shopping flows. A user could "Try on" a piece of clothing by uploading an image of their body and our AI powered Virtual Try-on would add the clothing onto their body. I contributed by making the UI/UX design and frontend development for the mobile and web application, creating a design system, and conducting user research to validate design decisions.',
    caseStudy: {
      sections: [
        {
          type: 'text',
          title: 'Overview',
          eyebrow: 'Project',
          body: 'StyleSphere is a fashion discovery platform designed to help users find clothing that matches their personal style through personalized recommendations and visual-fit features. I worked on the UI/UX design and frontend development for both the mobile and web experience, creating a reusable design system and conducting user research to validate key design decisions.',
          accent: 'green',
        },
        {
          type: 'imageText',
          title: 'Design System',
          accent: 'green',
          image: '/assets/projects/stylesphere/design/dls.png',
          body: 'Created a reusable design language to maintain visual consistency across shopping, discovery, profile, and recommendation flows.',
          layout: 'stacked',
        },
        {
          type: 'video',
          title: 'StyleSphere Story',
          accent: 'green',
          url: 'https://youtu.be/A31TnrKR1j8',
          body: 'A short promotional video for StyleSphere, highlighting the app’s features, user experience, and design philosophy.',
        },
        {
          type: 'gallery',
          title: 'Product Screens',
          accent: 'blue',
          images: styleSphereScreens.slice(1).map((src, index) => ({
            id: `stylesphere-mobile-${index}`,
            src,
            alt: `StyleSphere mobile screen ${index + 1}`,
            variant: 'mobile',
          })),
        },
      ],
    },
  },

  {
    id: 'postloo',
    title: 'PostLoo',
    tags: ['UI/UX', 'Kotlin', 'User Research', 'Computer Vision', 'MediaPipe', 'Figma', 'Asset Creation'],
    image: '/assets/projects/project-thumbnails/Toilet Troubles.png',
    accent: '#5f615f',
    description: 'PostLoo is an iPad application that reimagines how users rate public restrooms using computer vision and gesture recognition. The project focused on creating a faster and more engaging feedback experience. I contributed to the UI/UX design, user research, gesture-recognition implementation, and mascot animations that gave the product a playful personality.',
    caseStudy: {
      sections: [
        { type: 'text', title: 'Overview', eyebrow: 'Project', body: 'PostLoo is a restroom review app that uses computer vision gesture recognition to make rating public toilets faster and more accessible. I contributed to the UI/UX design, Mascot Animation and user research phases.', accent: 'blue' },
        { type: 'video', title: 'Project Story', accent: 'green', url: 'https://www.youtube.com/watch?v=DmXfM5oUJ0c', body: 'Our journey making PostLoo from inspiration, to development, to final product showcasing the gesture-recognition rating flow.' },
        { type: 'video', title: 'Prototype Video', accent: 'blue', src: '/assets/projects/postloo/overview/20260409-0601-12.2969590.mp4', body: 'A emulated prototype recording of PostLoo simulating a user journey.' },
        { type: 'gallery', title: 'Product Shots', accent: 'red', images: [
          '/assets/projects/postloo/gallery/photo_1_2026-06-20_14-49-58.jpg',
          '/assets/projects/postloo/gallery/photo_2_2026-06-20_14-49-58.jpg',
          '/assets/projects/postloo/gallery/photo_3_2026-06-20_14-49-58.jpg',
          '/assets/projects/postloo/gallery/photo_4_2026-06-20_14-49-58.jpg',
          '/assets/projects/postloo/gallery/photo_5_2026-06-20_14-49-58.jpg',
          '/assets/projects/postloo/gallery/photo_6_2026-06-20_14-49-58.jpg',
          '/assets/projects/postloo/gallery/photo_2026-04-10_09-56-27.jpg',
        ].map((src, index) => ({ id: `postloo-shot-${index}`, src, alt: `PostLoo product shot ${index + 1}` })) },
      ],
    },
  },
  {
    id: 'splitr',
    title: 'Splitr',
    tags: ['UI/UX', 'Web Dev', 'Blockchain', 'Figma'],
    image: '/assets/projects/project-thumbnails/Splitr.png',
    accent: '#5f615f',
    description: 'Splitr is a blockchain-based revenue sharing platform built on Aptos that enables teams and collaborators to distribute earnings transparently through smart contracts. I designed the user experience and frontend interfaces, simplifying complex blockchain interactions into workflows that felt approachable for everyday users.',
  },
  {
    id: 'plantpal',
    title: 'PlantPal',
    tags: ['UI/UX', 'Mobile Dev', 'Figma', 'React Native', 'Computer Vision', 'User Research'],
    image: '/assets/projects/project-thumbnails/PlantPal.png',
    accent: '#5f615f',
    description: 'PlantPal is a mobile application that helps users identify plant health issues and receive care recommendations from a single photo. The project focused on making plant care more accessible through a simple and intuitive experience. I designed the mobile interface and user flows, balancing educational content with ease of use.',
    caseStudy: galleryCaseStudy({
      title: 'PlantPal',
      description: 'A mobile plant-care experience that helps users identify plant health issues from a picture and receive simple care guidance.',
      images: plantPalScreens,
      galleryTitle: 'Product Screens',
      galleryVariant: 'mobile',
      accent: 'green',
    }),
  },
  {
    id: 'cooked-fever',
    title: 'Cooked Fever',
    tags: ['Game Design', 'Asset Creation','Sound Design', 'Java'],
    image: '/assets/projects/project-thumbnails/Cooked Fever.png',
    accent: '#5f615f',
    description: 'Cooked Fever is a cooking-themed game where players prepare meals for customers under time pressure. Beyond developing the gameplay, I designed and illustrated all game assets from scratch, including food items, kitchen equipment, UI elements, and visual effects, giving the game a distinct handmade style.',
    caseStudy: {
      sections: [
        { type: 'text', title: 'Overview', eyebrow: 'Project', body: 'A cooking-themed game where players prepare meals for customers under time pressure using custom-drawn assets.', accent: 'red' },
        { type: 'video', title: 'Gameplay Video', accent: 'green', src: '/assets/projects/cooked_fever/main_video/IMG_5343.MP4', body: 'A gameplay recording of Cooked Fever in action.' },
        { type: 'gallery', title: 'Asset Library', accent: 'blue', images: ['/assets/projects/cooked_fever/assets/5.png', '/assets/projects/cooked_fever/assets/6.png'].map((src, index) => ({ id: `cooked-fever-asset-${index}`, src, alt: `Cooked Fever asset ${index + 1}` })) },
      ],
    },
  },
  {
    id: 'gameDesignCamp',
    title: "LCCL Game Design Curriculum",
    tags: ['Game Design', 'Teaching','Asset Creation', 'Sound Design'],
    image: '/assets/projects/project-thumbnails/Curriculum Design.png',
    accent: '#5f615f',
    description: 'I developed and taught a game design curriculum at LCCL Coding Academy, guiding students through the process of creating their own games like Planning, Pixel Art, Animation, Song composition, using accessible tools such as Piskel and Bandlab. The curriculum covered game mechanics, level design, asset creation, and sound design, culminating in a final project where students showcased their original game ideas. See more at: https://www.lcclcoding.com/holidays/game-design/',
    caseStudy: { type: 'text', title: 'Overview', eyebrow: 'Project', body: 'I developed and taught a game design curriculum at LCCL Coding Academy, guiding students through the process of creating their own games like Planning, Pixel Art, Animation, Song composition, using accessible tools such as Piskel and Bandlab. The curriculum covered game mechanics, level design, asset creation, and sound design, culminating in a final project where students showcased their original game ideas.', accent: 'red' },

  },
  {
    id: 'hex',
    title: "Hex's Adventure",
    tags: ['Game Design', 'Asset Creation', 'Sound Design', 'Godot'],
    image: '/assets/projects/hex/hex.png',
    accent: '#5f615f',
    description: 'A roguelike platformer where players control a witch navigating magical environments, built in Godot with custom game assets.',
  },
  {
    id: 'littlebunchclub',
    title: 'Little Bunch Club',
    tags: ['Logo', 'Asset Creation'],
    image: '/assets/projects/littlebunchclub/littlebunchclub_thumbnail.png',
    accent: '#5f615f',
    description: "Little Bunch Club is a florist brand identity project created for a small business specializing in handcrafted floral arrangements. The project involved logo exploration, moodboarding, typography selection, and visual identity development, resulting in a soft and approachable brand personality.",
    caseStudy: galleryCaseStudy({
      title: 'Little Bunch Club',
      description: "Logo design and moodboard exploration for a friend's florist business, focusing on a gentle, organic, and handcrafted visual identity.",
      images: ['/assets/projects/littlebunchclub/littlebunchclub_thumbnail.png'],
      videos: [{ title: 'TikTok Feature', url: 'https://www.tiktok.com/@littlebunchclub/video/7607476162826226965?is_from_webapp=1&sender_device=pc&web_id=7642371294017029650', body: 'A Little Bunch Club TikTok feature.' }],
      featureSections: [{ type: 'imageText', title: 'Moodboard', accent: 'green', image: '/assets/projects/littlebunchclub/moodboard/little bunch club.png', alt: 'Little Bunch Club moodboard', layout: 'fullHeight' }],
      galleryTitle: 'Brand Explorations',
      accent: 'green',
    }),
  },
  {
    id: 'elo',
    title: 'ELO Calculation System',
    tags: ['UI/UX', 'Web Dev', 'Figma', 'ReactJS', 'Java'],
    image: '/assets/projects/elo/screenshots/1_Login.png',
    accent: '#5f615f',
    description: 'The ELO Calculation System is a tournament management platform inspired by League of Legends, designed to handle player rankings, match history, brackets, and post-game reporting. I designed the UI/UX to closely reflect League\'s visual language while building frontend components and gathering assets to create a cohesive competitive gaming experience.',
    caseStudy: galleryCaseStudy({
      title: 'ELO Calculation System',
      description: 'A tournament ranking and match-tracking interface inspired heavily by League of Legends for managing queues, brackets, post-game results, and player profiles. I contributed by designing the UI/UX to match the League of Legends design system, gathering various assets, and building the frontend components.',
      images: eloScreens,
      galleryTitle: 'Product Screens',
      accent: 'blue',
    }),
  },
  {
    id: 'jiakerz',
    title: 'Jiakerz',
    tags: ['Content Creation','Storytelling', 'Asset Creation', 'Logo', 'Social Media'],
    image: '/assets/projects/jiakerz/Jiakerz.png',
    accent: '#5f615f',
    description: 'Jiakerz is a food discovery content brand co-founded with a close friend to share restaurant reviews, recommendations, and food experiences through short-form content. Through collaborations with restaurants and cafes, we produced marketing reels, slideshows, and social media content that accumulated over 150,000 views and 14,000+ likes across platforms.',
    caseStudy: galleryCaseStudy({
      title: 'Jiakerz',
      description: 'A food discovery content brand where I worked on content creation, visual identity, storytelling, and short-form social media engagement.',
      images: ['/assets/projects/jiakerz/Jiakerz.png'],
      videos: [{ title: 'TikTok Feature', url: 'https://www.tiktok.com/@jiakerz/photo/7576498775577922837?is_from_webapp=1&sender_device=pc&web_id=7642371294017029650', body: 'A Jiakerz TikTok feature.' }],
      galleryTitle: 'Featured Work',
      accent: 'red',
    }),
  },
  {
    id: 'third-eye',
    title: 'Third Eye',
    tags: ['Computer Vision', 'OpenCV', 'MediaPipe', 'Python'],
    image: '/assets/projects/project-thumbnails/Third Eye.png',
    accent: '#5f615f',
    description: 'Third Eye is a computer vision project developed to analyze bowling technique by measuring back angle and release timing. Using MediaPipe and pose estimation, the system helps bowlers identify whether their release was early, late, or on time, providing objective feedback that would otherwise require manual coaching analysis.',
    caseStudy: {
      sections: [
        { type: 'text', title: 'Overview', eyebrow: 'Project', body: 'A video showcase for Third Eye.', accent: 'blue' },
        { type: 'video', title: 'Project video', accent: 'green', url:'https://youtu.be/bgkVgXWEdUo', body: 'The Third Eye product video showcases the user journey through the application.' },
        { type: 'gallery', title: 'Gallery', accent: 'red', images: [
          '/assets/projects/third_eye/gallery/photo_2_2026-06-20_14-56-04.jpg',
          '/assets/projects/third_eye/gallery/photo_1_2026-06-20_14-56-04.jpg',
          '/assets/projects/third_eye/gallery/photo_3_2026-06-20_14-56-04.jpg',
          '/assets/projects/third_eye/gallery/poster.jpg',
          '/assets/projects/third_eye/gallery/timing.png',
          '/assets/projects/third_eye/gallery/backangle.png',
        ].map((src, index) => ({ id: `third-eye-shot-${index}`, src, alt: `Third Eye product shot ${index + 1}` })) },
      ],
    },
  },
];

export const recentProjects = projects.slice(0, 6);
export const recentProjectRows = [recentProjects.slice(0, 3), recentProjects.slice(3)];
