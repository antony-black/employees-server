import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import { store } from './app/store';
import { Auth } from './features/auth/auth';
import { Paths } from './paths';
import './index.css';

const Login = React.lazy(() => import(/* webpackChunkName: "Login" */ './pages/login'));
const Registration = React.lazy(
  () => import(/* webpackChunkName: "Registration" */ './pages/registration'),
);
const Employees = React.lazy(() => import(/* webpackChunkName: "Employees" */ './pages/employees'));
const AddEmployee = React.lazy(
  () => import(/* webpackChunkName: "AddEmployee" */ './pages/add-employee'),
);
const EditEmployee = React.lazy(
  () => import(/* webpackChunkName: "EditEmployee" */ './pages/edit-employee'),
);
const Employee = React.lazy(() => import(/* webpackChunkName: "Employee" */ './pages/employee'));
const Status = React.lazy(() => import(/* webpackChunkName: "Status" */ './pages/status'));

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <Employees />,
  },
  {
    path: Paths.login,
    element: <Login />,
  },
  {
    path: Paths.registration,
    element: <Registration />,
  },
  {
    path: Paths.employeesAdd,
    element: <AddEmployee />,
  },
  {
    path: `${Paths.status}/:status`,
    element: <Status />,
  },
  {
    path: `${Paths.employees}/:id`,
    element: <Employee />,
  },
  {
    path: `${Paths.employeesEdit}/:id`,
    element: <EditEmployee />,
  },
]);

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}>
        <Auth>
          <Suspense fallback={<div>Loading...</div>}>
            <RouterProvider router={router} />
          </Suspense>
        </Auth>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
);
