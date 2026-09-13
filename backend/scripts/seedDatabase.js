const mongoose = require('mongoose');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const User = require('../models/User');
const freeCourses = require('../data/courses');
const bcrypt = require('bcryptjs');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/codegyan', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    await Course.deleteMany({});
    await Lesson.deleteMany({});
    console.log('Cleared existing courses and lessons');

    let instructor = await User.findOne({ email: 'instructor@codegyan.com' });
    if (!instructor) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      instructor = new User({
        name: 'CodeGyan Team',
        email: 'instructor@codegyan.com',
        password: hashedPassword,
        role: 'instructor',
        bio: 'Official CodeGyan instructor team',
      });
      await instructor.save();
      console.log('Created default instructor');
    }

    for (const courseData of freeCourses) {
      const course = new Course({
        title: courseData.title,
        description: courseData.description,
        category: courseData.category,
        level: courseData.level,
        duration: courseData.duration,
        instructor: instructor._id,
        tags: courseData.tags,
        isFree: true,
        rating: Math.floor(Math.random() * 5) + 3.5,
        totalStudents: Math.floor(Math.random() * 10000) + 100,
      });

      await course.save();

      for (let i = 0; i < courseData.lessons.length; i++) {
        const lesson = new Lesson({
          title: courseData.lessons[i],
          description: `Comprehensive lesson on ${courseData.lessons[i]}`,
          courseId: course._id,
          content: `<h2>${courseData.lessons[i]}</h2><p>Detailed content for this lesson will be added here.</p>`,
          order: i + 1,
          duration: `${(20 + Math.random() * 40).toFixed(0)} minutes`,
          difficulty: course.level,
          isPublished: true,
          codeExamples: [
            {
              language: 'javascript',
              code: 'console.log("Example code");',
              description: 'Sample code example',
            },
          ],
          quiz: [
            {
              question: `What is the main concept of ${courseData.lessons[i]}?`,
              options: ['Option A', 'Option B', 'Option C', 'Option D'],
              correctAnswer: 0,
              explanation: 'This is the correct answer because...',
            },
          ],
          resources: [
            {
              title: 'Official Documentation',
              url: 'https://example.com/docs',
              type: 'documentation',
            },
          ],
        });

        await lesson.save();
        course.lessons.push(lesson._id);
      }

      await course.save();
      console.log(`Created course: ${course.title} with ${courseData.lessons.length} lessons`);
    }

    console.log('\n✅ Database seeding completed successfully!');
    console.log(`✅ Created ${freeCourses.length} courses with sample lessons`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();