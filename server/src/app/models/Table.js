const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const TableSchema = new mongoose.Schema(
  {
    capacity: { type: Number, require: true },
    type: { type: String, require: true },
    status: { type: String, require: true },
    reserved: { type: String, require: true },
    reserved_time: { type: String, require: true },
    slug: { type: String, slug: 'e_name', unique: true }
  },
  {
    timestamps: true
  }
);
mongoose.plugin(slug);
module.exports = mongoose.model('Table', TableSchema);
