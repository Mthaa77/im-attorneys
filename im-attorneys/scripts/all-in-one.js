const { createServer } = require('http');
const { spawn } = require('child_process');
const path = require('path');

const APP_PORT = 3002;
const PROXY_PORT = 3000;
const STANDALONE_DIR = path.join(__dirname, '../../.next/standalone');

// Start standalone Next.js app
const app = spawn(process.execPath, ['server.js'], {
  cwd: STANDALONE_DIR,
  env: { ...process.env, PORT: APP_PORT },
  stdio: ['ignore', 'inherit', 'inherit']
});

app.on('exit', (code) => {
  console.log(`App exited with code ${code}, restarting in 2s...`);
  setTimeout(() => process.exit(1), 2000);
});

// Wait for app to be ready, then start proxy
setTimeout(() => {
  const proxy = createServer((clientReq, clientRes) => {
    const req = require('http').request({
      hostname: '127.0.0.1',
      port: APP_PORT,
      path: clientReq.url,
      method: clientReq.method,
      headers: clientReq.headers,
    }, (proxyRes) => {
      clientRes.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(clientRes, { end: true });
    });
    req.on('error', (err) => {
      console.error('Proxy error:', err.message);
      if (!clientRes.headersSent) {
        clientRes.writeHead(502, { 'Content-Type': 'text/plain' });
      }
      clientRes.end('502 Bad Gateway');
    });
    clientReq.pipe(req, { end: true });
  });

  proxy.listen(PROXY_PORT, '0.0.0.0', () => {
    console.log(`All-in-one server: proxy on :${PROXY_PORT} -> app on :${APP_PORT}`);
  });
}, 2000);

// Keep alive
setInterval(() => {}, 10000);
