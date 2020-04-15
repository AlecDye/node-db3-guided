const express = require("express");

const db = require("../data/db-config.js");
// Naming convention for models -> Uppercase table name being referenced
const Users = require("./user-model.js");

const router = express.Router();

router.get("/", (req, res) => {
  // db("users") -> being handled through Users; don't need to directly use db
  Users.all()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get users" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  // db("users")
  // .where({ id })
  Users.findById(id)
    .then((user) => {
      // const user = users[0];
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "Could not find user with given id." });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get user" });
    });
});

router.post("/", (req, res) => {
  const userData = req.body;

  // db("users")
  //   .insert(userData)
  Users.create()
    // id logic moved to model
    .then((user) => {
      res.status(201).json({ data: user });
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to create new user" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  // db("users")
  //   .where({ id })
  //   .update(changes)
  Users.update(id, changes)
    .then((updated) => {
      if (updated) {
        res.json({ data: updated });
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to update user" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  // db("users")
  //   .where({ id })
  //   .del()
  Users.remove()
    .then((count) => {
      if (count) {
        res.json({ removed: count });
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to delete user" });
    });
});

module.exports = router;
