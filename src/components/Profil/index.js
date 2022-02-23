import React from "react";
import Logout from "../Logout/Logout";
import { useAuth } from "../../contexts/AuthContext";

export default function Profil() {
    const {setShowProfil } = useAuth();

  return (
    <div>
      <div className="nav">
        <button className="return btn-primary" onClick={() => setShowProfil(false)}>Retour</button>
        <Logout />
      </div>
    </div>
  );
}
