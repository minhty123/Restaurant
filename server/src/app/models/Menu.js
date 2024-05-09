const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const MenuSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    describe: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    unit: { type: String, required: true },
    image: { type: String, required: true },
    status: { type: String, required: true },
    slug: { type: String, slug: 'name', unique: true }
  },
  {
    timestamps: true
  }
);
mongoose.plugin(slug);

module.exports = mongoose.model('Menu', MenuSchema);
