import React from "react";
import Logout from "../Logout/Logout";
import { useAuth } from "../../contexts/AuthContext";
import {
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import "./style.scss";

export default function Profil() {
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const passwordConfirmRef = React.useRef();
  const previousPasswordRef = React.useRef();
  const { setShowProfil, currentUser, getCredential } = useAuth();
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const credential = await getCredential(previousPasswordRef.current.value);

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Les mots de passe ne correspondent pas");
    }

    try {
      setError("");
      setLoading(true);

      await reauthenticateWithCredential(currentUser, credential);

      if (emailRef != currentUser.email && emailRef != null) {
        await updateEmail(currentUser, emailRef.current.value);
      }

      if (passwordRef.current.value.length !== 0) {
        await updatePassword(currentUser, passwordRef.current.value);
      }
      setSuccess("Profil mis à jour");
      passwordRef.current.value = "";
    } catch {
      setError("Modification de compte échouée");
    }

    setLoading(false);
  }

  return (
    <div>
      <div className="nav">
        <button
          className="returnProfil btn"
          onClick={() => setShowProfil(false)}
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
        <Logout />
      </div>
      <h3>Profil</h3>
      {error && <div className="errorAlert alert">{error}</div>}
      {success && <div className="successAlert alert">{success}</div>}
      <img
        className={loading ? "" : "hidden"}
        src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"
        alt=""
      />
      <form onSubmit={handleSubmit} className={loading ? "hidden" : ""}>
        <div id="email" className="inputContainer">
          <label>Email</label>
          <input
            type="email"
            ref={emailRef}
            defaultValue={currentUser.email}
            required
          />
        </div>
        <div id="password" className="inputContainer">
          <label>Nouveau Mot de passe</label>
          <input
            type="password"
            ref={passwordRef}
            placeholder="Laisser vide pour ne pas changer"
          />
        </div>
        <div id="password-confirm" className="inputContainer">
          <label>Confirmation Mot de passe</label>
          <input
            type="password"
            ref={passwordConfirmRef}
            placeholder="Laisser vide pour ne pas changer"
          />
        </div>
        <div id="current-password" className="inputContainer">
          <label>Mot de passe actuel</label>
          <input type="password" ref={previousPasswordRef} required />
        </div>
        <button disabled={loading} type="submit" className="btn-primary">
          Modifier
        </button>
      </form>
    </div>
  );
}
