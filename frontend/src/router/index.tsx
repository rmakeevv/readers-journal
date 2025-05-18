import Books from './admin/Books';

import { createBrowserRouter } from 'react-router-dom';
import Auth from './Auth';
import AuthProvider from './AuthProvider';
import Book from './admin/Book';
import { routesEnum } from '../constants/routes';
import Register from './register';
import RegisterSuccess from './register/success';
import ParentRoute from './parent';
import StudentRoute from './student';

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
                        element: <StudentRoute />,
                    },
                    {
                        path: 'parent/',
                        element: <ParentRoute />,
                    },
                ],
            },
            {
                path: 'books/:id',
                element: <Book />,
            },
            {
                path: 'auth',
                element: <Auth />,
            },
            {
                path: 'register',
                element: <Register />,
            },
            {
                path: 'register/success',
                element: <RegisterSuccess />,
            },
        ],
    },
]);

export default Router;
