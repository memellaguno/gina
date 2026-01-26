/**
 * Migration Script: HTML to Sanity
 *
 * Generates NDJSON files that can be imported into Sanity.
 *
 * Usage:
 *   node scripts/migrate-html-content.js
 *
 * Then import:
 *   npx sanity dataset import ./migration-output/pages.ndjson production
 */

const fs = require('fs');
const path = require('path');

// Helper to generate unique IDs
function generateKey() {
  return Math.random().toString(36).substring(2, 10);
}

// ============================================
// HOME PAGE BLOCKS
// ============================================
const homePageBlocks = [
  // Hero Home
  {
    _key: generateKey(),
    _type: 'heroHome',
    tagline: 'A PIONEERING CREATIVE',
    heading: 'INSPIRING\nTOMORROW\'S\nVISIONARIES',
    taglineEn: 'A PIONEERING CREATIVE',
    headingEn: 'INSPIRING\nTOMORROW\'S\nVISIONARIES',
    overlayGradient: true,
    // Note: backgroundImage needs to be added manually after upload
  },
  // Intro Text
  {
    _key: generateKey(),
    _type: 'introText',
    eyebrow: 'BREAKING BOUNDARIES, BUILDING LEGACIES',
    heading: 'A GLOBAL BUSINESS LEADER AND PHILANTHROPIST, GINA DIEZ BARROSO IS BREAKING BOUNDARIES IN DESIGN, INNOVATION, AND EDUCATION TO CREATE LASTING CHANGE.',
    eyebrowEn: 'BREAKING BOUNDARIES, BUILDING LEGACIES',
    headingEn: 'A GLOBAL BUSINESS LEADER AND PHILANTHROPIST, GINA DIEZ BARROSO IS BREAKING BOUNDARIES IN DESIGN, INNOVATION, AND EDUCATION TO CREATE LASTING CHANGE.',
  },
  // Video Gallery
  {
    _key: generateKey(),
    _type: 'videoGallery',
    videos: [
      { _key: generateKey(), title: 'Video 1', titleEn: 'Video 1' },
      { _key: generateKey(), title: 'Video 2', titleEn: 'Video 2' },
      { _key: generateKey(), title: 'Video 3', titleEn: 'Video 3' },
    ],
  },
  // Featured Initiative - Dalia
  {
    _key: generateKey(),
    _type: 'featuredInitiative',
    eyebrow: 'MY LATEST INITIATIVE',
    title: 'DALIA',
    description: 'Dalia is a community for women that helps them tap into their strength and guide their lives with intention.',
    buttonText: 'Learn more',
    eyebrowEn: 'MY LATEST INITIATIVE',
    titleEn: 'DALIA',
    descriptionEn: 'Dalia is a community for women that helps them tap into their strength and guide their lives with intention.',
    buttonTextEn: 'Learn more',
    imagePosition: 'right',
  },
  // Intro Text - Shaping
  {
    _key: generateKey(),
    _type: 'introText',
    eyebrow: '',
    heading: 'Shaping the future with courage and creativity.',
    eyebrowEn: '',
    headingEn: 'Shaping the future with courage and creativity.',
  },
  // Logo Marquee
  {
    _key: generateKey(),
    _type: 'logoMarquee',
    logos: [
      { _key: generateKey(), name: 'DIARQ' },
      { _key: generateKey(), name: 'Centro' },
      { _key: generateKey(), name: 'Diez Company' },
      { _key: generateKey(), name: 'Dalia' },
      { _key: generateKey(), name: 'Fundar Centro' },
    ],
  },
  // CTA Banner - Speaking
  {
    _key: generateKey(),
    _type: 'ctaBanner',
    style: 'speaking',
    eyebrow: 'Speaking Opportunities & Inquiries',
    heading: 'For conferences, panels, or\ncollaborations.',
    buttonText: "Let's Connect",
    eyebrowEn: 'Speaking Opportunities & Inquiries',
    headingEn: 'For conferences, panels, or\ncollaborations.',
    buttonTextEn: "Let's Connect",
  },
  // Image Slider - Legacy
  {
    _key: generateKey(),
    _type: 'imageSlider',
    eyebrow: 'Recognized by institutions around the world',
    heading: 'Legacy in Motion',
    eyebrowEn: 'Recognized by institutions around the world',
    headingEn: 'Legacy in Motion',
    images: [],
    showProgressBar: true,
  },
  // CTA Banner - Newsletter
  {
    _key: generateKey(),
    _type: 'ctaBanner',
    style: 'newsletter',
    heading: 'LEARN & CONNECT',
    subheading: 'Join me on the journey.\nLetter from Gina: personal reflections & resources',
    buttonText: 'SIGN UP',
    headingEn: 'LEARN & CONNECT',
    subheadingEn: 'Join me on the journey.\nLetter from Gina: personal reflections & resources',
    buttonTextEn: 'SIGN UP',
  },
];

