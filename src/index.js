import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './components';
import UserProvider from './components/UserProvider';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Router>
    <UserProvider>
      <App />
    </UserProvider>
  </Router>
);
