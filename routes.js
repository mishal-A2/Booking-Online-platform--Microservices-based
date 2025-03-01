const express = require("express");
const { register_new_user, find_user } = require("./controllers");

const router = express.Router();

router.post("/register", register_new_user);
router.get("/:email", find_user);

router.get("/", (req, res) => {
    res.send("User Service is running atm!");
  });
  

  
module.exports = router;
