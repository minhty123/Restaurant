const Customer = require('../models/Customer');
const Table = require('../models/Table');
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

        // Return the optimized list of customers
        res.status(200).json({ success: true, customers: optimizedCustomers });
      } else {
        // If it's not a new arrangement, simply return all customers
        res.status(200).json({ success: true, customers });
      }
    } catch (err) {
      // Handle errors
      res.status(500).json({ success: false, err });
    }
  }

  // async show(req, res) {
  //   Customer.find({})
  //     .then((customer) => {
  //       res.status(200).json({ success: true, customer });
  //     })
  //     .catch((err) => {
  //       res.status(500).json({ success: false, err });
  //     });
  // }
  // // [GET] /customers/arrange
  // async arrange(req, res) {
  //   try {
  //     const startOfDay = new Date();
  //     startOfDay.setHours(8, 0, 0, 0); // 8:00 AM today

  //     const endOfDay = new Date();
  //     endOfDay.setHours(22, 0, 0, 0); // 10:00 PM today

  //     // Lấy danh sách khách hàng có thời gian checkin từ 8h sáng tới 10h tối trong ngày hôm nay
  //     const customers = await Customer.find({
  //       checkin: { $gte: startOfDay, $lte: endOfDay }
  //     });

  //     // Lấy tất cả các bàn
  //     const tables = await Table.find({});

  //     // Set lại trạng thái của tất cả các bàn thành 'available'
  //     const updatedTables = await Promise.all(
  //       tables.map(async (table) => {
  //         table.status = 'available';
  //         await table.save();
  //         return table;
  //       })
  //     );

  //     // Gọi hàm optimizeSeating và lấy danh sách khách hàng đã được tối ưu
  //     const optimizedCustomers = await optimizeSeating(
  //       customers,
  //       updatedTables
  //     );

  //     // Trả về kết quả dưới dạng JSON, bao gồm danh sách khách hàng đã được tối ưu
  //     res.status(200).json({ success: true, customers: optimizedCustomers });
  //   } catch (err) {
  //     res.status(500).json({ success: false, err });
  //   }
  // }

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
