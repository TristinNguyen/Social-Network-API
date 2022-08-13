const { userSchema, model, Schema } = require("mongoose");



const usersSchema = new Schema(
    {
        username: {
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
        thoughts:[
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],

        friends:[
            {
                type: Schema.Types.ObjectId,
                ref: this //or could use syntax 'User'//
            }
        ]
    })

usersSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});


const User = model('User', usersSchema);
module.exports = User;