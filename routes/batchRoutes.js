const express = require("express");
const { getBatches } = require("../controllers/batchcontroller");
const router = express.Router();

router.get("/batches", (req, res) => {
    res.render("pages/batches", {session: req.session});  
});

module.exports = router;
