import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getReservations = (mealType) => {
  return api.get(`/reservations/${mealType}`);
};

export const getForecasts = () => {
  return api.get("/forecasts");
};

export const getProducts = () => {
  return api.get("/products");
};

export const updateProductFilters = (filters) => {
  return api.post("/products/filters", filters);
};

