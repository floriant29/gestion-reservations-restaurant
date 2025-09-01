import React from "react";
import { useMsal } from "@azure/msal-react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Box,
  Divider,
  Chip,
  useTheme
} from "@mui/material";
import {
  Restaurant as RestaurantIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  Login as LoginIcon,
  People as PeopleIcon,
  Today as TodayIcon
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Home = () => {
  const { accounts } = useMsal();
  const theme = useTheme();
  const isAuthenticated = accounts.length > 0;
  const isIT = accounts[0]?.idTokenClaims?.roles?.includes("IT");

  // Données pour les cartes d'accès rapide
  const quickAccessItems = [
    {
      title: "Gérer les Réservations",
      description: "Ajoutez ou consultez les réservations pour les repas.",
      icon: <RestaurantIcon fontSize="large" color="primary" />,
      link: "/reservations",
      roles: ["Réception", "IT"]
    },
    {
      title: "Prévisionnels",
      description: "Visualisez les prévisionnels de repas par type et par jour.",
      icon: <AssessmentIcon fontSize="large" color="primary" />,
      link: "/forecasts",
      roles: ["Réception", "IT"]
    },
    {
      title: "Back-office IT",
      description: "Configurez les filtres API et gérez les produits Mews.",
      icon: <SettingsIcon fontSize="large" color="primary" />,
      link: "/it-dashboard",
      roles: ["IT"]
    }
  ];

  // Statistiques fictives (à remplacer par des données réelles via API)
  const stats = [
    { label: "Réservations aujourd'hui", value: "42", icon: <PeopleIcon color="action" /> },
    { label: "Petits-déjeuners prévus", value: "35", icon: <TodayIcon color="action" /> },
    { label: "Déjeuners prévus", value: "28", icon: <TodayIcon color="action" /> },
    { label: "Dîners prévus", value: "19", icon: <TodayIcon color="action" /> }
  ];

  return (
    <>
      {/* En-tête */}
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
          Gestion des Réservations
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Bienvenue sur votre tableau de bord{isAuthenticated ? `, ${accounts[0].name}` : ""}
        </Typography>
        {!isAuthenticated && (
          <Chip
            icon={<LoginIcon />}
            label="Veuillez vous connecter pour accéder à toutes les fonctionnalités"
            color="warning"
            sx={{ mt: 2 }}
          />
        )}
      </Box>

      {/* Statistiques rapides */}
      {isAuthenticated && (
        <>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
            Aujourd'hui
          </Typography>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card>
                  <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    {stat.icon}
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {stat.label}
                      </Typography>
                      <Typography variant="h5">{stat.value}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* Accès rapide */}
      <Divider sx={{ my: 3 }} />
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Accès rapide
      </Typography>
      <Grid container spacing={3}>
        {quickAccessItems.map((item, index) => {
          if (!isAuthenticated && !item.roles.includes("IT")) return null;
          if (isAuthenticated && !item.roles.includes(isIT ? "IT" : "Réception")) return null;

          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardActionArea component={Link} to={item.link}>
                  <CardContent sx={{ height: 140, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                      {item.icon}
                    </Box>
                    <Typography variant="h6" component="div" align="center" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center">
                      {item.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Guide utilisateur */}
      <Divider sx={{ my: 4 }} />
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        {isIT ? "Guide Administrateur" : "Guide Utilisateur"}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {isIT ? "Configurer les produits Mews" : "Ajouter une réservation"}
              </Typography>
              <Typography variant="body2" paragraph>
                {isIT
                  ? "Dans le back-office IT, vous pouvez associer chaque produit Mews à un type de repas (petit-déjeuner, déjeuner, dîner). Ces associations seront utilisées pour filtrer les données de l'API."
                  : "Pour ajouter une réservation manuelle, rendez-vous dans la section 'Réservations' et remplissez le formulaire avec le type de repas, la date et le nombre de personnes."}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {isIT ? "Synchronisation des données" : "Consulter les prévisionnels"}
              </Typography>
              <Typography variant="body2" paragraph>
                {isIT
                  ? "Les données sont synchronisées automatiquement avec l'API Mews toutes les heures. Vous pouvez forcer une synchronisation manuelle depuis le back-office."
                  : "Les prévisionnels sont mis à jour en temps réel et combinent les réservations manuelles avec les données de l'API Mews."}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Pied de page */}
      <Divider sx={{ my: 4 }} />
      <Box sx={{ textAlign: "center", py: 2, color: "text.secondary" }}>
        <Typography variant="body2">
          Application de gestion des réservations - Tous droits réservés {new Date().getFullYear()}
        </Typography>
      </Box>
    </>
  );
};

export default Home;
