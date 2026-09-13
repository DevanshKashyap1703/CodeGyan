const Lesson = require('../models/Lesson');
const Course = require('../models/Course');

exports.getLessonsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const lessons = await Lesson.find({ courseId })
      .select('title description order duration difficulty')
      .sort({ order: 1 });

    if (lessons.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No lessons found for this course',
      });
    }

    res.json({
      success: true,
      count: lessons.length,
      lessons,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching lessons',
      error: error.message,
    });
  }
};

exports.getLessonById = async (req, res) => {
  try {
    const { id } = req.params;

    const lesson = await Lesson.findById(id);

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found',
      });
    }

    res.json({
      success: true,
      lesson,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching lesson',
      error: error.message,
    });
  }
};

exports.createLesson = async (req, res) => {
  try {
    const { courseId, title, description, content, order, duration, difficulty } = req.body;

    if (!courseId || !title || !description || !content || order === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    const lesson = new Lesson({
      courseId,
      title,
      description,
      content,
      order,
      duration,
      difficulty,
    });

    await lesson.save();

    await Course.findByIdAndUpdate(courseId, {
      $push: { lessons: lesson._id },
    });

    res.status(201).json({
      success: true,
      message: 'Lesson created successfully',
      lesson,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating lesson',
      error: error.message,
    });
  }
};

exports.updateLesson = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const lesson = await Lesson.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found',
      });
    }

    res.json({
      success: true,
      message: 'Lesson updated successfully',
      lesson,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating lesson',
      error: error.message,
    });
  }
};

exports.deleteLesson = async (req, res) => {
  try {
    const { id } = req.params;

    const lesson = await Lesson.findByIdAndDelete(id);

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found',
      });
    }

    await Course.updateOne(
      { _id: lesson.courseId },
      { $pull: { lessons: id } }
    );

    res.json({
      success: true,
      message: 'Lesson deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting lesson',
      error: error.message,
    });
  }
};

exports.addCodeExample = async (req, res) => {
  try {
    const { id } = req.params;
    const { language, code, description } = req.body;

    const lesson = await Lesson.findByIdAndUpdate(
      id,
      {
        $push: {
          codeExamples: { language, code, description },
        },
      },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Code example added successfully',
      lesson,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding code example',
      error: error.message,
    });
  }
};

exports.addQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, options, correctAnswer, explanation } = req.body;

    const lesson = await Lesson.findByIdAndUpdate(
      id,
      {
        $push: {
          quiz: { question, options, correctAnswer, explanation },
        },
      },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Quiz added successfully',
      lesson,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding quiz',
      error: error.message,
    });
  }
};

exports.addResource = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, url, type } = req.body;

    const lesson = await Lesson.findByIdAndUpdate(
      id,
      {
        $push: {
          resources: { title, url, type },
        },
      },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Resource added successfully',
      lesson,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding resource',
      error: error.message,
    });
  }
};