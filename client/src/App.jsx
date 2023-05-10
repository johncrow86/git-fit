// Imports
import React from 'react';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Root from './routes/Root';
import HomePage from './routes/HomePage';
import JournalEntryPage from './routes/JournalEntryPage';
import { JournalContextProvider } from './context/JournalContext';

// Create router for RouteProvider
const router = createBrowserRouter( createRoutesFromElements( 
    <Route path='/' element={ <Root /> }>
        <Route index element={ <HomePage /> } />
        <Route path='journal/:id' element={ <JournalEntryPage /> } />
    </Route>
));

// Main App
function App() {
    return (
        <JournalContextProvider>
            <div className="container">
                <RouterProvider router={router} />
            </div>
        </JournalContextProvider>
    );
}

export default App;
