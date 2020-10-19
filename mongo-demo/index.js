const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises', 
    {useNewUrlParser: true, useUnifiedTopology: true}) // returns a Promise
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

const courseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 255,
        // match: /pattern/
     },
     category: {
        type: String,
        required: true,
        enum: [ 'web', 'mobile', 'network' ],
        lowercase: true,
        // uppercase: true,
        trim: true
     },
    author: String,
    tags: {
        type: Array,
        validate: {
            // isAsync: true,
            validator: (v) => new Promise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        // Do some async work
                        const result = v && v.length > 0;
                        if(result) resolve(result);
                        else {
                            throw new Error('A course should have at least one tag')
                        }
                    }
                    catch (err){
                        reject(err);
                    }
                }, 4000);
            })
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () { return this.isPublished },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});

// Classes, objects
// Course, nodeCourse
const Course = mongoose.model('Course', courseSchema); // compile courseSchema into a model

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        category: 'WEB',
        author: 'Mosh',
        tags: ['frontend'],
        isPublished: true,
        price: 16.5
    });
    
    try {
        const result = await course.save(); // returns a Promise
        console.log(result); 
    }
    catch (ex) {
       for (field in ex.errors)
            console.log(ex.errors[field].message);
    }
}

async function getCourses() {
    // Comparison Query Operators:
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal)
    // lt (less than)
    // lte (less than or equal)
    // in
    // nin (not in)

    //Logical Query Operators:
    // or 
    // and

    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course
        // Logical Query Operator examples:
        // .find()
        // .or([ { author: 'Mosh' }, { isPublished: true } ]) // author is Mosh or that are published
        // .and([ { author: 'Mosh' }, { isPublished: true } ]) // author is Mosh and that are published
        
        // Comparison Query Operator examples:
        // .find({ price: { $gte: 10, $lte: 20 } }) // between $10-$20
        // .find({ price: { $in: [10, 15, 20] } }) // are $10, $15 or $20    
        
        // Regular expressions
        // .find({ author: /^Mosh/ }) // Starts with Mosh
        // .find({ author: /Hamadani$/i }) // Ends with Hamadani (not case sensitive)
        // .find({ author: /.*Mosh.*/i }) // Contains the name Mosh (not case sensitive)

        // .find({ author: 'Mosh', isPublished: 'true' })
        // .skip((pageNumber - 1) * pageSize)
        // .limit(pageSize)
        // .sort({ name: 1 })
        // .select({ name: 1, tags: 1 });

        .find({ name: 'Angular Course' })
        .sort({ price: 1 })
        .select({ name: 1, tags: 1 , price: 1 });
        // .countDocuments(); // test- counts the number of documents that match
   console.log(courses[2].price);
}

async function updateCourse(id) {
    // Approach: Query first
    // findById()
    // Modify its properties
    // save()

    // const course = await Course.findById(id);
    // if (!course) return;
    
    // Option 1:
    // course.isPublished = true;
    // course.author = 'Another Author'

    // // Option 2:
    // course.set({
    //     isPublished: true,
    //     author: 'Another Author'
    // });
    
    // const result = await course.save();
    // console.log(result);

    
    // Approach: update first
    // update directly
    // Optionally: get the update document

    // updates and prints how many changes have been made
    // const result = await Course.update({ _id: id }, {
    //     $set: {
    //         author: 'Mosh',
    //         isPublished: false
    //     }
    // });
    // console.log(result);

    // updates and prints the course before the change
    // const course = await Course.findByIdAndUpdate(id, {
    //     $set: {
    //         author: 'Hamadani',
    //         isPublished: true
    //     }
    // });
    // console.log(course);

    // updates and prints the course before the change
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Josh',
            isPublished: false
        }
    }, { new: true });
    console.log(course);
}

async function removeCourse(id) {
    // simply delete
    // const result = await Course.deleteOne({ _id: id });
    // console.log(result);
    
    // delete a document and print it to console
    const course = await Course.findByIdAndRemove(id);
    console.log(course);   
}

// createCourse();
getCourses();
// updateCourse('5f3bfd81e6deecb2ee2466e0');
// removeCourse('5f3bfd81e6deecb2ee2466e0');