const customer = require('./customer');
const employee = require('./employee');
const menu = require('./menu');
const table = require('./table');
const category = require('./category');
const catetable = require('./catetable');

route = (app) => {
  app.use('/customers', customer);
  app.use('/employees', employee);
  app.use('/categories', category);
  app.use('/catetables', catetable);
  app.use('/menus', menu);
  app.use('/tables', table);
};

module.exports = route;
