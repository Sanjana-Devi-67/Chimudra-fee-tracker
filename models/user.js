const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String,required: true },
  hasPaid: { type: Boolean, default: false }, // ✅ Safe addition
  batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' } // ✅ Safe addition
});


module.exports = mongoose.model("User", UserSchema);
