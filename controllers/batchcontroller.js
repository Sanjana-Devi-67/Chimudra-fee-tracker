const Batch = require("../models/batch");

exports.getBatches = async (req, res) => {
  const batches = await Batch.find();
  res.json(batches);
};
