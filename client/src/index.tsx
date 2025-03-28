import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './app/store';
import './index.css';
import { Paths } from './paths';
import { Login } from './pages/login';
import { Registration } from './pages/registration';
import { ConfigProvider, theme } from 'antd';
import { Auth } from './features/auth/auth';

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <h1>Employees</h1>,
  },
  {
    path: Paths.login,
    element: <Login />,
  },
  {
    path: Paths.registration,
    element: <Registration />,
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
          {/* //TODO:doesn't work properly. Should be fixed */}
        <Auth>
          <RouterProvider router={router} />
        </Auth>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
);
