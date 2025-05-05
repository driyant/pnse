import Home from '@/pages/Home';
import Result from '@/pages/Result';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/search',
    element: <Result />,
  },
]);
