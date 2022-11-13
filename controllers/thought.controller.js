const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');


module.exports = {
    getThought(req, res) {
        Thought.find()
        .then(async (thoughts) => {
            return res.json(thoughts)
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        })
},
//get a single thought
getOneThought(req, res) {
    Thought.findById(ObjectId(req.params.thoughtId))
    .then((thought) =>
    !thought
        ? res.status(404).json({ message: "No thought with the ID!"})
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
},

//make on thought

createOneThought(req, res) {
    Thought.create(req.body)
    .then(async function (thought){
        await User.findOneAndUpdate(
            { username: req.body.username },
            { $addToSet: { thoughts: ObjectId(thought._id) } },
            { runValidators: true, new: true }
        );
        res.json(thought);
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    });
},

updateOneThought(req, res) {
    Thought.findByIdAndUpdate(
        ObjectId(req.params.thoughtId),
        { $set: req.body},
        { runValidators: true, new: true}
    )
    .then((thought) => 
    !thought
        ? res.status(404).json({ message: "No thought by ID!" })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
},

  // Delete one thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findByIdAndRemove(
        ObjectId(req.params.thoughtId)
      );
      // console.log(thought);

      if (thought) {
        // Remove the thought from the User's thought array
        
        const user = await User.updateOne(
          { username: thought.username },
          {
            $pull: { thoughts: ObjectId(req.params.thoughtId) },
          }
        );
        // console.log(user);
      } else {
        res.status(404).json({ message: "No thought exists!" });
      }
      res.status(200).json({ message: "Thought successfully deleted!" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // create a reaction
  createOneReaction(req, res) {
    Thought.findByIdAndUpdate(
      ObjectId(req.params.thoughtId),
      {
        $addToSet: {
          reactions: {
            reactionBody: req.body.reactionBody,
            username: req.body.username,
          },
        },
      },
      { runValidators: true, new: true, returnDocument: "after" }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found by ID." })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // delete a reaction
  async deleteOneReaction(req, res) {
    try {
      // Find the thought
      const thought = await Thought.findById(ObjectId(req.params.thoughtId));

      // Get the reaction you want to delete
      const result = thought.reactions.find(
        (reaction) => reaction.reactionId == req.params.reactionId
      );

      // Delete the reaction from the reactions array
      thought.reactions.remove(result);

      // Save the thought
      thought.save();

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

