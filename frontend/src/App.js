import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./services/authConfig";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Reservations from "./pages/Reservations";
import Forecasts from "./pages/Forecasts";
import ITDashboard from "./pages/ITDashboard";

const msalInstance = new PublicClientApplication(msalConfig);

function App() {
<<<<<<< HEAD
  const [reservations, setReservations] = useState([]);
  const msalConfig = {
    auth: {
      clientId: process.env.REACT_APP_AZURE_CLIENT_ID,
      authority: `https://login.microsoftonline.com/${process.env.REACT_APP_AZURE_TENANT_ID}`,

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

=======
>>>>>>> 5326804 (front update)
  return (
    <MsalProvider instance={msalInstance}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/forecasts" element={<Forecasts />} />
            <Route path="/it-dashboard" element={<ITDashboard />} />
          </Routes>
        </Layout>
      </Router>
    </MsalProvider>
  );
}

export default App;
