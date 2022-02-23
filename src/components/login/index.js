import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./style.scss";

export default function Login() {
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const { login, currentUser, setShowLogin } = useAuth();
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      // Prevent user from sending the form again
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      setShowLogin(false);
    } catch {
      setError("Combinaison identifiant/mot de passe incorrecte");
    }

    setLoading(false);
  }

  return (
    <div className="loginContainer">
      <button className="return" onClick={() => setShowLogin(false)}>
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
      <h2 className="loginTitle">Connexion</h2>
      {error && <div className="alert">{error}</div>}
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
        <button className="btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
