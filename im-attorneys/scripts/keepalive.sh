#!/bin/bash
# IM Attorneys - Keep-alive script for dev server and proxy
PROJECT_DIR="/home/z/my-project/im-attorneys"
DEV_PORT=3001
PROXY_PORT=3000

start_dev() {
    cd "$PROJECT_DIR"
    npx next dev -p $DEV_PORT -H 0.0.0.0 >> /tmp/next-dev-3001.log 2>&1
    echo "[$(date)] Dev server died, restarting in 3s..." >> /tmp/next-dev-3001.log
    sleep 3
}

start_proxy() {
    node -e "
const http = require('http');
const proxy = http.createServer((clientReq, clientRes) => {
  const options = {
    hostname: '127.0.0.1',
    port: $DEV_PORT,
    path: clientReq.url,
    method: clientReq.method,
    headers: clientReq.headers,
  };
  const proxyReq = http.request(options, (proxyRes) => {
    clientRes.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(clientRes, { end: true });
  });
  proxyReq.on('error', (err) => {
    console.error('Proxy error:', err.message);
    clientRes.writeHead(502);
    clientRes.end('Bad Gateway');
  });
  clientReq.pipe(proxyReq, { end: true });
});
proxy.listen($PROXY_PORT, '0.0.0.0', () => {
  console.log('[' + new Date().toISOString() + '] Proxy listening on port ' + $PROXY_PORT + ' -> ' + $DEV_PORT);
});
" >> /tmp/proxy.log 2>&1
    echo "[$(date)] Proxy died, restarting in 3s..." >> /tmp/proxy.log
    sleep 3
}

start_dev &
DEV_PID=$!
start_proxy &
PROXY_PID=$!

wait -n $DEV_PID $PROXY_PID 2>/dev/null
echo "[$(date)] Process died, restarting everything..." >> /tmp/keepalive.log
exec "$0"
