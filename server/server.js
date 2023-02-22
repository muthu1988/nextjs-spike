const next = require('next')
const express = require('express')
const LRUCache = require('lru-cache');

const dev = false;
const hostname = 'localhost'
const port = 3002
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()
const ssrCache = new LRUCache({ ttl: 1000 * 60, max: 500 });

app.prepare().then(() => {
  const server = express()
  server.get('/api/getcache', (req, res) => {
    res.send(ssrCache.get(req.query.key));
  })
  server.get('/_next/*', (req, res) => {
    handle(req, res);
  });
  server.get('*', (req, res) => {
    return renderAndCache(req, res)
  });
  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
});

function getCacheKey(req) {
  return `${req.path}`
}

async function renderAndCache(req, res) {
  const key = getCacheKey(req);
  if (ssrCache.has(key)) {
    console.log(`serving from cache ${key}`);
    res.setHeader('x-cache', 'cached');
    res.send(ssrCache.get(key));
    return
  }

  try {
    //console.log(`key ${key} not found, rendering`);
    // If not let's render the page into HTML
    const html = await app.renderToHTML(req, res, req.path, req.query);

    // Something is wrong with the request, let's skip the cache
    if (res.statusCode !== 200) {
      res.send(html);
      return
    }

    // Let's cache this page
    ssrCache.set(key, html);

    res.setHeader('x-cache', 'cached');
    res.send(html)
  } catch (err) {
    app.renderError(err, req, res, req.path, req.query)
  }
}