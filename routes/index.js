const router = require('express').Router();

router.get('/', (req, res) => {res.send('Hello world!');});

router.use('/', require('./swagger'));

router.use('/groceries', require('./groceries'));

router.use('/media', require('./media'));

module.exports = router;