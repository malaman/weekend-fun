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

/**
 * If username is found within from http://jsonplaceholder.typicode.com/users endpoint, user is authenticated
 * sessions are stored in memory. After server restart user should pass login procedure again
 *
 * @param {String} username username from http://jsonplaceholder.typicode.com/users
 * @param {String} psw used for passport-local compatibility. Always '123'. Do not participate in authentication
 * @param {Function} done serialisation/deserialisation callback
 */
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
/**
 * Logout handler
 *
 * @param {Object} req
 * @param {Object} res
 */
function logout(req, res){
  req.logout();
  res.redirect('/login');
}

/**
 * For general case server will respond with index.html and user id in 'userId' cookie
 * Cookie will be used in browser to construct xhr call to /api/users endpoints
 *
 * @param {Object} req
 * @param {Object} res
 */
function handleAppRequest(req, res) {
  res.cookie('userId', req.session.passport.user.id);
  res.sendFile(path.join(__dirname, 'index.html'));
}

/**
 * To improve  api security proxy api was implemented only for /api/users* routes
 * if userId in route params does not match userId in passport session, 404 message will be sent
 *
 * @param {Object} req
 * @param {Object} res
 */
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
