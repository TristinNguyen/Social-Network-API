const { Schema, model} = require("mongoose");
const ReactionSchema = require('./Reaction')

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
    reactions: [ReactionSchema]
})


thoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model ('Thoughts', thoughtsSchema);
module.exports = Thought;