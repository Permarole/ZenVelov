import React from "react";
import Logout from "../Logout/Logout";
import { useAuth } from "../../contexts/AuthContext";
import "./style.scss";

export default function Profil() {
  const { setShowProfil } = useAuth();

  return (
    <div>
      <div className="nav">
        <button
          className="btn-primary"
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
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <Logout />
      </div>
    </div>
  );
}
