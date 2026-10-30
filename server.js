const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

let priceCache = null;
let lastCacheTime = 0;

function fetchLivePrices(callback) {
  const now = Date.now();
  if (priceCache && now - lastCacheTime < 45000) {
    return callback(null, priceCache);
  }

  const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,tether,binancecoin,ripple,cardano,dogecoin&vs_currencies=usd,inr,eur,gbp,aed,aud,cad,sgd';
  const options = {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  };

  https.get(url, options, (res) => {
    let data = '';
    res.on('data', chunk => { data += chunk; });
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        if (json.bitcoin) {
          priceCache = json;
          lastCacheTime = now;
          return callback(null, json);
        }
        callback(new Error('Invalid price data format'));
      } catch (e) {
        callback(e);
      }
    });
  }).on('error', (err) => {
    callback(err);
  });
}

const server = http.createServer((req, res) => {
  let reqUrl = req.url.split('?')[0];

  // API endpoint for genuine live crypto rates
  if (reqUrl === '/api/prices') {
    return fetchLivePrices((err, prices) => {
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache'
      });
      if (err && !priceCache) {
        return res.end(JSON.stringify({ status: 'fallback', error: err.message }));
      }
      res.end(JSON.stringify({ status: 'live', data: priceCache || prices }));
    });
  }

  if (reqUrl === '/') reqUrl = '/index.html';

  const filePath = path.join(__dirname, reqUrl);

  // Security: prevent directory traversal
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('403 Forbidden');
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      }
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache'
    });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
