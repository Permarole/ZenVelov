import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import Login from "../Login";
import "./style.scss";
import { navigateTo } from "../../features/router/routerSlice";
import { useDispatch } from "react-redux";

export default function Signup() {
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const passwordConfirmRef = React.useRef();
  const { signup, setShowSignup, login } = useAuth();
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Les mots de passe ne correspondent pas");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      dispatch(navigateTo('map'))
      await login(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      setError("Création de compte échouée");
    }

    setLoading(false);
  }

  return (
    <div className="signup">
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
      <h3>Sign Up</h3>
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
        <button disabled={loading} type="submit" className="btn-primary submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}
