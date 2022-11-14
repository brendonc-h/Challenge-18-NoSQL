const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  // Getting all users
  getUsers(req, res) {
    User.find()
      .populate("thoughts")
      .populate("friends")
      .then(async (users) => {
        return res.json(users);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Get a one user
  getOneUser(req, res) {
    User.findById(ObjectId(req.params.userId))
      .populate("thoughts")
      .populate("friends")
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // create one new user
  createOneUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // Update one user
  updateOneUser(req, res) {
    User.findByIdAndUpdate(
      ObjectId(req.params.userId),
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete one user and remove their thoughts
  async deleteOneUser(req, res) {
    try {
      const user = await User.findOneAndRemove({
        _id: ObjectId(req.params.userId),
      });

      if (user) {
        // Delete all thoughts from user
        const thoughts = await Thought.deleteMany({ username: user.username });
         console.log(thoughts);
      } else {
        res.status(404).json({ message: "No such user exists" });
      }
      res.json({ message: "User successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // create one friend
  createOneFriend(req, res) {
    User.findByIdAndUpdate(
      ObjectId(req.params.userId),
      { $addToSet: { friends: ObjectId(req.params.friendId) } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // delete one friend
  deleteOneFriend(req, res) {
    User.findByIdAndUpdate(
      ObjectId(req.params.userId),
      {
        $pull: { friends: ObjectId(req.params.friendId) },
      },
      { returnDocument: "after" }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};