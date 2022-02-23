import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import Login from "../Login";
import "./style.scss";

export default function Signup() {
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const passwordConfirmRef = React.useRef();
  const { signup, setShowSignup, login } = useAuth();
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Les mots de passe ne correspondent pas");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      setShowSignup(false);
      await login(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      setError("Création de compte échouée");
    }

    setLoading(false);
  }

  return (
    <div className="signup">
      <h2>Sign Up</h2>
      {error && <div className="alert">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div id="email" className="inputContainer">
          <label>Email</label>
          <input type="email" ref={emailRef} required />
        </div>
        <div id="password" className="inputContainer">
          <label>Password</label>
          <input type="password" ref={passwordRef} required />
        </div>
        <div id="password-confirm" className="inputContainer">
          <label>Password Confirmation</label>
          <input type="password" ref={passwordConfirmRef} required />
        </div>
        <button disabled={loading} type="submit" className="btn-primary">
          Sign Up
        </button>
      </form>
      <button className="return btn-secondary" onClick={() => setShowSignup(false)}>
        Retour
      </button>
    </div>
  );
}
