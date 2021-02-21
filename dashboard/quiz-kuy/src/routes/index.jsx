import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import LoadingFetchData from 'pages/loading/loading-fetch-data';
import { useGlobalState } from 'contexts/global';

const NotFound = lazy(() => import('pages/errors/not-found'));
const Dashboard = lazy(() => import('templates/dashboard'));
const Login = lazy(() => import('pages/login'));

export const routes = [
  {
    path: '/',
    component: Login,
    exact: true,
  },
  {
    path: '/login',
    component: Login,
    exact: true,
  },
  {
    path: '/dashboard',
    component: Dashboard,
  },
];

export default function Routes() {
  const state = useGlobalState();

  return (
    <>
      <Switch>
        {routes.map((route, key) => (
          <Route
            key={key}
            exact={route.exact}
            path={route.path}
            component={route.component}
          />
        ))}
        <Route component={NotFound} />
      </Switch>

      <LoadingFetchData isLoading={state.loading} />
    </>
  );
}
