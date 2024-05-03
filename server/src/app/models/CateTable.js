const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const CateTableSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    unit: { type: String, require: true },
    price: { type: Number, require: true },
    describe: { type: String, require: true },
    slug: { type: String, slug: 'name', unique: true }
  },
  {
    timestamps: true
  }
);
mongoose.plugin(slug);
module.exports = mongoose.model('CateTable', CateTableSchema);
