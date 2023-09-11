const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction');

// Schema to create Student model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 280,
      min_length: 1
    },
    createdAt: {
      type: Date,
      default: new Date.now(),
      get: (date) => date.toLocaleDateString()
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return `${this.reactions}`;
  })

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
