const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const TableSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    capacity: { type: Number, required: true },
    type: { type: String, required: false },
    status: { type: String, required: true },
    reserved: { type: String, required: false },
    reserved_time: { type: String, required: false },
    slug: { type: String, slug: 'name', unique: true }
  },
  {
    timestamps: true
  }
);
mongoose.plugin(slug);
module.exports = mongoose.model('Table', TableSchema);
