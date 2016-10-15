import  React from 'react';
import App from '../containers/App';
import { NotFoundView, Counter, FooView, BarView } from '../components';
import User from '../pages/User';

import Router from 'react-router/BrowserRouter';
import Match from 'react-router/Match';


const routes = [
  { pattern: '/',
    component: App,
    routes: [
      { pattern: '/',
        component: Counter,
        exactly: true
      },
      { pattern: '/users/:id',
        component: User,
        exactly: true
      },
      { pattern: '/foo',
        component: FooView
      },
      { pattern: '/bar',
        component: BarView
      }
    ]
  }
]

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
