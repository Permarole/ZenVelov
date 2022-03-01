import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./style.scss";
import { useDispatch } from "react-redux";
import { navigateTo } from "../../features/router/routerSlice";

export default function Logout() {
  const dispatch = useDispatch()
  const { logout } = useAuth();

  function handleLogout() {
    try {
      logout();
      dispatch(navigateTo("home"));
    } catch {}
  }

  return (
    <button
      className="logoutButton btn-secondary"
      onClick={() => handleLogout()}
    >
      Déconnexion
    </button>
  );
}
