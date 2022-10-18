const { Schema, model, Types } = require('mongoose');


const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String, 
            required: true,
            maxLength: 280, 
            minLength: 1
        }, 
        createdAt: {
            type: Date, 
            default: Date.now, 
            //date format 
        }, 
        userName: {
            type: String, 
            required: true
        }, 
        //reactionSchema
        replies: [ReactionSchema]
        
    }, 
    {
        toJSON: {
            getters: true, 
            virtuals: true
        }, 
        id: false
    }
);

//reactionSchema
const ReactionSchema = new Schema (
    {
     reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    }, 
    reactionBody: {
        type: String,
        required: true, 
        maxLength: 280
    }, 
    userName: {
        type: String, 
        required: true
    }, 
    createdAt: {
        type: Date, 
        default: Date.now,
        //get dateformat
    }

}, 
{
    toJSON: {
        getters: true
    }
});

const Thought = model('Thought', ThoughtSchema);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

module.exports = Thought;