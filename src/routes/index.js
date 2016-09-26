import CoreLayout from 'layouts/CoreLayout/CoreLayout';
import Home from './Home';

export const createRoutes = (/* store */) => ({
  path: '/',
  indexRoute: Home,
  childRoutes: [
    { component: CoreLayout,
      childRoutes: [
      ],
    },
  ],
});

export default createRoutes;
