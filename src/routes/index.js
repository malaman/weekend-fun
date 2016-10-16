import React from 'react';
import App from '../containers/App';
import User from '../pages/User';
import Posts from '../pages/User/Posts';
import AccountData from '../pages/User/AccountData';
import NewPost from '../pages/User/NewPost';

import Router from 'react-router/BrowserRouter';
import Match from 'react-router/Match';

const routes = [
  { pattern: '/',
    component: App,
    routes: [
      { pattern: '/user',
        component: User,
        routes: [
          { pattern: '/user',
            component: Posts,
            exactly: true
          },
          { pattern: '/user/info',
            component: AccountData,
          },
          { pattern: '/user/newPost',
            component: NewPost,
          }
        ]
      },
    ]
  }
];

export const MatchWithSubRoutes = (route) => (
  <Match {...route} render={(props) => (<route.component {...props} routes={route.routes} />)} />
);

export default () => {
  return (
    <Router>
      <div>
        {routes.map((route, i) => <MatchWithSubRoutes key={i} {...route} />)}
      </div>
    </Router>
  );
};
