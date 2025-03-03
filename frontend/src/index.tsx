import React from 'react';
import ReactDOM from 'react-dom/client';
import 'index.css';
import Router from 'router';
import { RouterProvider } from 'react-router-dom';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <RouterProvider router={Router} />
    </React.StrictMode>
);
