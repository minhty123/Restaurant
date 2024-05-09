const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const EmployeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, required: true },
    position: { type: String, required: true },
    birthday: { type: Date, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    salary: { type: Number, required: true },
    slug: { type: String, slug: 'name', unique: true }
  },
  {
    timestamps: true
  }
);
mongoose.plugin(slug);
module.exports = mongoose.model('Employee', EmployeeSchema);
