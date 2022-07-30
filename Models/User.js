const { userSchema, model, Schema } = require("mongoose");



const userSchema = new Schema(
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

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});


const User = model('User', userSchema);
module.exports = User;