const { Schema, model, Types } = require("mongoose");

//schema creating reactions

const createReaction = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 200,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate,
        },
    },
    {
        toJSON: {
            getters: true,
        },
        _id: false,
    }
);

const createThoughtSchema =  new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 260,
            minlength: 1,

        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [createReaction],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);


function formatDate(createdAt) {
    return createdAt.toLocalString();
}


createThoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

const Thought = model("thought", createThoughtSchema);

module.exports = Thought;