// const proxy = require('http-proxy-middleware')

// module.exports = function (app) {
//   app.use(proxy('/socket.io', {
//     target: 'http://localhost:5001',
//     ws: true
//   }))

//   // You only need this part if your server also has actual express endpoints
//   app.use(proxy('/api', {
//     target: 'http://localhost:5001',
//     pathRewrite: { '^/api': '' }
//   }))
// }

const proxy = require('http-proxy-middleware');

// // module.exports = function(app) {
// //   // app.use(proxy('/api', { target: 'http://localhost:5001' }));
// //   app.use(proxy('/ws', { target: 'ws://localhost:5001', ws: true }));
// // };

// const socketProxy= proxy('/socket', {
//   target: 'http://localhost:5001',
//   changeOrigin: true,
//   ws: true, 
//   logLevel: 'debug',
// });

// module.exports = function(app) {app.use(socketProxy)};