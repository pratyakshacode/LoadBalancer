import http, { IncomingMessage, ServerResponse } from 'http';
import httpProxy from 'http-proxy';
import dotenv from 'dotenv'

dotenv.config();

// Define a type for server entries
type ServerTarget = {
  host: string;
  port: number;
};

// List of backend servers
const servers: ServerTarget[] = [
  { host: process.env.SERVER1_HOST || 'localhost', port: parseInt(process.env.SERVER1_PORT || '3003') }, // Express Server
  { host: process.env.SERVER2_HOST || 'localhost', port: parseInt(process.env.SERVER2_PORT || '3002') }, // Fastify Server
];

let current = 0; // For round-robin load balancing

// Create the proxy server
const proxy = httpProxy.createProxyServer({});

// Create the load balancer server
const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  const target = servers[current];
  current = (current + 1) % servers.length;
  console.log(`Proxying request ${req.method} ${req.url} -> http://${target.host}:${target.port}`);

  proxy.web(req, res, { target: `http://${target.host}:${target.port}` }, (err: any) => {
    console.error('Proxy error:', err.message);
    res.writeHead(502);
    res.end('Ooops .. Bad Gateway');
  });
});

server.listen(3000, () => {
  console.log('Load balancer running at http://localhost:3000');
});
