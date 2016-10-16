require('es6-promise').polyfill();
require('isomorphic-fetch');
require('babel-register')({ignore: /node_modules/});

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.dev');
const sha1 = require('sha1');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const connectEnsureLogin = require('connect-ensure-login');
const http = require('./src/helpers/http').default;

const secret = 'eaw3ienge6Eing6nue7Mois1Vesequ0Chahx1ahyieti8acxyee2zadsfe';
const app = express();
const compiler = webpack(config);


function authenticate(username, psw, done) {
  http({ uri: '/users', isExternal: true}).then(users => {
    if (users.length) {
      const user = users.find(user => user.username === username);
      if (user) {
        done( null, {id: user.id})
      }
    }
    done(null, false);
  });
}

function logout(req, res){
  req.logout();
  res.redirect('/login');
}

function handleAppRequest(req, res) {
  res.cookie('userId', req.session.passport.user.id);
  res.sendFile(path.join(__dirname, 'index.html'));
}

function handleApi(req, res) {
  if (req.params.userId && req.session.passport.user && parseInt(req.params.userId, 10) === req.session.passport.user.id) {
    http({uri: req.originalUrl.replace('/api', ''), isExternal: true}).then(response => {
      res.setHeader('Content-Type', 'application/json');
      res.send(response);
    })
  } else {
    res.status(404).send('Not found');
  }
}

passport.use(new LocalStrategy(authenticate));
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app
  .use(require('webpack-dev-middleware')(compiler, {publicPath: config.output.publicPath}))
  .use(session({secret: secret, resave: false, saveUninitialized: false}))
  .set('views', __dirname + '/src/ejs')
  .set('view engine', 'ejs')
  .use(cookieParser())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(passport.initialize())
  .use(passport.session())
  .use(require('webpack-hot-middleware')(compiler))
  .get('/login', (req, res) => res.render('login'))
  .post('/login', passport.authenticate('local', {failureRedirect: '/login?message=Login failed' }), (req, res) => {
    res.redirect('/user')
  })
  .get('/logout', logout)
  .use('/api/users/:userId*',connectEnsureLogin.ensureLoggedIn(), handleApi)
  .use(connectEnsureLogin.ensureLoggedIn(), handleAppRequest)
  .listen(3000, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:3000');
});
