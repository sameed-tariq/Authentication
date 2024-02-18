const express = require("express");
const router = express.Router();

const db = require("../models");

router.get("/", async (req, res) => {
  const data = await db.user.findAll();
  res.send(data);
});

router.get("/:id", async (req, res) => {
  const user = await db.user.findOne({
    where: {
      id: req.params.id,
    },
  });
  //const email= await db.user.getEmal(user);
 
  if(user){
    const getEmail = user.getEmail();
    res.send(getEmail);
  }
  else{
    res.send("there is already an existing user with this id!");
  }
})

router.post("/", async (req, res) => {
  try {
    const user = await db.user.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user) {
      res.send("there is already an existing user with this email!");
    } else {
      const data = await db.user.create({
        email: req.body.email,
        password: req.body.password,
      });

      res.send(data);
    }
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    console.log(req.body);

    const user = await db.user.update(req.body, {
      where: {
        id,
      },
    });

    if (user) {
      res.send(user);
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  const user = await db.user.destroy({
    where: {
      id,
    },
  });
  console.log(user);
  res.send({ message: "User is deleted" });
});

module.exports = router;
