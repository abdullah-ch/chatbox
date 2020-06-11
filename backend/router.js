const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.send("This router will handle the get requests");
});

module.exports = router;
