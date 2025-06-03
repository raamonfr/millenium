import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isLogged = localStorage.getItem("logado") === "true";
  return isLogged ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
