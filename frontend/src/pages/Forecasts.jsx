import React, { useState, useEffect } from "react";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { getForecasts } from "../services/api";

const Forecasts = () => {
  const [forecasts, setForecasts] = useState([]);

  useEffect(() => {
    const fetchForecasts = async () => {
      try {
        const response = await getForecasts();
        setForecasts(response.data);
      } catch (error) {
        console.error("Erreur:", error);
      }
    };
    fetchForecasts();
  }, []);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Prévisionnels
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type de repas</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Nombre total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {forecasts.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.meal_type}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Forecasts;
