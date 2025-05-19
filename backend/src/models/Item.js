// models/Item.js   (CommonJS)

const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    done:  { type: Boolean, default: false } // Boolean usually clearer for “done”
  },
  { timestamps: true }
);

// Export the model using CommonJS
module.exports = mongoose.model('Item', itemSchema);
