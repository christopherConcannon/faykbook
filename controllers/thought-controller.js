const { Thought, User } = require('../models');

const thoughtController = {
	getAllThought(req, res) {
		Thought.find({}).then((dbThoughtData) => res.json(dbThoughtData)).catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
	},

	getThoughtById({ params }, res) {
		Thought.findOne({ _id: params.id })
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					res.status(404).json({ message: 'No user found with this id!' });
					return;
				}
				res.json(dbThoughtData);
			})
			.catch((ett) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	createThought({ body }, res) {
		Thought.create(body)
			.then(({ _id }) => {
				return User.findOneAndUpdate(
					// user _id
					{ _id: body.userId },
					// thought _id
					{ $push: { thoughts: _id } },
					{ new: true }
				);
			})
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: 'No user found with this id.' });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.status(500).json(err));
	},

	updateThought({ params, body }, res) {
		Thought.findOneAndUpdate({ _id: params.id }, body, {
			new: true,
			runValidators: true
		})
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					res.status(404).json({ message: 'No thought with this id.' });
					return;
				}
				res.json(dbThoughtData);
			})
			.catch((err) => res.status(400).json(err));
	},

	deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(deletedThought => {
        if (!deletedThought) {
          res.status(404).json({ message: 'No thought with this id.' })
        return;
        }

        return User.findOneAndUpdate(
          { username: deletedThought.username },
          // { _id: params.userId },
          { $pull: { thoughts: params.id} },
          { new: true }
        )
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id.' });
          return;
        }
        res.json(dbUserData)
      })
      .catch(err => res.json(err));
  }
};

module.exports = thoughtController;