const Course = require('../models/Course');
const Lesson = require('../models/Lesson');

exports.getAllCourses = async (req, res) => {
  try {
    const { category, level, search } = req.query;
    let filter = { isFree: true };

    if (category) filter.category = category;
    if (level) filter.level = level;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } },
      ];
    }

    const courses = await Course.find(filter)
      .populate('instructor', 'name avatar')
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      success: true,
      count: courses.length,
      courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching courses',
      error: error.message,
    });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id)
      .populate('instructor', 'name avatar bio')
      .populate({
        path: 'lessons',
        select: 'title description order duration difficulty',
      });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    res.json({
      success: true,
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching course',
      error: error.message,
    });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const { title, description, category, level, duration, tags } = req.body;
    const userId = req.user.id;

    if (!title || !description || !category || !duration) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    const course = new Course({
      title,
      description,
      category,
      level,
      duration,
      tags,
      instructor: userId,
    });

    await course.save();

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating course',
      error: error.message,
    });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const course = await Course.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    res.json({
      success: true,
      message: 'Course updated successfully',
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating course',
      error: error.message,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    await Lesson.deleteMany({ courseId: id });

    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    res.json({
      success: true,
      message: 'Course deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting course',
      error: error.message,
    });
  }
};

exports.getCoursesByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const courses = await Course.find({ category, isFree: true })
      .populate('instructor', 'name avatar')
      .sort({ rating: -1 })
      .limit(20);

    res.json({
      success: true,
      count: courses.length,
      courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching courses',
      error: error.message,
    });
  }
};