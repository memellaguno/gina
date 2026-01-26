/**
 * Migration Script: HTML to Sanity
 *
 * This script extracts content from the Gina Diez Barroso HTML website
 * and creates Sanity documents ready for import.
 *
 * Usage:
 * 1. Run: npx ts-node scripts/migrate-html-content.ts
 * 2. This will output NDJSON files for each page
 * 3. Import images first using Sanity CLI or upload manually
 * 4. Then import the NDJSON: sanity dataset import ./migration-output/pages.ndjson
 */

import * as fs from 'fs';
import * as path from 'path';

// Helper to generate unique IDs
function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

// Image references - you'll need to upload these to Sanity first and update the refs
const IMAGE_REFS: Record<string, string> = {
  // Home page images
  'gina-home.png': 'image-PLACEHOLDER-gina-home',
  'video-1.png': 'image-PLACEHOLDER-video-1',
  'initiative.jpg': 'image-PLACEHOLDER-initiative',
  'logo-1.png': 'image-PLACEHOLDER-logo-1',
  'logo-2.png': 'image-PLACEHOLDER-logo-2',
  'logo-3.png': 'image-PLACEHOLDER-logo-3',
  'logo-4.png': 'image-PLACEHOLDER-logo-4',
  'logo-5.png': 'image-PLACEHOLDER-logo-5',
  'logo-6.png': 'image-PLACEHOLDER-logo-6',
  'logo-7.png': 'image-PLACEHOLDER-logo-7',
  'image_1.png': 'image-PLACEHOLDER-image-1',
  'image_2.png': 'image-PLACEHOLDER-image-2',
  'image_3.png': 'image-PLACEHOLDER-image-3',
  // About page images
  'about-gina.png': 'image-PLACEHOLDER-about-gina',
  'bio1.jpg': 'image-PLACEHOLDER-bio1',
  'bio2.png': 'image-PLACEHOLDER-bio2',
  'bio3.png': 'image-PLACEHOLDER-bio3',
  'bio4.png': 'image-PLACEHOLDER-bio4',
  'bio6.png': 'image-PLACEHOLDER-bio6',
  'gina-world.jpg': 'image-PLACEHOLDER-gina-world',
  'boards-1.png': 'image-PLACEHOLDER-boards-1',
  'boards-2.png': 'image-PLACEHOLDER-boards-2',
  // Add more as needed
};

// Create image reference object
function createImageRef(imageName: string, alt: string = 'Image') {
  return {
    _type: 'image',
    alt,
    asset: {
      _type: 'reference',
      _ref: IMAGE_REFS[imageName] || `image-PLACEHOLDER-${imageName.replace(/\.[^/.]+$/, '')}`,
    },
  };
}

