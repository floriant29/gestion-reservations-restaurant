import React, { useState, useEffect } from "react";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { getProducts, updateProductFilters } from "../services/api";

const ITDashboard = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("Erreur:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleUpdateFilters = async () => {
    try {
      await updateProductFilters(filters);
      alert("Filtres mis à jour avec succès !");
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const handleFilterChange = (productId, mealType) => {
    setFilters({ ...filters, [productId]: mealType });
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Back-office IT
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Produit</TableCell>
              <TableCell>Type de repas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.nom}</TableCell>
                <TableCell>
                  <select
                    value={filters[product.id] || ""}
                    onChange={(e) => handleFilterChange(product.id, e.target.value)}
                  >
                    <option value="">-- Sélectionner --</option>
                    <option value="petit_dejeuner">Petit-déjeuner</option>
                    <option value="dejeuner">Déjeuner</option>
                    <option value="diner">Dîner</option>
                  </select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" onClick={handleUpdateFilters} sx={{ mt: 2 }}>
        Mettre à jour les filtres
      </Button>
    </>
  );
};

export default ITDashboard;
