const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    slug: { type: String, slug: 'e_name', unique: true }
  },
  {
    timestamps: true
  }
);
mongoose.plugin(slug);
module.exports = mongoose.model('Employee', CategorySchema);
