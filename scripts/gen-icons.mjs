import { deflateSync } from 'zlib';
import { writeFileSync, mkdirSync } from 'fs';

function crc32(buf) {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let v = i;
    for (let j = 0; j < 8; j++) v = (v & 1) ? (0xedb88320 ^ (v >>> 1)) : (v >>> 1);
    table[i] = v;
  }
  let c = 0xffffffff;
  for (const b of buf) c = table[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const tb = Buffer.from(type, 'ascii');
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([tb, data])));
  return Buffer.concat([len, tb, data, crcBuf]);
}

function encodePng(pixels, width, height) {
  const rows = [];
  for (let y = 0; y < height; y++) {
    rows.push(0);
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      rows.push(pixels[i], pixels[i+1], pixels[i+2], pixels[i+3]);
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0); ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; ihdr[9] = 6;
  return Buffer.concat([
    Buffer.from([137,80,78,71,13,10,26,10]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(Buffer.from(rows))),
    chunk('IEND', Buffer.alloc(0))
  ]);
}

function generatePixels(size) {
  const pixels = new Uint8Array(size * size * 4);
  const colors = {
    bg:     [0x1e, 0x1e, 0x2e, 0xff],
    accent: [0xcb, 0xa6, 0xf7, 0xff],
    blue:   [0x89, 0xb4, 0xfa, 0xff],
    green:  [0xa6, 0xe3, 0xa1, 0xff],
    peach:  [0xfa, 0xb3, 0x87, 0xff],
  };

  function fill(x0, y0, x1, y1, color) {
    for (let y = Math.round(y0); y < Math.round(y1); y++) {
      for (let x = Math.round(x0); x < Math.round(x1); x++) {
        if (x < 0 || y < 0 || x >= size || y >= size) continue;
        const i = (y * size + x) * 4;
        [pixels[i], pixels[i+1], pixels[i+2], pixels[i+3]] = color;
      }
    }
  }

  const p = size * 0.12, g = size * 0.04;
  const inner = size - p * 2;
  const half = inner / 2 - g / 2;
  const third = inner / 3 - g / 2;

  fill(0, 0, size, size, colors.bg);
  // Big top-left square
  fill(p, p, p + half, p + half, colors.accent);
  // Top-right top rect
  fill(p + half + g, p, size - p, p + third, colors.blue);
  // Top-right bottom rect
  fill(p + half + g, p + third + g, size - p, p + half, colors.green);
  // Bottom full-width bar
  fill(p, p + half + g, size - p, p + half + g + third, colors.peach);

  return pixels;
}

mkdirSync('static', { recursive: true });
for (const size of [192, 512]) {
  const png = encodePng(generatePixels(size), size, size);
  writeFileSync(`static/icon-${size}.png`, png);
  console.log(`Generated static/icon-${size}.png (${png.length} bytes)`);
}
