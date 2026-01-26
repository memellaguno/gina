/**
 * Update Pages with Image References
 *
 * After uploading images, this script updates the page documents
 * with the correct image asset references.
 *
 * Usage: SANITY_API_TOKEN=xxx node scripts/update-pages-with-images.js
 */

const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'g89utdn3',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

// Load image mapping
const mappingPath = path.join(__dirname, '../migration-output/image-mapping.json');

function createImageRef(assetId) {
  return {
    _type: 'image',
    alt: 'Image',
    asset: {
      _type: 'reference',
      _ref: assetId,
    },
  };
}

async function main() {
  if (!process.env.SANITY_API_TOKEN) {
    console.log('SANITY_API_TOKEN required. See upload-images.js for instructions.');
    process.exit(1);
  }

  if (!fs.existsSync(mappingPath)) {
    console.log('No image mapping found. Run upload-images.js first.');
    process.exit(1);
  }

  const imageMap = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
  console.log(`Loaded ${Object.keys(imageMap).length} image mappings\n`);

  // Helper to get asset ID
  const getAsset = (filename) => imageMap[filename];

  // ============================================
  // UPDATE HOME PAGE
  // ============================================
  console.log('Updating Home page...');

  const homePage = await client.fetch('*[_id == "page-home"][0]');
  if (homePage) {
    const updatedBlocks = homePage.pageBuilder.map(block => {
      // Hero Home - add background image
      if (block._type === 'heroHome' && getAsset('gina-home.png')) {
        return {
          ...block,
          backgroundImage: createImageRef(getAsset('gina-home.png')),
        };
      }

      // Video Gallery - add poster images
      if (block._type === 'videoGallery' && block.videos) {
        return {
          ...block,
          videos: block.videos.map(v => ({
            ...v,
            poster: getAsset('video-1.png') ? createImageRef(getAsset('video-1.png')) : v.poster,
          })),
        };
      }

      // Featured Initiative - add image
      if (block._type === 'featuredInitiative' && getAsset('initiative.jpg')) {
        return {
          ...block,
          image: createImageRef(getAsset('initiative.jpg')),
        };
      }

      // Logo Marquee - add logo images
      if (block._type === 'logoMarquee' && block.logos) {
        const logoFiles = ['logo-1.png', 'logo-2.png', 'logo-3.png', 'logo-4.png', 'logo-5.png', 'logo-6.png', 'logo-7.png'];
        return {
          ...block,
          logos: block.logos.map((logo, i) => ({
            ...logo,
            image: logoFiles[i] && getAsset(logoFiles[i])
              ? createImageRef(getAsset(logoFiles[i]))
              : logo.image,
          })),
        };
      }

      // Image Slider - add images
      if (block._type === 'imageSlider') {
        const sliderImages = ['image_1.png', 'image_2.png', 'image_3.png'];
        return {
          ...block,
          images: sliderImages
            .filter(f => getAsset(f))
            .map(f => ({
              _key: Math.random().toString(36).substring(2, 10),
              _type: 'image',
              alt: 'Image',
              asset: { _type: 'reference', _ref: getAsset(f) },
            })),
        };
      }

      return block;
    });

    await client.patch('page-home').set({ pageBuilder: updatedBlocks }).commit();
    console.log('✓ Home page updated');
  }

  // ============================================
  // UPDATE ABOUT PAGE
  // ============================================
  console.log('Updating About page...');

  const aboutPage = await client.fetch('*[_id == "page-about"][0]');
  if (aboutPage) {
    const updatedBlocks = aboutPage.pageBuilder.map(block => {
      // Hero About - add image
      if (block._type === 'heroAbout' && getAsset('about-gina.png')) {
        return {
          ...block,
          image: createImageRef(getAsset('about-gina.png')),
        };
      }

      // Logo Grid (Boards) - add logo images
      if (block._type === 'logoGrid' && block.logos) {
        const boardFiles = ['boards-1.png', 'boards-2.png', 'boards-3.png', 'boards-4.png', 'boards-5.png'];
        return {
          ...block,
          logos: block.logos.map((logo, i) => ({
            ...logo,
            image: boardFiles[i] && getAsset(boardFiles[i])
              ? createImageRef(getAsset(boardFiles[i]))
              : logo.image,
          })),
        };
      }

      return block;
    });

    await client.patch('page-about').set({ pageBuilder: updatedBlocks }).commit();
    console.log('✓ About page updated');
  }

  // ============================================
  // UPDATE INITIATIVES PAGE
  // ============================================
  console.log('Updating Initiatives page...');

  const initiativesPage = await client.fetch('*[_id == "page-initiatives"][0]');
  if (initiativesPage) {
    const companyLogos = {
      'Grupo Diarq': 'company-1.png',
      'CENTRO': 'logo-2.png',
      'Diez Company': 'logo-3.png',
      'Dalia': 'logo-4.png',
    };

    const updatedBlocks = initiativesPage.pageBuilder.map(block => {
      if (block._type === 'initiativesAccordion' && block.sections) {
        return {
          ...block,
          sections: block.sections.map(section => ({
            ...section,
            items: section.items?.map(item => {
              const logoFile = companyLogos[item.name];
              if (logoFile && getAsset(logoFile)) {
                return {
                  ...item,
                  logo: createImageRef(getAsset(logoFile)),
                };
              }
              return item;
            }),
          })),
        };
      }
      return block;
    });

    await client.patch('page-initiatives').set({ pageBuilder: updatedBlocks }).commit();
    console.log('✓ Initiatives page updated');
  }

  console.log('\n✅ All pages updated with images!');
}

main().catch(console.error);
