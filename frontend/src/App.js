import React, { useEffect, useState } from 'react';
import { PublicClientApplication } from '@azure/msal-browser';

function App() {
  const [reservations, setReservations] = useState([]);
  const msalConfig = {
    auth: {
      clientId: process.env.REACT_APP_AZURE_CLIENT_ID,
      authority: `https://login.microsoftonline.com/${process.env.REACT_APP_AZURE_TENANT_ID}`,

      redirectUri: window.location.origin,
    },
  };
  const msalInstance = new PublicClientApplication(msalConfig);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/mews/petit_dejeuner');
        const data = await response.json();
        setReservations(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Réservations</h1>
      <pre>{JSON.stringify(reservations, null, 2)}</pre>
    </div>
  );
}

export default App;
