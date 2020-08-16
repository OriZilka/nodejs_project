const express = require('express');
const router = express.Router();

// Using Middleware functions
// router.use(express.json()); // gets req.body

router.get('/', (req,res) => {
    res.render('index', {title: 'My Express App', message: 'Hello'});
});

module.exports = router;