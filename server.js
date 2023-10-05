const http = require('http');
const https = require('https');

const server = http.createServer((req, res) => {
  const options = {
    hostname: 'hooks.zapier.com',
    path: '/hooks/catch/16443623/3r7g2j3/',
    method: 'POST',
    headers: req.headers,
  };

  const proxy = https.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, {
      end: true
    });
  });

  req.pipe(proxy, {
    end: true
  });
});

server.listen(8080, '127.0.0.1', () => {
  console.log('Proxy server listening on port 8080');
});
