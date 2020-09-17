const router = require('express').Router();

const {
	getAllThought,
	getThoughtById,
	createThought,
	updateThought,
	deleteThought
} = require('../../controllers/thought-controller');

// GET and POST at /api/thoughts
router.route('/').get(getAllThought).post(createThought);

// GET one, PUT, and DELETE at /api/thoughts/:id
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);

module.exports = router;
