import { Switch, Route } from 'react-router-dom';

import { AboutPage, RootPage } from './pages';
import { LayoutWrapper } from './containers';

export const routeByPageKey = {
  aboutPage: {
    path: '/about',
    component: AboutPage,
  },
};

const routes = (
  <Switch>
    <LayoutWrapper>
      {Object.keys(routeByPageKey).map((routePageKey) => (
        <Route
          key={`routePageKey${routePageKey}`}
          path={routeByPageKey[routePageKey].path}
          component={routeByPageKey[routePageKey].component}
        />
      ))}
      <Route exact path="/" component={RootPage} />
    </LayoutWrapper>
  </Switch>
);

export default routes;
