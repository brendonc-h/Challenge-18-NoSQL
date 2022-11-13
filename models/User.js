const { Schema, model, Types} = require("mongoose");

//creating user model shema

const newUserSchema = new Schema (
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            validate: {
                validator: function (v) {
                    //regex for email validator
                    return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
                },
                message: (props) => `${props.value} is not a valid Email!`
            },
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "thougtht",

            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "user",
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);


newUserSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

const User = model("user", newUserSchema);

model.exports = User;