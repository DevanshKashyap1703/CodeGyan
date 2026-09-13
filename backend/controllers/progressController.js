const Progress = require('../models/Progress');
const Course = require('../models/Course');

exports.getProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    let progress = await Progress.findOne({ userId, courseId })
      .populate('courseId', 'title')
      .populate('completedLessons.lessonId', 'title');

    if (!progress) {
      progress = new Progress({
        userId,
        courseId,
      });
      await progress.save();
    }

    res.json({
      success: true,
      progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching progress',
      error: error.message,
    });
  }
};

exports.completeLessonProgress = async (req, res) => {
  try {
    const { courseId, lessonId } = req.body;
    const userId = req.user.id;
    const { quizScore } = req.body;

    let progress = await Progress.findOne({ userId, courseId });

    if (!progress) {
      progress = new Progress({
        userId,
        courseId,
        completedLessons: []
      });
    }

    const lessonExists = progress.completedLessons.some(
      l => l.lessonId.toString() === lessonId
    );

    if (!lessonExists) {
      progress.completedLessons.push({
        lessonId,
        completedAt: new Date(),
        quizScore: quizScore || 0,
      });
    }

    const course = await Course.findById(courseId).populate('lessons');
    const totalLessons = course.lessons.length;
    const completedCount = progress.completedLessons.length;
    progress.overallProgress = Math.round((completedCount / totalLessons) * 100);
    progress.lastAccessedAt = new Date();

    if (progress.overallProgress === 100) {
      progress.courseCertificate = {
        isEarned: true,
        earnedAt: new Date(),
        certificateUrl: `/certificates/${userId}/${courseId}`,
      };
    }

    await progress.save();

    res.json({
      success: true,
      message: 'Lesson marked as completed',
      progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating progress',
      error: error.message,
    });
  }
};

exports.getUserAllProgress = async (req, res) => {
  try {
    const userId = req.user.id;

    const allProgress = await Progress.find({ userId })
      .populate('courseId', 'title category level thumbnail')
      .sort({ updatedAt: -1 });

    res.json({
      success: true,
      totalCourses: allProgress.length,
      progress: allProgress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user progress',
      error: error.message,
    });
  }
};

exports.getCourseStats = async (req, res) => {
  try {
    const { courseId } = req.params;

    const courseProgress = await Progress.find({ courseId });
    const totalEnrolled = courseProgress.length;
    const completed = courseProgress.filter(
      p => p.overallProgress === 100
    ).length;
    const avgProgress = courseProgress.length > 0
      ? Math.round(
          courseProgress.reduce((sum, p) => sum + p.overallProgress, 0) /
            courseProgress.length
        )
      : 0;

    res.json({
      success: true,
      stats: {
        totalEnrolled,
        completed,
        completionRate: totalEnrolled > 0 ? Math.round((completed / totalEnrolled) * 100) : 0,
        averageProgress: avgProgress,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching course stats',
      error: error.message,
    });
  }
};

exports.getCourseLeaderboard = async (req, res) => {
  try {
    const { courseId } = req.params;
    const limit = parseInt(req.query.limit) || 10;

    const leaderboard = await Progress.find({ courseId })
      .populate('userId', 'name avatar')
      .sort({ overallProgress: -1 })
      .limit(limit);

    res.json({
      success: true,
      leaderboard,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching leaderboard',
      error: error.message,
    });
  }
};