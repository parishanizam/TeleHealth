const mongoose = require('mongoose');

// Sub-schema for each answer
const AnswerSchema = new mongoose.Schema({
  questionId: {
    type: String,
    required: true
  },
  selectedOption: {
    type: String,
    required: true
  },
}, { _id: false }); 

const TestSessionSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    answers: [AnswerSchema], 
    testDate: {
      type: Date,
      default: Date.now,
    },
    duration: {
      type: Number,
      required: false,
    },
    videoFileName: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('TestSession', TestSessionSchema);
