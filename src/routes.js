import { Switch, Route } from 'react-router-dom';

import { AboutPage, RootPage, BillsPage, InvoicesPage } from './pages';
import { LayoutWrapper } from './containers';

export const routeByPageKey = {
  billsPage: {
    path: '/bills',
    component: BillsPage,
  },
  invoicesPage: {
    path: '/invoices',
    component: InvoicesPage,
  },
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
