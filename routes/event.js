const express = require('express')
const router = express.Router()

const db = require("../models");

router.get("/", async (req, res) => {
    const data = await db.event.findAll();
    res.send(data);
  });

  router.get("/:location", async (req, res) => {
    const location = req.params.location;
    events = await db.event.findEvent(location);

    if (!events) {
      return res.status(404).send("User not found");
    }
    else{
      res.json(events);
    }
  });  
  
  router.post("/", async (req, res) => {
    try {
      const email = req.body.email;
      const user = await db.user.findOne({
        where: {
          email: email,
        },
      });
  
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const data = await db.event.create({
        location: req.body.location,
        description: req.body.description,
        time: req.body.time,
        userId: user.id,
      });
  
      console.log(req.body);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).send("Error occurred while creating!");
    }
  });
  
  router.put("/:id", async (req, res) => {
    try {
      let id = req.params.id;
      let data = await db.event.update(req.body, {
        where: {
          userId: id,
        },
      });
      console.log(">>>>", data);
  
      res.json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error occurred while updating event" });
    }
  });
  
  router.delete("/:id", async (req, res) => {
    let { id } = req.params;
    const user = await db.event.destroy({
      where: {
        id,
      },
    });
    console.log(user);
    res.status(500).send({ message: "Event is deleted" });
  });
  
  module.exports = router