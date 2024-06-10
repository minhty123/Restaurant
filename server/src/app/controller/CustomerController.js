const Customer = require('../models/Customer');
const Table = require('../models/Table');
const Catetable = require('../models/CateTable');
const optimizeSeating = require('../../utils/arrange');

class CustomerController {
  // [GET] /customers/
  async show(req, res) {
    try {
      // Check if the request is for arranging customers
      const isNewArrangement = req.query.arrange === 'true';
      // Find all customers
      const customers = await Customer.find({});
      if (isNewArrangement) {
        // If it's a new arrangement, set up the time range
        const startOfDay = new Date();
        startOfDay.setHours(8, 0, 0, 0); // 8:00 AM today
        const endOfDay = new Date();
        endOfDay.setHours(22, 0, 0, 0); // 10:00 PM today
        // Find customers within the specified time range
        const customersInRange = await Customer.find({
          checkin: { $gte: startOfDay, $lte: endOfDay }
        });
        // Get all tables
        const tables = await Table.find({});

        // Set the status of all tables to 'available'
        await Table.updateMany({}, { $set: { status: 'available' } });

        // Optimize seating for customers within the time range
        const optimizedCustomers = await optimizeSeating(
          customersInRange,
          tables
        );
        // Lưu trữ kết quả tối ưu vào cơ sở dữ liệu
        const updatedCustomers = await Promise.all(
          optimizedCustomers.map(async (customer) => {
            return await Customer.findByIdAndUpdate(customer._id, customer, {
              new: true
            });
          })
        );
        // Return the optimized list of customers
        res.status(200).json({ success: true, customers: updatedCustomers });
      } else {
        // If it's not a new arrangement, simply return all customers
        res.status(200).json({ success: true, customers });
      }
    } catch (err) {
      // Handle errors
      res.status(500).json({ success: false, err });
    }
  }

  // [POST] /customers/filter
  async filter(req, res) {
    try {
      const isNewArrangement = req.body.arrange === true; // Chuyển đổi từ req.query.arrange sang req.body.arrange
      const catetableName = req.body.name;

      // Lọc khách hàng theo catetable tương ứng với name
      const customers = await Customer.find({ catetable: catetableName });

      if (isNewArrangement) {
        const startOfDay = new Date();
        startOfDay.setHours(8, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(22, 0, 0, 0);

        // Lọc khách hàng trong khoảng thời gian xác định
        const customersInRange = await Customer.find({
          catetable: catetableName,
          checkin: { $gte: startOfDay, $lte: endOfDay }
        });

        // Lọc bàn theo type tương ứng với name
        const tables = await Table.find({ type: catetableName });

        // Cập nhật trạng thái của các bàn thành available
        await Table.updateMany(
          { type: catetableName },
          { status: 'available' }
        );

        // Truyền vào hàm optimizeSeating chỉ các khách hàng và bàn có loại tương ứng với name
        const optimizedCustomers = await optimizeSeating(
          customersInRange,
          tables
        );

        // Trả về danh sách khách hàng đã tối ưu
        res.status(200).json({ success: true, customers: optimizedCustomers });
      } else {
        // Trả về danh sách khách hàng đã tìm được
        res.status(200).json({ success: true, customers });
      }
    } catch (err) {
      // Xử lý lỗi
      res.status(500).json({ success: false, error: err.message });
    }
  }
  // [POST] /customers/check-phone
  async checkPhone(req, res) {
    try {
      const { phone } = req.body;
      const existingCustomer = await Customer.findOne({ phone: phone });
      if (existingCustomer) {
        res.status(200).json({ exists: true });
      } else {
        res.status(200).json({ exists: false });
      }
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
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
