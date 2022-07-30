const { Schema, model } = require("mongoose");

const thoughtsSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        validate: [({length}) => length >= 1 && length <= 128, 'Password must be between 1 and 128 characters!']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        timestamps: true
    },
    username: {
        type: String,
        required: true
    },
    reactions: 
        [reactionsSchema]
})


thoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thoughts = model ('Thoughts', thoughtSchema);
module.exports = Thoughts;