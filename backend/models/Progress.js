const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    completedLessons: [{
      lessonId: mongoose.Schema.Types.ObjectId,
      completedAt: Date,
      quizScore: Number,
    }],
    overallProgress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    courseCertificate: {
      isEarned: Boolean,
      earnedAt: Date,
      certificateUrl: String,
    },
    startedAt: {
      type: Date,
      default: Date.now,
    },
    lastAccessedAt: {
      type: Date,
      default: Date.now,
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

module.exports = mongoose.model('Progress', progressSchema);