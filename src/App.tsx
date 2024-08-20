import { ThemeProvider } from "@mui/material";
import { purple } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage";
import HomePage from "./Pages/HomePage";
import MainDashBoard from "./Pages/LoggedInPage";
import LoginPage from "./Pages/Login";
import Profile from "./Pages/Profile";
import SignupPage from "./Pages/SignUp";
import { useUser } from "./utils/Contexte/UserContext/userContexte";
import ProtectedRoute from "./utils/protected/AuthEle";
import ProjectDashBoard from "./Pages/Project";
import TeamSearch from "./Pages/teamSearch";
import TeamDashboard from "./Pages/teamDashboard";
import ProjectListing from "./Pages/projectListing";
import Settings from "./Pages/settings";

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500], // Customize your primary color here
    },
    secondary: {
      main: purple[300], // Customize your secondary color here
    },
    background: {
      default: purple[900], // Customize your background color here
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif", // Customize your font family here
  },
});

function App() {
  const { updateUser } = useUser();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={<LoginPage Successfull={updateUser} />}
          />
          <Route
            path="/signup"
            element={<SignupPage Successfull={updateUser} />}
          />
          <Route path="/Profile/" element={<ProtectedRoute />}>
            <Route path="" element={<Profile />} />
            <Route path="settings/" element={<Settings />} />
          </Route>
          <Route path="/home/" element={<ProtectedRoute />}>
            <Route path="" element={<MainDashBoard />} />
            <Route path="projects/" element={<ProjectListing />} />
            <Route path="projects/:id" element={<ProjectDashBoard />} />
            <Route path="teams/search" element={<TeamSearch />} />
            <Route path="teams/:id" element={<TeamDashboard />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
