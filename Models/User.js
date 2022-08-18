const {model, Schema } = require("mongoose");



const usersSchema = new Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
        },
        thought:[
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],

        friends:[
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    });

usersSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});


const User = model('User', usersSchema);
module.exports = User;