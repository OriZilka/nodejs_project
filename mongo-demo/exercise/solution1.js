const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises', 
    {useNewUrlParser: true, useUnifiedTopology: true}) // returns a Promise
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCoursesEx1() {
    const courses = await Course
        .find({ isPublished: true, tags: /.*backend.*/i })
        .sort({ name: 1 })
        .select({ name: 1, author: 1 });

       return courses;
}

async function run() {
    const courses = await getCoursesEx1();
    console.log(courses);
}

run();