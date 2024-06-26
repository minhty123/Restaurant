const Employee = require('../models/Employee');
const CateTable = require('../models/CateTable');

class EmployeeController {
  //[GET] /employees/
  async show(req, res) {
    Employee.find({})
      .then((employee) => {
        res.status(200).json({ success: true, employee });
      })
      .catch((err) => {
        res.status(500).json({ success: false, err });
      });
  }
  // [POST] /employees/check-phone
  async checkPhone(req, res) {
    try {
      const { phone } = req.body;
      const existingEmployee = await Employee.findOne({ phone: phone });
      if (existingEmployee) {
        res.status(200).json({ exists: true });
      } else {
        res.status(200).json({ exists: false });
      }
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
  //[GET] /employees/:slug
  async detail(req, res) {
    Employee.findOne({ slug: req.params.slug })
      .then((employee) => {
        res.status(200).json({ success: true, employee });
      })
      .catch((err) => {
        res.status(500).json({ success: false, err });
      });
  }
  //[POST] /employees/create
  async create(req, res) {
    const employee = new Employee(req.body);
    employee
      .save()
      .then(() => {
        res.status(201).json({ success: true, message: 'successfull' });
      })
      .catch((err) => {
        res.status(400).json({ success: false, message: err });
      });
  }
  //[PUT] /employees
  async edit(req, res) {
    Employee.findOneAndUpdate({ slug: req.params.slug }, req.body, {
      new: true
    })
      .then(() => {
        res.status(200).json({ success: true, message: 'successfully' });
      })
      .catch((err) => {
        res.status(400).json({ success: false, message: err });
      });
  }
  //[DELETE] /employees/:id
  async delete(req, res) {
    Employee.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(200).json({ success: true, message: 'successfully' });
      })
      .catch((err) => {
        res.status(400).json({ success: false, message: err });
      });
  }
}

module.exports = new EmployeeController();
