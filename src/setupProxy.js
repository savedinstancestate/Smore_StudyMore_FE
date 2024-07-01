const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    if (process.env.REACT_APP_USE_PROXY === 'true') {
  app.use(
    createProxyMiddleware({
      target: 'http://ec2-43-203-206-205.ap-northeast-2.compute.amazonaws.com',
      changeOrigin: true,
    })
  );
}
};
