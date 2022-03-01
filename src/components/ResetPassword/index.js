import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useDispatch } from "react-redux";
import { navigateTo } from "../../features/router/routerSlice";
import "./style.scss";

export default function ResetPassword() {
  const emailRef = React.useRef();
  const { resetPassword } = useAuth();

  const dispatch = useDispatch();
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setSuccess("");
      // Prevent user from sending the form again
      await resetPassword(emailRef.current.value);
      setSuccess(
        "Si cette adresse est associée à un compte, un email contenant la procédure de reinitialisation vous a été envoyé"
      );
    } catch (error) {
      setError("Reinitialisation du mot de passe echouée");
    }
  }

  return (
    <div className="resetContainer">
      <button className="return" onClick={() => dispatch(navigateTo("home"))}>
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
      <h3 className="resetTitle">Reinitialisation Mot de Passe</h3>
      {error && <div className="errorAlert alert">{error}</div>}
      {success && <div className="successAlert">{success}</div>}
      <form className="resetForm" onSubmit={handleSubmit}>
        <div className="inputContainer">
          <label htmlFor="eamil">Email :</label>
          <input type="text" name="email" ref={emailRef} id="email" />
        </div>
        <button className="btn-primary submit" type="submit">
          Submit
        </button>
      </form>
      <button
        className="anchor"
        onClick={() => {
          dispatch(navigateTo("login"));
        }}
      >
        Se connecter
      </button>
    </div>
  );
}
