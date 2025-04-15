import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import CountryPage from './pages/CountryPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'country/:code',
        element: <CountryPage />,
      },
    ],
  },
]);