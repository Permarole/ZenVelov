import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./style.scss";

export default function Home() {
  const { setShowLogin, setShowSignup } = useAuth();

  return (
    <div className="home">
      <p className="homeText">
        Bienvenue sur ZenVelov, l'application qui vous permettra de supprimer le
        motif "j'ai pas trouvé de Velo'v" de votre liste de justificatifs de
        retards au travail Judel&CO.
      </p>
      <div className="log">
        <button
          className="loginBtn btn-primary"
          onClick={() => setShowLogin(true)}
        >
          Se connecter
        </button>
        <button
          className="signupBtn btn-secondary"
          onClick={() => setShowSignup(true)}
        >
          Creer un compte
        </button>
      </div>
    </div>
  );
}
