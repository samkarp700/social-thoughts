const { User, Thought } = require('../models');

 
const userController = {
    //get all users
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //get user by id 
    getUser({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select:'-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            //if no user found, send err
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found!'});
                return;
            }
            res.json(dbUserData);
        })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },


    //post a new user 
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    //update a user by id 
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    //delete a user by id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found!'});
                return;
            }
            // figure out removing user's associated thoughts when deleted
            return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
        })
        .then(() => {
            res.json({ message: 'User has been deleted' });
        })
        .catch(err => res.status(400).json(err));
    },

    //api/users/:userId/friends/:friendId
    // new friend 
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $push: { friends: params.friendId } },
            { new: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    //delete friend 
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
};

module.exports = userController;