// ============================================
// ABOUT PAGE BLOCKS
// ============================================
const aboutPageBlocks = [
  // Hero About
  {
    _key: generateKey(),
    _type: 'heroAbout',
    tagline: 'LEAD. CREATE. TRANSFORM.',
    heading: "REDEFINING WHAT'S POSSIBLE: BUILDING LEGACIES WITH VISION, COURAGE, AND PURPOSE.",
    introText: 'Gina Diez Barroso is a businesswoman and philanthropist focused on developing projects in design, innovation and education.',
    taglineEn: 'LEAD. CREATE. TRANSFORM.',
    headingEn: "REDEFINING WHAT'S POSSIBLE: BUILDING LEGACIES WITH VISION, COURAGE, AND PURPOSE.",
    introTextEn: 'Gina Diez Barroso is a businesswoman and philanthropist focused on developing projects in design, innovation and education.',
    showDecorativeDots: true,
  },
  // Quote blocks for bio sections
  {
    _key: generateKey(),
    _type: 'quote',
    quoteText: 'Founder of Grupo Diarq, a prestigious design and real estate development company with offices in Mexico and the United States. Gina is also founder and president of CENTRO, Mexico\'s first university dedicated to Design, Media, and Technology with a strong emphasis in business and entrepreneurship. Founder of Diez Company, the leading commercial and residential lighting firm with operations in Mexico, Spain, and the United States.',
    quoteTextEn: 'Founder of Grupo Diarq, a prestigious design and real estate development company with offices in Mexico and the United States. Gina is also founder and president of CENTRO, Mexico\'s first university dedicated to Design, Media, and Technology with a strong emphasis in business and entrepreneurship. Founder of Diez Company, the leading commercial and residential lighting firm with operations in Mexico, Spain, and the United States.',
  },
  {
    _key: generateKey(),
    _type: 'quote',
    quoteText: 'She is the founder and president of Dalia, a global education ecosystem that provides women with a unique methodology and tools to reframe their mindset and achieve both personal and professional success.',
    quoteTextEn: 'She is the founder and president of Dalia, a global education ecosystem that provides women with a unique methodology and tools to reframe their mindset and achieve both personal and professional success.',
  },
  {
    _key: generateKey(),
    _type: 'quote',
    quoteText: 'Gina serves as an independent board member for several international organizations, including the Global Board of Banco Santander, the Mexican Stock Exchange, Grupo AXO, Laurel Strategies, and AS/COA. She is member of the Advisory Council for Regional Economic Development and Nearshoring for the Office of the President of Mexico.',
    quoteTextEn: 'Gina serves as an independent board member for several international organizations, including the Global Board of Banco Santander, the Mexican Stock Exchange, Grupo AXO, Laurel Strategies, and AS/COA. She is member of the Advisory Council for Regional Economic Development and Nearshoring for the Office of the President of Mexico.',
  },
  {
    _key: generateKey(),
    _type: 'quote',
    quoteText: 'She is the only Latin American woman member of C200.org, a global network of top women business leaders, and she represents Mexico in the G20\'s women focused initiatives, including W20 and the Empower Women Alliance.',
    quoteTextEn: 'She is the only Latin American woman member of C200.org, a global network of top women business leaders, and she represents Mexico in the G20\'s women focused initiatives, including W20 and the Empower Women Alliance.',
  },
  {
    _key: generateKey(),
    _type: 'quote',
    quoteText: 'Gina is an internationally recognized speaker and has been honored with several awards, including the Gold Medal from the Council of the Americas in New York, the EY National Entrepreneur of the Year 2023, EY World Entrepreneur of The Year competition in Monaco 2024, and was named Mexico\'s Most Powerful Woman 2024 by Forbes.',
    quoteTextEn: 'Gina is an internationally recognized speaker and has been honored with several awards, including the Gold Medal from the Council of the Americas in New York, the EY National Entrepreneur of the Year 2023, EY World Entrepreneur of The Year competition in Monaco 2024, and was named Mexico\'s Most Powerful Woman 2024 by Forbes.',
  },
  {
    _key: generateKey(),
    _type: 'quote',
    quoteText: 'In her philanthropic work, Gina has established three non-profit organizations: Diarq Foundation, focused on eradicating violence against women and children; CENTRO Foundation, which grants scholarship to students on creative careers and Tatis Foundation dedicated to improving the quality of life for people with disabilities.',
    quoteTextEn: 'In her philanthropic work, Gina has established three non-profit organizations: Diarq Foundation, focused on eradicating violence against women and children; CENTRO Foundation, which grants scholarship to students on creative careers and Tatis Foundation dedicated to improving the quality of life for people with disabilities.',
  },
  // Logo Grid - Boards
  {
    _key: generateKey(),
    _type: 'logoGrid',
    heading: 'Boards & Advisory Roles',
    headingEn: 'Boards & Advisory Roles',
    logos: [
      { _key: generateKey(), name: 'Banco Santander' },
      { _key: generateKey(), name: 'Mexican Stock Exchange (BMV)' },
      { _key: generateKey(), name: 'Grupo AXO' },
      { _key: generateKey(), name: 'Laurel Strategies' },
      { _key: generateKey(), name: 'AS/COA' },
    ],
  },
  // Awards Accordion
  {
    _key: generateKey(),
    _type: 'awardsAccordion',
    heading: 'Recognitions & Awards',
    headingEn: 'Recognitions & Awards',
    awards: [
      { _key: generateKey(), title: 'Gold Medal', titleEn: 'Gold Medal', organization: 'Council of the Americas', organizationEn: 'Council of the Americas', year: '2023' },
      { _key: generateKey(), title: 'National Entrepreneur of the Year', titleEn: 'National Entrepreneur of the Year', organization: 'EY', organizationEn: 'EY', year: '2023' },
      { _key: generateKey(), title: 'World Entrepreneur of The Year', titleEn: 'World Entrepreneur of The Year', organization: 'EY Monaco', organizationEn: 'EY Monaco', year: '2024' },
      { _key: generateKey(), title: 'Most Powerful Woman in Mexico', titleEn: 'Most Powerful Woman in Mexico', organization: 'Forbes', organizationEn: 'Forbes', year: '2024' },
    ],
  },
];

