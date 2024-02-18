const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
require('dotenv').config();

const db = require("../models");

router.post("/", async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  const user = await db.user.findOne({
    where: {
      email: email,
    },
  });
  if (user) {
    await bcrypt.compare(password, user.password, (err)=>{
      if(!err){
        const payload = {
          id: user.id,
          email: user.email,
          password: user.password,
        };
        const token = jwt.sign(payload, process.env.JWT_KEY);
        res.send(token);
      }
      else{
          res.status(401).send("Wrong username or Password")
      }
    })
  }
  else{
    res.status(404).send("User does not exist!");
  }
});

module.exports = router;
