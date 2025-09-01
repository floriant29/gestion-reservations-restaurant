import React from "react";
import { useMsal } from "@azure/msal-react";
import { Button } from "@mui/material";

const AuthButton = () => {
  const { instance, accounts } = useMsal();

  const handleLogin = () => {
    instance.loginPopup().catch((e) => console.error(e));
  };

  const handleLogout = () => {
    instance.logoutPopup();
  };

  return (
    <div>
      {accounts.length > 0 ? (
        <Button color="inherit" onClick={handleLogout}>
          Déconnexion
        </Button>
      ) : (
        <Button color="inherit" onClick={handleLogin}>
          Connexion
        </Button>
      )}
    </div>
  );
};

export default AuthButton;

