const passport = require('passport');

const router = require('express').Router();

// router.get('/', (req, res) => {res.send('Hello world!');});

router.use('/', require('./swagger'));

router.use('/groceries', require('./groceries'));

router.use('/media', require('./media'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err){
        if (err) {return next(err);}
        res.redirect('/');
    });
});

module.exports = router;