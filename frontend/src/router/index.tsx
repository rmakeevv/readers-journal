import Books from './admin/Books';

import { createBrowserRouter } from 'react-router-dom';
import Auth from './Auth';
import AuthProvider from './AuthProvider';
import Book from './admin/Book';
import { routesEnum } from '../constants/routes';

const Router = createBrowserRouter([
    {
        path: routesEnum.base,
        element: <AuthProvider />,
        children: [
            {
                path: routesEnum.admin,
                children: [
                    {
                        index: true,
                        element: <Books />,
                    },
                    {
                        path: 'books/:id',
                        element: <Book />,
                    },
                ],
            },
            {
                path: routesEnum.profile,
                children: [
                    {
                        path: routesEnum.student,
                        element: <>d</>,
                    },
                    {
                        path: routesEnum.parent,
                        element: <>parent</>,
                    },
                ],
            },
            {
                path: 'auth',
                element: <Auth />,
            },
        ],
    },
]);

export default Router;
