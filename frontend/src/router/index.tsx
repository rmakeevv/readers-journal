import Root from './Root';

import { createBrowserRouter } from 'react-router-dom';
import Auth from './Auth';
import AuthProvider from './AuthProvider';
import BookRoute from './Book';

const Router = createBrowserRouter([
    {
        path: '/',
        element: <AuthProvider />,
        children: [
            {
                index: true,
                element: <Root />,
            },
            {
                path: 'books/:id',
                element: <BookRoute />,
            },
            {
                path: 'auth',
                element: <Auth />,
            },
        ],
    },
]);

export default Router;
