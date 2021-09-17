import { Switch, Route } from 'react-router-dom';

import { App } from './pages';

const routes = [
  {
    path: '/',
    component: App
  },
]

const routesChildren = (
  <Switch>
    {routes.map((route) => (
      <Route key={`routePath${route.path}`} {...route} />
    ))}
  </Switch>
);

export default routesChildren;
