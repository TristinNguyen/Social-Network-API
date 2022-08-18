const { Types, Schema} = require("mongoose");


const reactionsSchema = new Schema(
    {
        reactionID: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId
        },
        reactionBody: {
            type: String,
            required: [ true, 'Please insert reaction'],
            maxlength: 280
        },
        userName: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            timestamps: true
        }
    }
)

// const Reaction = model('Reaction', reactionsSchema)

module.exports = reactionsSchema;