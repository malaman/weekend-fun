## How to install

- clone repository `git clone https://github.com/malaman/weekend-fun.git`
- Go to the project directory `cd weekend-fun`
- execute `npm install` in project directory
- execute `npm run dev` in project directory to start dev environment
- open `http://localhost:3000` in browser
- it is possible to login with any username from http://jsonplaceholder.typicode.com/users endpoint
(i.e. 'Bret', 'Antonette', 'Moriah.Stanton')
- run `npm run test` to run tests
- run `npm run lint` to run lint checking
- run `npm run build && npm run start` to start environment


## Tech stack
- react/redux/redux-router-v4 are used as core frameworks
- webpack is used as packager and bundling system
- jest is used for testing
- passport/passport-local is used for the user authentication.
User sessions are stored in memory and user should reauthenticate again after server restart
- To increase app security app will perform api request to `http://localhost:3000/api`.
Node app will handle the request and (if userId in route params matches user.id in session.passport) forward request to http://jsonplaceholder.typicode.com/
