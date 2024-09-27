import LoginComponent from "./components/LoginComponent.jsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardComponent from "./components/DashboardComponent.jsx";
import NewUserComponent from "./components/NewUserComponent.jsx";
import EditUserComponent from "./components/EditUserComponent.jsx";
import { Box } from "@mui/joy";

function App() {
  return (
    <Box 
    sx={{
      display: 'flex',
      justifyContent: 'center',
    }}>
      <Router>
        <Routes>
          <Route path="" element={<LoginComponent />} />
          <Route path="/dashboard" element={<DashboardComponent />} />
          <Route path="/newuser" element={<NewUserComponent />} />
          <Route path="/edituser" element={<EditUserComponent />} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
