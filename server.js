const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const dotenv = require('dotenv').config();
const app = express();
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const port = process.env.PORT || 4000;
const GitHubStrategy = require('passport-github').Strategy
app.use(bodyParser.json());
app.use(session({
    secret: "secret",
    resume: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 
        'Origin, X-Request-With, Content-Type, Accept, Z-Key'
    )
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
    });
app.use(cors({methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']}));
app.use(cors({origin:({origin: '*'})}));
app.use('/', require('./routes/index'));

passport.use(new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        clientURL: process.env.CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done){
        // user.findOrCreate({github: profile.id}, function(err, user) 
        {
        console.log(accessToken)
        console.log(refreshToken)
        console.log(profile)
        return done(null, profile)
        };
    }
));

passport.serializeUser((user, done) => {
   done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => {res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged Out')})

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
});


process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
  });

mongodb.initDb((err) => {
    if(err){
        console.log(err)
    }
    else {
        app.listen(port, () => {console.log(`Running on port ${port}`)});
    }
});



