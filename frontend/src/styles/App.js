import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import Home from './pages/Home';
import Reservations from './pages/Reservations';
import Forecasts from './pages/Forecasts';
import ITDashboard from './pages/ITDashboard';

const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_AZURE_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_AZURE_TENANT_ID}`,
    redirectUri: window.location.origin,
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/forecasts" element={<Forecasts />} />
          <Route path="/it-dashboard" element={<ITDashboard />} />
        </Routes>
      </Router>
    </MsalProvider>
  );
}

export default App;
