// Imports
import React from 'react';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
// Routes
import Root from './routes/Root';
import HomePage from './routes/HomePage';
import LoginPage from './routes/LoginPage';
import JournalEntryPage from './routes/JournalEntryPage';
// Context
import { JournalContextProvider } from './context/JournalContext';
import { UserContextProvider } from './context/UserContext';

// Create router for RouteProvider
const router = createBrowserRouter( createRoutesFromElements( 
    <Route path='/' element={ <Root /> }>
        <Route index element={ <HomePage /> } />
        <Route path='login' element={ <LoginPage /> } />
        <Route path='journal/:id' element={ <JournalEntryPage /> } />
    </Route>
));

// Main App
function App() {
    return (
        <UserContextProvider>
        <JournalContextProvider>
            <div className="container">
                <RouterProvider router={router} />
            </div>
        </JournalContextProvider>
        </UserContextProvider>
    );
}

export default App;
