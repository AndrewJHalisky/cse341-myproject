const router = require('express').Router();

router.get('/', (req, res) => {res.send('Hello world!');});

router.use('/groceries', require('./groceries'));

module.exports = router;