import { BrowserRouter } from "react-router-dom";
import { Routes } from "./Routes";
import { AuthProvider } from "./context/AuthContext";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  );
};
