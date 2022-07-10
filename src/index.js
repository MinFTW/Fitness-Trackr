import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './components';
import UserProvider from './components/UserProvider';
import ActivitiesProvider from './components/ActivitiesProvider';
import RoutinesProvider from './components/RoutinesProvider';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Router>
    <RoutinesProvider>
      <ActivitiesProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </ActivitiesProvider>
    </RoutinesProvider>
  </Router>
);
