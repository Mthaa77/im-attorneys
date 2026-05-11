const { createServer } = require('http');
const { spawn } = require('child_process');

const APP_PORT = 3002;
const LISTEN_PORT = 3000;
const STANDALONE_DIR = '/home/z/my-project/im-attorneys/.next/standalone';

let appServer = null;

function startApp() {
  if (appServer) {
    appServer.kill('SIGTERM');
    appServer = null;
  }
  const child = spawn('node', ['server.js'], {
    cwd: STANDALONE_DIR,
    env: { ...process.env, PORT: APP_PORT },
    stdio: ['ignore', 'pipe', 'pipe']
  });
  child.stdout.on('data', d => process.stdout.write(d));
  child.stderr.on('data', d => process.stderr.write(d));
  child.on('exit', () => {
    console.log('[server] App process exited, restarting...');
    setTimeout(startApp, 3000);
  });
  appServer = child;
}

function startProxy() {
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
      console.error('[proxy] Error:', err.message);
      clientRes.writeHead(502, { 'Content-Type': 'text/plain' });
      clientRes.end('502 Bad Gateway - App starting...');
    });
    clientReq.pipe(req, { end: true });
  });
  proxy.listen(LISTEN_PORT, '0.0.0.0', () => {
    console.log(`[proxy] Listening on port ${LISTEN_PORT} -> ${APP_PORT}`);
  });
  proxy.on('error', (err) => {
    console.error('[proxy] Fatal error:', err.message);
    process.exit(1);
  });
}

startApp();
setTimeout(startProxy, 1000);
