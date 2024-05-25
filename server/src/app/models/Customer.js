const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const CustomerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    quantity: { type: Number, required: true },
    checkin: { type: Date, required: true },
    checkout: { type: Date, required: true },
    catetable: { type: String, required: false },
    o_table: { type: String, required: false },
    note: { type: String, required: false },
    slug: { type: String, slug: 'name', unique: true }
  },
  {
    timestamps: true
  }
);
mongoose.plugin(slug);

module.exports = mongoose.model('Customer', CustomerSchema);
