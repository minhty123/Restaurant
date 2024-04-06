const partner = require('./partner');
const news = require('./new');
const product = require('./product');

route = (app) => {
  app.use('/partners', partner);
  app.use('/news', news);
  app.use('/products', product);
};

module.exports = route;
