//user model 
const { Schema, model } = require('mongoose');
//date format if added 

const UserSchema = new Schema({
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
    }, 
    userThoughts: {
        // array of id values referencing thought model
    }, 
    userFriends: {
        //array of id values referencing user model - self reference
    }
}, 
{
    toJSON: {
        getters: true, 
        getters: true
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