const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const EmployeeSchema = new mongoose.Schema(
  {
    e_name: { type: String, require: true },
    phone: { type: Number, require: true },
    e_address: { type: String, require: true },
    position: { type: String, require: true },
    email: { type: String, require: true },
    salary: { type: String, require: true },
    slug: { type: String, slug: 'e_name', unique: true }
  },
  {
    timestamps: true
  }
);
mongoose.plugin(slug);
module.exports = mongoose.model('Employee', EmployeeSchema);