// ============================================
// INITIATIVES PAGE BLOCKS
// ============================================
const initiativesPageBlocks = [
  // Intro
  {
    _key: generateKey(),
    _type: 'introText',
    eyebrow: 'COMPANIES & FOUNDATIONS',
    heading: 'Her work spans multiple sectors, from design and real estate to education and philanthropy.',
    eyebrowEn: 'COMPANIES & FOUNDATIONS',
    headingEn: 'Her work spans multiple sectors, from design and real estate to education and philanthropy.',
  },
  // Initiatives Accordion
  {
    _key: generateKey(),
    _type: 'initiativesAccordion',
    introText: 'Through her companies and foundations, Gina has created lasting impact across industries.',
    introTextEn: 'Through her companies and foundations, Gina has created lasting impact across industries.',
    theme: 'dark',
    sections: [
      {
        _key: generateKey(),
        sectionTitle: 'Companies',
        sectionTitleEn: 'Companies',
        items: [
          {
            _key: generateKey(),
            name: 'Grupo Diarq',
            description: 'A prestigious design and real estate development company with offices in Mexico and the United States.',
            descriptionEn: 'A prestigious design and real estate development company with offices in Mexico and the United States.',
            websiteLinkText: 'Visita su sitio web',
            websiteLinkTextEn: 'Visit their website',
          },
          {
            _key: generateKey(),
            name: 'CENTRO',
            description: 'Mexico\'s first university dedicated to Design, Media, and Technology with a strong emphasis in business and entrepreneurship.',
            descriptionEn: 'Mexico\'s first university dedicated to Design, Media, and Technology with a strong emphasis in business and entrepreneurship.',
            websiteLinkText: 'Visita su sitio web',
            websiteLinkTextEn: 'Visit their website',
          },
          {
            _key: generateKey(),
            name: 'Diez Company',
            description: 'The leading commercial and residential lighting firm with operations in Mexico, Spain, and the United States.',
            descriptionEn: 'The leading commercial and residential lighting firm with operations in Mexico, Spain, and the United States.',
            websiteLinkText: 'Visita su sitio web',
            websiteLinkTextEn: 'Visit their website',
          },
          {
            _key: generateKey(),
            name: 'Dalia',
            description: 'A global education ecosystem that provides women with a unique methodology and tools to reframe their mindset and achieve both personal and professional success.',
            descriptionEn: 'A global education ecosystem that provides women with a unique methodology and tools to reframe their mindset and achieve both personal and professional success.',
            websiteLinkText: 'Visita su sitio web',
            websiteLinkTextEn: 'Visit their website',
          },
        ],
      },
      {
        _key: generateKey(),
        sectionTitle: 'Fundaciones Sin Fines de Lucro',
        sectionTitleEn: 'Non-Profit Foundations',
        items: [
          {
            _key: generateKey(),
            name: 'Diarq Foundation',
            description: 'Enfocada en erradicar la violencia contra mujeres y niños.',
            descriptionEn: 'Focused on eradicating violence against women and children.',
            websiteLinkText: 'Visita su sitio web',
            websiteLinkTextEn: 'Visit their website',
          },
          {
            _key: generateKey(),
            name: 'CENTRO Foundation',
            description: 'Otorga becas a estudiantes en carreras creativas.',
            descriptionEn: 'Grants scholarships to students in creative careers.',
            websiteLinkText: 'Visita su sitio web',
            websiteLinkTextEn: 'Visit their website',
          },
          {
            _key: generateKey(),
            name: 'Tatis Foundation',
            description: 'Dedicada a mejorar la calidad de vida de personas con discapacidades.',
            descriptionEn: 'Dedicated to improving the quality of life for people with disabilities.',
            websiteLinkText: 'Visita su sitio web',
            websiteLinkTextEn: 'Visit their website',
          },
        ],
      },
    ],
  },
];

