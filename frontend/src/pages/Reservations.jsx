import React, { useState, useEffect } from "react";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from "@mui/material";
import { getReservations } from "../services/api";
import { useMsal } from "@azure/msal-react";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [mealType, setMealType] = useState("petit_dejeuner");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [count, setCount] = useState(0);
  const { instance } = useMsal();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await getReservations(mealType);
        setReservations(response.data);
      } catch (error) {
        console.error("Erreur:", error);
      }
    };
    fetchReservations();
  }, [mealType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logique pour soumettre une nouvelle réservation
    console.log({ mealType, date, count });
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Gestion des Réservations
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Type de repas"
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
          select
          SelectProps={{ native: true }}
          fullWidth
          margin="normal"
        >
          <option value="petit_dejeuner">Petit-déjeuner</option>
          <option value="dejeuner">Déjeuner</option>
          <option value="diner">Dîner</option>
        </TextField>
        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Nombre de personnes"
          type="number"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Ajouter
        </Button>
      </form>
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Nombre</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.meal_type}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Reservations;

