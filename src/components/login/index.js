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
        <button className="btn-primary" type="submit">Submit</button>
      </form>
      <button className="return btn-secondary" onClick={() => setShowLogin(false)}>
        Retour
      </button>
    </div>
  );
}
