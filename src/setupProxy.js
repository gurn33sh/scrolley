const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/subreddits',
    createProxyMiddleware({
      target: 'http://localhost:9000/reddit-media/',
      changeOrigin: true,
    })
  );
};