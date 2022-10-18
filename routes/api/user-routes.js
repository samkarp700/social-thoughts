//user routes 
const router = require('express').Router();

//user get/post routes /api/users
const {
    getAllUsers, 
    getUser, 
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// get and post routes
router  
    .route('/')
    .get(getAllUsers)
    .post(createUser);

 //single user / by id 
 router
    .route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);
    
// post / delete user friends
router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

    module.exports = router;