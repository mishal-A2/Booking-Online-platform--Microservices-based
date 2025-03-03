const express = require("express");
const { bookEvent } = require("./controllers");

const router = express.Router();

router.post("/", bookEvent);

module.exports = router;