// ============ HOME PAGE ============
const homePageBlocks = [
  // Hero Home
  {
    _key: generateId(),
    _type: 'heroHome',
    tagline: 'A PIONEERING CREATIVE',
    heading: 'INSPIRING\nTOMORROW\'S\nVISIONARIES',
    taglineEn: 'A PIONEERING CREATIVE',
    headingEn: 'INSPIRING\nTOMORROW\'S\nVISIONARIES',
    backgroundImage: createImageRef('gina-home.png', 'Gina Diez Barroso'),
    overlayGradient: true,
  },
  // Intro Text
  {
    _key: generateId(),
    _type: 'introText',
    eyebrow: 'BREAKING BOUNDARIES, BUILDING LEGACIES',
    heading: 'A GLOBAL BUSINESS LEADER AND PHILANTHROPIST, GINA DIEZ BARROSO IS BREAKING BOUNDARIES IN DESIGN, INNOVATION, AND EDUCATION TO CREATE LASTING CHANGE.',
    eyebrowEn: 'BREAKING BOUNDARIES, BUILDING LEGACIES',
    headingEn: 'A GLOBAL BUSINESS LEADER AND PHILANTHROPIST, GINA DIEZ BARROSO IS BREAKING BOUNDARIES IN DESIGN, INNOVATION, AND EDUCATION TO CREATE LASTING CHANGE.',
  },
  // Video Gallery
  {
    _key: generateId(),
    _type: 'videoGallery',
    videos: [
      {
        _key: generateId(),
        title: 'Video 1',
        titleEn: 'Video 1',
        poster: createImageRef('video-1.png', 'Video thumbnail'),
      },
      {
        _key: generateId(),
        title: 'Video 2',
        titleEn: 'Video 2',
        poster: createImageRef('video-1.png', 'Video thumbnail'),
      },
      {
        _key: generateId(),
        title: 'Video 3',
        titleEn: 'Video 3',
        poster: createImageRef('video-1.png', 'Video thumbnail'),
      },
    ],
  },
  // Featured Initiative - Dalia
  {
    _key: generateId(),
    _type: 'featuredInitiative',
    eyebrow: 'MY LATEST INITIATIVE',
    title: 'DALIA',
    description: 'Dalia is a community for women that helps them tap into their strength and guide their lives with intention.',
    buttonText: 'Learn more',
    eyebrowEn: 'MY LATEST INITIATIVE',
    titleEn: 'DALIA',
    descriptionEn: 'Dalia is a community for women that helps them tap into their strength and guide their lives with intention.',
    buttonTextEn: 'Learn more',
    image: createImageRef('initiative.jpg', 'Dalia initiative'),
    imagePosition: 'right',
  },
  // Intro Text - Shaping
  {
    _key: generateId(),
    _type: 'introText',
    eyebrow: '',
    heading: 'Shaping the future with courage and creativity.',
    eyebrowEn: '',
    headingEn: 'Shaping the future with courage and creativity.',
  },
  // Logo Marquee
  {
    _key: generateId(),
    _type: 'logoMarquee',
    logos: [
      { _key: generateId(), name: 'DIARQ', image: createImageRef('logo-1.png', 'DIARQ logo') },
      { _key: generateId(), name: 'Centro', image: createImageRef('logo-2.png', 'Centro logo') },
      { _key: generateId(), name: 'Diez Company', image: createImageRef('logo-3.png', 'Diez Company logo') },
      { _key: generateId(), name: 'Dalia', image: createImageRef('logo-4.png', 'Dalia logo') },
      { _key: generateId(), name: 'Fundar Centro', image: createImageRef('logo-5.png', 'Fundar Centro logo') },
      { _key: generateId(), name: 'Logo 6', image: createImageRef('logo-6.png', 'Logo') },
      { _key: generateId(), name: 'Logo 7', image: createImageRef('logo-7.png', 'Logo') },
    ],
  },
  // CTA Banner - Speaking
  {
    _key: generateId(),
    _type: 'ctaBanner',
    style: 'speaking',
    eyebrow: 'Speaking Opportunities & Inquiries',
    heading: 'For conferences, panels, or\ncollaborations.',
    buttonText: "Let's Connect",
    eyebrowEn: 'Speaking Opportunities & Inquiries',
    headingEn: 'For conferences, panels, or\ncollaborations.',
    buttonTextEn: "Let's Connect",
  },
  // Image Slider - Legacy in Motion
  {
    _key: generateId(),
    _type: 'imageSlider',
    eyebrow: 'Recognized by institutions around the world',
    heading: 'Legacy in Motion',
    eyebrowEn: 'Recognized by institutions around the world',
    headingEn: 'Legacy in Motion',
    images: [
      { _key: generateId(), ...createImageRef('image_1.png', 'Award photo'), caption: '' },
      { _key: generateId(), ...createImageRef('image_2.png', 'Award photo'), caption: '' },
      { _key: generateId(), ...createImageRef('image_3.png', 'Award photo'), caption: '' },
    ],
    showProgressBar: true,
  },
  // CTA Banner - Newsletter
  {
    _key: generateId(),
    _type: 'ctaBanner',
    style: 'newsletter',
    eyebrow: '',
    heading: 'LEARN & CONNECT',
    subheading: 'Join me on the journey.\nLetter from Gina: personal reflections & resources',
    buttonText: 'SIGN UP',
    eyebrowEn: '',
    headingEn: 'LEARN & CONNECT',
    subheadingEn: 'Join me on the journey.\nLetter from Gina: personal reflections & resources',
    buttonTextEn: 'SIGN UP',
  },
];

