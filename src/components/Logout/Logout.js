import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./style.scss";

export default function Logout() {
  const { logout } = useAuth();

  return (
    <button className="logoutButton btn-secondary" onClick={logout}>
      <div>Déconnexion</div>
    </button>
  );
}
