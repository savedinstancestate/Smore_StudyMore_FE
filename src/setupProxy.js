const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware({
      target: 'http://ec2-43-203-206-205.ap-northeast-2.compute.amazonaws.com:8080',
      changeOrigin: true,
    })
  );
};
