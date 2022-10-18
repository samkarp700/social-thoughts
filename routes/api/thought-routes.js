const router = require('express').Router();

const {
    getAllThoughts, 
    getThoughtById, 
    addThought, 
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');


//get all thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(addThought);


//single thought by id
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);


//reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(deleteReaction);


module.exports = router;