// ============================================
// PERSPECTIVES PAGE BLOCKS
// ============================================
const perspectivesPageBlocks = [
  // Intro
  {
    _key: generateKey(),
    _type: 'introText',
    eyebrow: 'THOUGHTS & INSIGHTS',
    heading: 'Perspectives on leadership, creativity, and building meaningful change.',
    eyebrowEn: 'THOUGHTS & INSIGHTS',
    headingEn: 'Perspectives on leadership, creativity, and building meaningful change.',
  },
  // Publishing (Books)
  {
    _key: generateKey(),
    _type: 'publishing',
    heading: 'Books & Publications',
    headingEn: 'Books & Publications',
    description: '',
    descriptionEn: '',
    books: [
      // Add book details here when available
    ],
  },
  // Video Gallery for speaking
  {
    _key: generateKey(),
    _type: 'videoGallery',
    videos: [],
  },
];

// ============================================
// CONTACT PAGE BLOCKS
// ============================================
const contactPageBlocks = [
  // CTA Banner
  {
    _key: generateKey(),
    _type: 'ctaBanner',
    style: 'speaking',
    eyebrow: 'GET IN TOUCH',
    heading: 'Let\'s Connect',
    subheading: 'For speaking engagements, partnerships, or inquiries.',
    buttonText: 'Contact',
    eyebrowEn: 'GET IN TOUCH',
    headingEn: 'Let\'s Connect',
    subheadingEn: 'For speaking engagements, partnerships, or inquiries.',
    buttonTextEn: 'Contact',
  },
];

// ============================================
// CREATE PAGE DOCUMENTS
// ============================================
const pages = [
  {
    _id: 'page-home',
    _type: 'page',
    name: 'Home',
    slug: { _type: 'slug', current: 'home' },
    isHome: { status: true },
    headerTheme: 'transparent',
    pageBuilder: homePageBlocks,
  },
  {
    _id: 'page-about',
    _type: 'page',
    name: 'About Gina',
    slug: { _type: 'slug', current: 'about' },
    isHome: { status: false },
    headerTheme: 'light',
    pageBuilder: aboutPageBlocks,
  },
  {
    _id: 'page-initiatives',
    _type: 'page',
    name: 'Initiatives',
    slug: { _type: 'slug', current: 'initiatives' },
    isHome: { status: false },
    headerTheme: 'light',
    pageBuilder: initiativesPageBlocks,
  },
  {
    _id: 'page-perspectives',
    _type: 'page',
    name: 'Perspectives',
    slug: { _type: 'slug', current: 'perspectives' },
    isHome: { status: false },
    headerTheme: 'light',
    pageBuilder: perspectivesPageBlocks,
  },
  {
    _id: 'page-contact',
    _type: 'page',
    name: 'Contact',
    slug: { _type: 'slug', current: 'contact' },
    isHome: { status: false },
    headerTheme: 'light',
    pageBuilder: contactPageBlocks,
  },
];

// ============================================
// OUTPUT
// ============================================
const outputDir = path.join(__dirname, '../migration-output');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write NDJSON (one JSON object per line)
const ndjsonContent = pages.map(page => JSON.stringify(page)).join('\n');
fs.writeFileSync(path.join(outputDir, 'pages.ndjson'), ndjsonContent);

console.log('');
console.log('✅ Migration files created!');
console.log('');
console.log('Output: ./migration-output/pages.ndjson');
console.log('');
console.log('To import into Sanity:');
console.log('  npx sanity dataset import ./migration-output/pages.ndjson production');
console.log('');
console.log('Note: Images need to be uploaded manually through Sanity Studio.');
console.log('The content is ready - just add images to the blocks after import.');
console.log('');
