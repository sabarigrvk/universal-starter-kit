const req = require.context(".", true, /\.\/[^/]+\/[^/]+\/index\.js$/);

req.keys().forEach((key) => {
  const componentName = key.replace(/^.+\/([^/]+)\/index\.js/, "$1");
  console.log(req(key));
  module.exports[componentName] = req(key);
});
