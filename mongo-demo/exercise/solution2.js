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
    return await Course
        .find({ isPublished: true })
        .or([ { tags: /.*frontend.*/i }, { tags: /.*backend.*/i } ])
        // .find({ isPublished: true, tags: { $in: ['frontend', 'backend' ] } }) // another solution
        .sort({ price: -1 })
        .select({ name: 1, author: 1 });
        // .select({ price: 1 }); // check if sort() went right
}

async function run() {
    const courses = await getCoursesEx1();
    console.log(courses);
}

run();