import { ThemeProvider } from "@mui/material";
import { purple } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage";
import HomePage from "./Pages/HomePage";
import MainDashBoard from "./Pages/LoggedInPage";
import LoginPage from "./Pages/Login";
import Profile from "./Pages/Profile";
import ProjectDashBoard from "./Pages/Project";
import ProjectListing from "./Pages/projectListing";
import Settings from "./Pages/settings";
import SignupPage from "./Pages/SignUp";
import TeamDashboard from "./Pages/teamDashboard";
import TeamSearch from "./Pages/teamSearch";
import { UserProvider } from "./utils/Contexte/UserContext/Usercontexteprovider";
import ProtectedRoute from "./utils/protected/AuthEle";
import GuestRoute from "./utils/protected/GuestEle";

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
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<GuestRoute />}>
              <Route path="" element={<HomePage />} />
            </Route>

            <Route path="/login" element={<GuestRoute />}>
              <Route path="" element={<LoginPage />} />
            </Route>
            <Route path="/signup" element={<GuestRoute />}>
              <Route path="" element={<SignupPage />} />
            </Route>

            <Route path="/profile/" element={<ProtectedRoute />}>
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
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
