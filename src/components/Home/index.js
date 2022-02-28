import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { navigateTo } from "../../features/router/routerSlice";

export default function Home() {
  const { setShowLogin, setShowSignup } = useAuth();
  const route = useSelector(state => state.router.value);
  const dispatch = useDispatch();
  

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
          onClick={() =>  dispatch(navigateTo('login'))}
        >
          Se connecter
        </button>
        <button
          className="signupBtn btn-secondary"
          onClick={() => dispatch(navigateTo('signup'))}
        >
          Creer un compte
        </button>
      </div>
    </div>
  );
}
