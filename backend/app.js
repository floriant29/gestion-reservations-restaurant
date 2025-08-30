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
