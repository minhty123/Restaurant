const customer = require('./customer');
const employee = require('./employee');
const menu = require('./menu');
const table = require('./table');

route = (app) => {
  app.use('/customers', customer);
  app.use('/employees', employee);
  app.use('/menus', menu);
  app.use('/tables', table);
};

module.exports = route;
