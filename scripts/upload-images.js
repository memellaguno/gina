/**
 * Upload Images to Sanity
 *
 * This script uploads all images from public/temp-images to Sanity
 * and outputs the asset references.
 *
 * Usage: node scripts/upload-images.js
 */

const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// Sanity client config - reads from environment or sanity.cli.ts
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'g89utdn3',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN, // Needs write access
  apiVersion: '2024-01-01',
  useCdn: false,
});

const imagesDir = path.join(__dirname, '../public/temp-images');

async function uploadImage(filePath, filename) {
  const imageBuffer = fs.readFileSync(filePath);

  try {
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: filename,
    });

    console.log(`✓ ${filename} -> ${asset._id}`);
    return { filename, assetId: asset._id };
  } catch (error) {
    console.error(`✗ ${filename}: ${error.message}`);
    return null;
  }
}

async function main() {
  // Check for token
  if (!process.env.SANITY_API_TOKEN) {
    console.log('');
    console.log('⚠️  SANITY_API_TOKEN environment variable required.');
    console.log('');
    console.log('To get a token:');
    console.log('1. Go to https://www.sanity.io/manage');
    console.log('2. Select your project -> API -> Tokens');
    console.log('3. Create a token with "Editor" permissions');
    console.log('');
    console.log('Then run:');
    console.log('  SANITY_API_TOKEN=your-token-here node scripts/upload-images.js');
    console.log('');
    process.exit(1);
  }

  // Get all image files
  const files = fs.readdirSync(imagesDir).filter(f =>
    /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f)
  );

  console.log(`\nUploading ${files.length} images to Sanity...\n`);

  const results = [];

  for (const file of files) {
    const filePath = path.join(imagesDir, file);
    const result = await uploadImage(filePath, file);
    if (result) results.push(result);
  }

  // Save mapping to file
  const mapping = {};
  results.forEach(r => {
    mapping[r.filename] = r.assetId;
  });

  const outputPath = path.join(__dirname, '../migration-output/image-mapping.json');
  fs.writeFileSync(outputPath, JSON.stringify(mapping, null, 2));

  console.log(`\n✅ Uploaded ${results.length}/${files.length} images`);
  console.log(`📄 Mapping saved to: migration-output/image-mapping.json`);
  console.log('\nNext: Run node scripts/update-pages-with-images.js');
}

main().catch(console.error);
