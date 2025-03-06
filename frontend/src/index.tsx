import React from 'react';
import ReactDOM from 'react-dom/client';
import 'index.css';
import Router from 'router';
import { RouterProvider } from 'react-router-dom';
import { store } from './store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={Router} />
        </Provider>
    </React.StrictMode>
);
