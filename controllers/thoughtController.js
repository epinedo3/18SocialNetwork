const { User,Thought } = require('../models');
const thought = require("../models/thought");

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      Thought.find()
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a thought
  async getSingleThoughts(req, res) {
    try {
      Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(course);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create new thought
  async createThought(req, res) {
    try {
      const create = await Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(course);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a thought
  async deleteThought(req, res) {
    try {
      Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!course) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      await user.deleteMany({ _id: { $in: user.thought } });
      res.json({ message: 'thought deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a thought
  async updateThought(req, res) {
    try {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(course);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // remove a reaction from a thought
  async removeReaction(req, res) {
    try {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        {  $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(course);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // add a reaction to thought
  async addReaction(req, res) {
    try {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(course);
    } catch (err) {
      res.status(500).json(err);
    }
  },

};
