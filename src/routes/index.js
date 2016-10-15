import  React from 'react';
import App from '../containers/App';
import { NotFoundView, Counter, FooView, BarView } from '../components';
import User from '../pages/User';
import Posts from '../components/Posts';
import AccountData from '../components/AccountData';
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
          }
        ]
      },
    ]
  }
];

export const MatchWithSubRoutes = (route) => (
  <Match {...route} render={(props) => (
    // pass the sub-routes down to keep nesting
    <route.component {...props} routes={route.routes}/>
  )}/>
);


export default () => {
  return (
    <Router>
      <div>
        {routes.map((route, i) => (
          <MatchWithSubRoutes key={i} {...route}/>
        ))}
      </div>
    </Router>

  );
};
