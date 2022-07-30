const thoughts = new thoughtSchema({
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
    reactions: {
        

    },

})