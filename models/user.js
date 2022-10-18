//user model 
const { Schema, model, Types } = require('mongoose');


const UserSchema = new Schema(
    {
    userName: {
        type: String, 
        unique: true, 
        required: true, 
        trim: true
    }, 
    userEmail: {
        type: String, 
        required: true, 
        unique: true, 
        //set up matching validation
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please fill a valid email address",]
    }, 
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],

    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}, 
{
    toJSON: {
        virtuals: true
    }, 
    id: false
}
);

//create the user model using UserSchema
const User = model('User', UserSchema);
//get total count of friends upon retrieval 
UserSchema.virtual('friendCount').get(function() {
    //reduce method
    return this.friends.reduce((total, friends) => total + friends.length + 1, 0);
});

//export
module.exports = User;