const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    describe: { type: String, required: true },
    slug: { type: String, slug: 'name', unique: true }
  },
  {
    timestamps: true
  }
);
mongoose.plugin(slug);
module.exports = mongoose.model('Category', CategorySchema);
