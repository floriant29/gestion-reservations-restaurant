import React from "react";
import { useMsal } from "@azure/msal-react";
import AuthButton from "./AuthButton";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { accounts } = useMsal();
  const isIT = accounts[0]?.idTokenClaims?.roles?.includes("IT");

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Accueil
        </Button>
        <Button color="inherit" component={Link} to="/reservations">
          Réservations
        </Button>
        <Button color="inherit" component={Link} to="/forecasts">
          Prévisionnels
        </Button>
        {isIT && (
          <Button color="inherit" component={Link} to="/it-dashboard">
            Back-office IT
          </Button>
        )}
        <Box sx={{ flexGrow: 1 }} />
        <AuthButton />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
