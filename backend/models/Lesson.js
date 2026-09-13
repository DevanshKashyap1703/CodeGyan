const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    videoUrl: {
      type: String,
      default: null,
    },
    content: {
      type: String,
      required: true,
    },
    codeExamples: [{
      language: String,
      code: String,
      description: String,
    }],
    quiz: [{
      question: String,
      options: [String],
      correctAnswer: Number,
      explanation: String,
    }],
    resources: [{
      title: String,
      url: String,
      type: String,
    }],
    order: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      default: '15 minutes',
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium',
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lesson', lessonSchema);