import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Helper to remove checkerboard/white background from edge inward
async function removeBackground(inputPath, outputPath) {
  try {
    const image = sharp(inputPath);
    const { data, info } = await image.raw().ensureAlpha().toBuffer({ resolveWithObject: true });
    const { width, height, channels } = info;

    // Check corners / edges to detect checkerboard/white/gray background
    // If pixel is near-white (r>210, g>210, b>210) and has low saturation (|r-g| < 15, |g-b| < 15), make it transparent
    const isBg = (r, g, b, a) => {
      if (a < 10) return true;
      const maxVal = Math.max(r, g, b);
      const minVal = Math.min(r, g, b);
      const isGrayOrWhite = maxVal > 185 && (maxVal - minVal) < 25;
      const isPureWhite = r > 240 && g > 240 && b > 240;
      return isGrayOrWhite || isPureWhite;
    };

    // Breadth-first search / flood fill from the 4 borders
    const visited = new Uint8Array(width * height);
    const queue = [];

    // Push all border pixels to queue if they are background
    for (let x = 0; x < width; x++) {
      // Top row
      let idx = (0 * width + x) * channels;
      if (isBg(data[idx], data[idx + 1], data[idx + 2], data[idx + 3])) {
        queue.push(x, 0);
        visited[0 * width + x] = 1;
      }
      // Bottom row
      idx = ((height - 1) * width + x) * channels;
      if (isBg(data[idx], data[idx + 1], data[idx + 2], data[idx + 3])) {
        queue.push(x, height - 1);
        visited[(height - 1) * width + x] = 1;
      }
    }

    for (let y = 0; y < height; y++) {
      // Left col
      let idx = (y * width + 0) * channels;
      if (isBg(data[idx], data[idx + 1], data[idx + 2], data[idx + 3])) {
        queue.push(0, y);
        visited[y * width + 0] = 1;
      }
      // Right col
      idx = (y * width + (width - 1)) * channels;
      if (isBg(data[idx], data[idx + 1], data[idx + 2], data[idx + 3])) {
        queue.push(width - 1, y);
        visited[y * width + (width - 1)] = 1;
      }
    }

    let head = 0;
    while (head < queue.length) {
      const cx = queue[head++];
      const cy = queue[head++];
      const cIdx = (cy * width + cx) * channels;

      // Set alpha to 0 for connected background pixels
      data[cIdx + 3] = 0;

      // Check 4 neighbors
      const neighbors = [
        [cx + 1, cy],
        [cx - 1, cy],
        [cx, cy + 1],
        [cx, cy - 1]
      ];

      for (const [nx, ny] of neighbors) {
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const nPos = ny * width + nx;
          if (!visited[nPos]) {
            visited[nPos] = 1;
            const nIdx = nPos * channels;
            if (isBg(data[nIdx], data[nIdx + 1], data[nIdx + 2], data[nIdx + 3])) {
              queue.push(nx, ny);
            }
          }
        }
      }
    }

    // Save as clean transparent PNG
    await sharp(data, {
      raw: {
        width,
        height,
        channels
      }
    })
    .png()
    .toFile(outputPath);

    console.log(`Cleaned: ${outputPath}`);
  } catch (err) {
    console.error(`Error processing ${inputPath}:`, err);
  }
}

async function run() {
  const images = [
    { in: 'src/assets/Flowers/Pink flower.png', out: 'public/assets/flowers/Pink flower.png' },
    { in: 'src/assets/Flowers/blue-anemone-flower-isolated-white-transparent-background-png-image-stunning-vibrant-high-quality-375133488.webp', out: 'public/assets/flowers/blue-anemone-flower.png' },
    { in: 'src/assets/Flowers/bouquet.jpg', out: 'public/assets/flowers/bouquet.png' },
    { in: 'src/assets/Cat with bouquet/birthdaycatwithflowers.png', out: 'public/assets/cat/birthdaycatwithflowers.png' },
    { in: 'src/assets/Cat with bouquet/catwiththreebouquet.png', out: 'public/assets/cat/catwiththreebouquet.png' },
    { in: 'src/assets/Cute elements or stickers/cutestwithbouquet.png', out: 'public/assets/stickers/cutestwithbouquet.png' },
    { in: 'src/assets/Cute elements or stickers/cutest.jpg', out: 'public/assets/stickers/cutest.png' },
    { in: 'src/assets/cutethreatening to say yes/cutest with knife.jpg', out: 'public/assets/threat/cutest with knife.png' },
    { in: 'src/assets/cutethreatening to say yes/cutestwithgun.jpg', out: 'public/assets/threat/cutestwithgun.png' },
    { in: 'src/assets/Crying for sorry/cutestcryyying.jpg', out: 'public/assets/sorry/cutestcryyying.png' }
  ];

  for (const img of images) {
    if (fs.existsSync(img.in)) {
      await removeBackground(img.in, img.out);
    }
  }
}

run();
