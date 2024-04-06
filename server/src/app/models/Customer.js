const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const CustomerSchema = new mongoose.Schema(
  {
    c_name: { type: String, required: true },
    c_address: { type: String, required: true },
    phone: { type: Number, required: false },
    slug: { type: String, slug: 'name', unique: true }
  },
  {
    timestamps: true
  }
);
mongoose.plugin(slug);

module.exports = mongoose.model('Customer', CustomerSchema);
