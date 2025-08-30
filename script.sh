# --- Backend ---
mkdir -p backend/routes backend/models
cat > backend/package.json << 'EOL'
{
  "name": "backend",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "axios": "^1.6.2",
    "pg": "^8.11.3",
    "passport": "^0.6.0",
    "passport-azure-ad": "^4.3.3",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5"
  }
}
EOL

cat > backend/app.js << 'EOL'
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Route pour récupérer les données Mews
app.get('/api/mews/:typeRepas', async (req, res) => {
  try {
    const { typeRepas } = req.params;
    const response = await axios.get(`https://api.mews.com/api/connector/v1/orderItems/getAll`, {
      headers: { 'Authorization': `Bearer ${process.env.MEWS_API_KEY}` },
      params: { type: typeRepas }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Backend démarré sur le port ${port}`);
});
EOL

cat > backend/Dockerfile << 'EOL'
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]
EOL

cat > backend/.env << 'EOL'
MEWS_API_KEY=ta_cle_api_mews
DB_HOST=postgres
DB_USER=utilisateur
DB_PASSWORD=motdepasse
DB_NAME=gestion_reservations
AZURE_AD_CLIENT_ID=ton_client_id_azure
AZURE_AD_TENANT_ID=ton_tenant_id_azure
AZURE_AD_CLIENT_SECRET=ton_client_secret_azure
EOL

# --- Frontend ---
npx create-react-app frontend --template typescript
cd frontend || exit
npm install @azure/msal-browser @azure/msal-react axios
cd ..

cat > frontend/src/App.js << 'EOL'
import React, { useEffect, useState } from 'react';
import { PublicClientApplication } from '@azure/msal-browser';

function App() {
  const [reservations, setReservations] = useState([]);
  const msalConfig = {
    auth: {
      clientId: process.env.REACT_APP_AZURE_CLIENT_ID,
      authority: \`https://login.microsoftonline.com/\${process.env.REACT_APP_AZURE_TENANT_ID}\`,
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
EOL

cat > frontend/Dockerfile << 'EOL'
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 80
CMD ["serve", "-s", "build"]
EOL

cat > frontend/.env << 'EOL'
REACT_APP_AZURE_CLIENT_ID=ton_client_id_azure
REACT_APP_AZURE_TENANT_ID=ton_tenant_id_azure
EOL

# --- Docker Compose ---
cat > docker-compose.yml << 'EOL'
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      - MEWS_API_KEY=${MEWS_API_KEY}
      - DB_HOST=postgres
      - DB_USER=utilisateur
      - DB_PASSWORD=motdepasse
      - DB_NAME=gestion_reservations
    depends_on:
      - postgres
  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
  postgres:
    image: postgres:13
    environment:
      POSTGRES_USER: utilisateur
      POSTGRES_PASSWORD: motdepasse
      POSTGRES_DB: gestion_reservations
    volumes:
      - postgres_data:/var/lib/postgresql/data
volumes:
  postgres_data:
EOL

# --- README ---
cat > README.md << 'EOL'
# Gestion des Réservations Restaurant

## Structure
- `backend/` : API Node.js (Express)
- `frontend/` : Application React
- `docker-compose.yml` : Configuration Docker

## Installation
1. Copier `.env.example` en `.env` et configurer les variables.
2. Lancer avec : `docker-compose up --build`
EOL

# --- Initialisation Git ---
git init
git add .
git commit -m "Initialisation du projet"

echo "Projet '$PROJECT_NAME' généré avec succès !"
echo "Pour démarrer :"
echo "1. cd $PROJECT_NAME"
echo "2. docker-compose up --build"
