import React from 'react';
import { useMsal } from '@azure/msal-react';

const Home = () => {
  const { instance } = useMsal();
  return (
    <div>
      <h1>Gestion des Réservations</h1>
      <button onClick={() => instance.loginPopup()}>Se connecter</button>
    </div>
  );
};

export default Home;
