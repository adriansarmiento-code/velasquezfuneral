/**
 * Velasquez Funeral — Image Compression Script
 * ---------------------------------------------
 * Run this ONCE locally inside your frontend project root.
 * It compresses all images in /public/images and saves WebP versions.
 *
 * Setup (run once):
 *   npm install sharp --save-dev
 *
 * Then run:
 *   node compress-images.js
 */

const sharp  = require('sharp')
const fs     = require('fs')
const path   = require('path')

const INPUT_DIR  = path.join(__dirname, 'public', 'images')
const OUTPUT_DIR = path.join(__dirname, 'public', 'images')

// Images and their target display widths (from PageSpeed report)
const images = [
  { file: 'interior.jpg',       width: 1920, quality: 82 },  // hero — keep quality high
  { file: 'showcase.png',       width: 553,  quality: 85 },  // displayed at 553px
  { file: 'detail.png',         width: 553,  quality: 85 },  // displayed at 553px
  { file: 'casketinterior.png', width: 553,  quality: 85 },  // displayed at 553px
  { file: 'moment.jpg',         width: 570,  quality: 82 },  // displayed at 570px
  { file: 'hearse.jpg',         width: 800,  quality: 82 },
  { file: 'testimony.jpeg',     width: 800,  quality: 80 },
]

async function compress() {
  console.log('🖼  Compressing images...\n')

  for (const { file, width, quality } of images) {
    const inputPath  = path.join(INPUT_DIR, file)
    const ext        = path.extname(file).toLowerCase()
    const baseName   = path.basename(file, ext)

    if (!fs.existsSync(inputPath)) {
      console.warn(`  ⚠️  Skipping ${file} — not found`)
      continue
    }

    const originalSize = (fs.statSync(inputPath).size / 1024).toFixed(1)

    // 1. Resize + re-compress original format
    const compressedPath = path.join(OUTPUT_DIR, file)
    const isPng = ext === '.png'

    await sharp(inputPath)
      .resize(width, null, { withoutEnlargement: true })
      [isPng ? 'png' : 'jpeg']({ quality, progressive: true })
      .toFile(compressedPath + '.tmp')

    fs.renameSync(compressedPath + '.tmp', compressedPath)
    const newSize = (fs.statSync(compressedPath).size / 1024).toFixed(1)

    // 2. Also generate WebP version
    const webpPath = path.join(OUTPUT_DIR, baseName + '.webp')
    await sharp(inputPath)
      .resize(width, null, { withoutEnlargement: true })
      .webp({ quality: quality - 5 })
      .toFile(webpPath)

    const webpSize = (fs.statSync(webpPath).size / 1024).toFixed(1)

    console.log(`  ✅ ${file}`)
    console.log(`     Original: ${originalSize} KB → Compressed: ${newSize} KB → WebP: ${webpSize} KB\n`)
  }

  console.log('Done! Now update your img tags to use <picture> with WebP sources.')
  console.log('See the instructions below.\n')
  console.log(`
HOW TO USE WEBP IN YOUR VUE TEMPLATES:
Replace this:
  <img src="/images/interior.jpg" alt="Chapel interior" ... />

With this:
  <picture>
    <source srcset="/images/interior.webp" type="image/webp">
    <img src="/images/interior.jpg" alt="Chapel interior" ... />
  </picture>

Do this for each image. Browsers that support WebP use the smaller version,
others fall back to the original JPG/PNG automatically.
  `)
}

compress().catch(err => {
  console.error('❌ Error:', err.message)
  process.exit(1)
})