// ============ ABOUT PAGE ============
const aboutPageBlocks = [
  // Hero About
  {
    _key: generateId(),
    _type: 'heroAbout',
    tagline: 'LEAD. CREATE. TRANSFORM.',
    heading: "REDEFINING WHAT'S POSSIBLE: BUILDING LEGACIES WITH VISION, COURAGE, AND PURPOSE.",
    introText: 'Gina Diez Barroso is a businesswoman and philanthropist focused on developing projects in design, innovation and education.',
    taglineEn: 'LEAD. CREATE. TRANSFORM.',
    headingEn: "REDEFINING WHAT'S POSSIBLE: BUILDING LEGACIES WITH VISION, COURAGE, AND PURPOSE.",
    introTextEn: 'Gina Diez Barroso is a businesswoman and philanthropist focused on developing projects in design, innovation and education.',
    image: createImageRef('about-gina.png', 'Gina Diez Barroso'),
    showDecorativeDots: true,
  },
  // Bio sections as Quote blocks (simplified approach)
  {
    _key: generateId(),
    _type: 'quote',
    quoteText: 'Founder of Grupo Diarq, a prestigious design and real estate development company with offices in Mexico and the United States. Gina is also founder and president of CENTRO, Mexico\'s first university dedicated to Design, Media, and Technology with a strong emphasis in business and entrepreneurship.',
    quoteTextEn: 'Founder of Grupo Diarq, a prestigious design and real estate development company with offices in Mexico and the United States. Gina is also founder and president of CENTRO, Mexico\'s first university dedicated to Design, Media, and Technology with a strong emphasis in business and entrepreneurship.',
  },
  // Logo Grid - Boards
  {
    _key: generateId(),
    _type: 'logoGrid',
    heading: 'Boards & Advisory Roles',
    headingEn: 'Boards & Advisory Roles',
    logos: [
      { _key: generateId(), name: 'Banco Santander', image: createImageRef('boards-1.png', 'Banco Santander logo') },
      { _key: generateId(), name: 'Mexican Stock Exchange', image: createImageRef('boards-2.png', 'BMV logo') },
    ],
  },
];

// Create page documents
const pages = [
  {
    _id: 'page-home',
    _type: 'page',
    name: 'Home',
    slug: { _type: 'slug', current: 'home' },
    isHome: { status: true },
    pageBuilder: homePageBlocks,
  },
  {
    _id: 'page-about',
    _type: 'page',
    name: 'About Gina',
    slug: { _type: 'slug', current: 'about' },
    isHome: { status: false },
    pageBuilder: aboutPageBlocks,
  },
  {
    _id: 'page-initiatives',
    _type: 'page',
    name: 'Initiatives',
    slug: { _type: 'slug', current: 'initiatives' },
    isHome: { status: false },
    pageBuilder: [], // To be filled with initiatives accordion
  },
  {
    _id: 'page-perspectives',
    _type: 'page',
    name: 'Perspectives',
    slug: { _type: 'slug', current: 'perspectives' },
    isHome: { status: false },
    pageBuilder: [],
  },
  {
    _id: 'page-contact',
    _type: 'page',
    name: 'Contact',
    slug: { _type: 'slug', current: 'contact' },
    isHome: { status: false },
    pageBuilder: [],
  },
];

// Output directory
const outputDir = path.join(__dirname, '../migration-output');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write NDJSON file
const ndjsonContent = pages.map(page => JSON.stringify(page)).join('\n');
fs.writeFileSync(path.join(outputDir, 'pages.ndjson'), ndjsonContent);

console.log('✓ Migration files created in /migration-output/');
console.log('');
console.log('Next steps:');
console.log('1. Upload images to Sanity using the Media plugin or CLI');
console.log('2. Update IMAGE_REFS in this script with actual Sanity asset IDs');
console.log('3. Re-run the script to generate updated NDJSON');
console.log('4. Import: sanity dataset import ./migration-output/pages.ndjson --replace');
console.log('');
console.log('Or manually copy content from Sanity Studio using the generated structure as reference.');
