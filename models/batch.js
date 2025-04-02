const mongoose = require("mongoose");

const BatchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  time: { type: String, required: true },
  price: { type: Number, required: true },
  
  // Adding students array (referencing User model)
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ]
});
module.exports = mongoose.model("Batch", BatchSchema);
