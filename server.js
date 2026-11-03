const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = 8080;
const ROOT = path.resolve(__dirname);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.m4a': 'audio/mp4'
};

function getWifiIp() {
  const interfaces = os.networkInterfaces();
  // Prefer Wi-Fi / 192.168.* interface
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        if (iface.address.startsWith('192.168.1.')) {
          return iface.address;
        }
      }
    }
  }
  // Fallback to any 192.168.* or 10.*
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        if (iface.address.startsWith('192.168.') || iface.address.startsWith('10.')) {
          return iface.address;
        }
      }
    }
  }
  return 'localhost';
}

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

  const filePath = path.join(ROOT, reqPath);

  // Security check: restrict within ROOT
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end('Erişim reddedildi.');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Dosya bulunamadı: ' + reqPath);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const totalSize = stats.size;

    const baseHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'no-cache'
    };

    if (req.method === 'OPTIONS') {
      res.writeHead(204, baseHeaders);
      res.end();
      return;
    }

    // Handle HEAD request
    if (req.method === 'HEAD') {
      res.writeHead(200, {
        ...baseHeaders,
        'Content-Length': totalSize,
        'Content-Type': contentType
      });
      res.end();
      return;
    }

    // Critical for iOS Safari: Range Header handling (HTTP 206 Partial Content)
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : totalSize - 1;

      if (start >= totalSize || end >= totalSize) {
        res.writeHead(416, {
          ...baseHeaders,
          'Content-Range': `bytes */${totalSize}`
        });
        res.end();
        return;
      }

      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(filePath, { start, end });

      res.writeHead(206, {
        ...baseHeaders,
        'Content-Range': `bytes ${start}-${end}/${totalSize}`,
        'Content-Length': chunksize,
        'Content-Type': contentType
      });
      file.pipe(res);
    } else {
      res.writeHead(200, {
        ...baseHeaders,
        'Content-Length': totalSize,
        'Content-Type': contentType
      });
      fs.createReadStream(filePath).pipe(res);
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  const wifiIp = getWifiIp();
  console.log('====================================================');
  console.log('🎵 MÜZİK iOS PWA TEST SUNUCUSU HAZIR');
  console.log('');
  console.log(`📱 iPhone 13 Safari Adresi: http://${wifiIp}:${PORT}/`);
  console.log(`💻 Bilgisayarda Test Etmek İçin: http://localhost:${PORT}/`);
  console.log('====================================================');
});
