import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/Global.css";
import { UserProvider } from "./utils/Contexte/UserContext/Usercontexteprovider.tsx";
import { StrictMode } from "react";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </StrictMode>
);
