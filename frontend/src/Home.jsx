import React from "react";
import { Typography } from "@mui/material";

const Home = () => {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Bienvenue sur l'application de gestion des réservations
      </Typography>
      <Typography>
        Utilisez le menu pour naviguer entre les réservations et les prévisionnels.
      </Typography>
    </>
  );
};

export default Home;
