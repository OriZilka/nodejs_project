const Joi = require('joi');
const express = require('express');
const router = express.Router();

// Using Middleware functions
// router.use(express.json()); // gets req.body

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
];

// HTTP GET requests
router.get('/', (req,res) => {
    res.send(courses);
});

// HTTP GET requests
router.get('/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID is nott found');
    res.send(course);
});

// HTTP POST requests
router.post('/', (req,res) => {
    // Validate
   const { error } = validateCourses(req.body);
   // If invalid, return 400 - bad request
   if(error) return res.status(400).send(error.details[0].message);
    
    const course = {
        id: courses.length + 1, 
        name: req.body.name 
    };
    courses.push(course);
    res.send(course);
});

// HTTP delete request
router.delete('/:id', (req,res) => {
    // Look up the course
   const course = courses.find(c => c.id === parseInt(req.params.id));
   // If not existing, return 404
   if (!course) return res.status(404).send('The course with the given ID is nott found');

   // Delete
   const index = courses.indexOf(course);
   courses.splice(index, 1);

   // Return the same course
   res.send(course);
});

// HTTP PUT requests
router.put('/:id', (req,res) => {
   // Look up the course
   const course = courses.find(c => c.id === parseInt(req.params.id));
   // If not existing, return 404
   if (!course) return res.status(404).send('The course with the given ID is not found');
  
   // Validate
   const { error } = validateCourses(req.body);
   // If invalid, return 400 - bad request
   if(error) return res.status(400).send(error.details[0].message);

   // Update course
   course.name = req.body.name;
   // return the updated course
   res.send(course);
});

// validation help function
function validateCourses(course) {
    const schema = {
        name: Joi.string().min(3).required()
        };
    
        return Joi.validate(course, schema);     
};

module.exports = router;



//// Route parameters
// app.get('/:id', (req,res) => {
//     res.send(req.params.id);
// });

// app.get('/api/posts/:year/:month', (req,res) => {
//     res.send(req.params);
// });

// app.get('/api/posts/:year/:month', (req,res) => {
//     res.send(req.query);
// });