const db = require("../data/db-config.js");

// this template acts as a quick reference
module.exports = {
  all,
  findById,
  create,
  update,
  remove,
};

// implementation details
// using non-arrow functions so we can export at top of file instead of bottom
function all() {
  return db("users");
}

// implement a method to find a user by id
function findById(id) {
  return db("users").where({ id }).first();
}

function create(user) {
  return db("user")
    .insert(userData, "id")
    .then(([id]) => {
      return findById(id);
    });
}

function update(id, changes) {
  return db("users")
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function remove() {
  return db("users").where({ id }).del();
}
