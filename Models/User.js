const { userSchema, model } = require("mongoose");



const schema = new userSchema(
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
        thoughts:{

        },
        friends:{

        },
    }
)

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});


const User = model('User', userSchemas);
module.exports = User;