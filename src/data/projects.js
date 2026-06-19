export const projects = [
  {
    id: 'adtro',
    title: 'Adtro',
    tags: ['Frontend Dev', 'Mobile Dev', 'UI/UX'],
    image: '/assets/project-thumbnails/Adtro.png',
    accent: '#ee7041',
    description: 'Multistream with Business Management Features',
  },
  {
    id: 'stylesphere',
    title: 'StyleSphere',
    tags: ['UI/UX', 'User Research'],
    image: '/assets/project-thumbnails/Stylesphere.png',
    accent: '#4cc7a6',
    description: 'AI recommendations and visual-fit e-commerce app',
  },
  {
    id: 'postloo',
    title: 'PostLoo',
    tags: ['UI/UX', 'Kotlin', 'User Research', 'Computer Vision'],
    image: '/assets/project-thumbnails/Toilet Troubles.png',
    accent: '#5f615f',
    description: 'Toilet rating app using Computer Vision Gesture Recognition',
  },
  {
    id: 'splitr',
    title: 'Splitr',
    tags: ['UI/UX', 'Frontend Dev', 'Blockchain'],
    image: '/assets/project-thumbnails/Splitr.png',
    accent: '#5f615f',
    description: 'Revenue splitting on-chain using Aptos',
  },
  {
    id: 'plantpal',
    title: 'PlantPal',
    tags: ['UI/UX', 'Mobile Dev'],
    image: '/assets/project-thumbnails/PlantPal.png',
    accent: '#5f615f',
    description: 'Diagnose your plant health with just a picture',
  },
  {
    id: 'cooked-fever',
    title: 'Cooked Fever',
    tags: ['Assets & Sound Design', 'Java'],
    image: '/assets/project-thumbnails/Cooked Fever.png',
    accent: '#5f615f',
    description: 'Cook meals for customers within the time limit!',
  },
    {
    id: 'hex',
    title: 'Hex\'s Adventure',
    tags: ['Game Design','Assets & Sound Design', 'Godot'],
    image: '/assets/projects/hex/hex.png',
    accent: '#5f615f',
    description: 'Roguelike platformer where you play as a witch made in Godot!',
  },
      {
    id: 'littlebunchclub',
    title: 'Little Bunch Club',
    tags: ['Brand Identity', 'Logo'],
    image: '/assets/projects/littlebunchclub/littlebunchclub_thumbnail.png',
    accent: '#5f615f',
    description: 'Logo design for a friend\s florist business',
  },
];

export const recentProjects = projects.slice(0, 6);
export const recentProjectRows = [recentProjects.slice(0, 3), recentProjects.slice(3)];
