const Customer = require('../models/Customer');
const Table = require('../models/Table');
const optimizeSeating = require('../../utils/arrange');

class CustomerController {
  //[GET] /customers/
  // async show(req, res) {
  //   Customer.find({})
  //     .then((customer) => {
  //       res.status(200).json({ success: true, customer });
  //     })
  //     .catch((err) => {
  //       res.status(500).json({ success: false, err });
  //     });
  // }
  async show(req, res) {
    try {
      const customers = await Customer.find({});
      const tables = await Table.find({});

      await optimizeSeating(customers, tables);
      res.status(200).json({ success: true, customers });
    } catch (err) {
      res.status(500).json({ success: false, err });
    }
  }
  //[GET] /customers/:slug
  async detail(req, res) {
    Customer.findOne({ slug: req.params.slug })
      .then((customer) => {
        res.status(200).json({ success: true, customer });
      })
      .catch((err) => {
        res.status(500).json({ success: false, err });
      });
  }
  //[POST] /customers/create
  async create(req, res) {
    const customer = new Customer(req.body);
    customer
      .save()
      .then(() => {
        res.status(201).json({ success: true, message: 'successfull' });
      })
      .catch((err) => {
        res.status(400).json({ success: false, message: err });
      });
  }

  //[PUT] /customers
  async edit(req, res) {
    Customer.findOneAndUpdate({ slug: req.params.slug }, req.body, {
      new: true
    })
      .then(() => {
        res.status(200).json({ success: true, message: 'successfully' });
      })
      .catch((err) => {
        res.status(400).json({ success: false, message: err });
      });
  }
  //[DELETE] /customers/:id
  async delete(req, res) {
    Customer.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(200).json({ success: true, message: 'successfully' });
      })
      .catch((err) => {
        res.status(400).json({ success: false, message: err });
      });
  }
}

module.exports = new CustomerController();
