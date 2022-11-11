const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');


module.exports = {
    getThought(req, res) {
        Thought.find()
        .then(async (thoughts) => {
            return res.json(thoughts)
        })
    }
}