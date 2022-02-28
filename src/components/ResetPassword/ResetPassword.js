import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useDispatch } from "react-redux";
import { navigateTo } from "../../features/router/routerSlice";

export default function ResetPassword() {
  const emailRef = React.useRef();
  const { resetPassword } = useAuth();

  const dispatch = useDispatch();
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setSuccess("");
      // Prevent user from sending the form again
      await resetPassword(emailRef.current.value);
      setSuccess("Verifier vos email pour reinitialiser votre mot de passe");
    } catch {
      setError("Reinitialisation du mot de passe echouée");
    }
  }

  return (
    <div className="resetContainer">
      <button
        className="return"
        onClick={() => {
          dispatch(navigateTo('login'));
        }}
      >
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
      <h2 className="resetTitle">Reinitialisation Mot de Passe</h2>
      {error && <div className="errorAlert">{error}</div>}
      {success && <div className="sucessAlert">{success}</div>}
      <form className="resetForm" onSubmit={handleSubmit}>
        <div className="inputContainer">
          <label htmlFor="eamil">Email :</label>
          <input type="text" name="email" ref={emailRef} id="email" />
        </div>
        <button className="btn-primary submit" type="submit">
          Submit
        </button>
      </form>
      <a
        href=""
        onClick={() => {
          dispatch(navigateTo('login'));
        }}
      >
        Se connecter
      </a>
    </div>
  );
}
