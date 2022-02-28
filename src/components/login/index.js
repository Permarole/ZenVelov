import React from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../../contexts/AuthContext";
import { navigateTo } from "../../features/router/routerSlice";
import "./style.scss";

export default function Login() {
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const { login } = useAuth();
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      // Prevent user from sending the form again
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      dispatch(navigateTo('map'))
    } catch {
      setError("Combinaison identifiant/mot de passe incorrecte");
    }

    setLoading(false);
  }

  return (
    <div className="loginContainer">
      <button className="return" onClick={() => dispatch(navigateTo('home'))}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 11L9 2V7C20.953 7 22.332 16.678 22 22C21.498 19.315 21.265 15 9 15V20L2 11Z"
            stroke="#ea2b2b"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <h3 className="loginTitle">Connexion</h3>
      {error && <div className="errorAlert alert">{error}</div>}
      <form className="loginForm" onSubmit={handleSubmit}>
        <div className="inputContainer">
          <label htmlFor="eamil">Email :</label>
          <input type="text" name="login" ref={emailRef} id="login" />
        </div>
        <div className="inputContainer">
          <label htmlFor="password">MDP :</label>
          <input
            type="password"
            ref={passwordRef}
            name="password"
            id="password"
          />
        </div>
        <button className="btn-primary submit" type="submit">
          Submit
        </button>
      </form>
      <a href="" onClick={() => dispatch(navigateTo('resetPassword'))}>
        Mot de passe oublié ?
      </a>
    </div>
  );
}
