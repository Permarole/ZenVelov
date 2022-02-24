import React from "react";
import "./style.scss";
import zafClient from "../../zafClient";
import Login from "../Login";
import Map from "../Map";
import Signup from "../Signup/Signup";
import Profil from "../Profil";
import Home from "../Home";
import { useAuth } from "../../contexts/AuthContext";

export default function App() {
  const [requester, setRequester] = React.useState(null);
  const { currentUser, showLogin, showSignup, showProfil } = useAuth();

  React.useEffect(async () => {
    zafClient.invoke("resize", { height: "500px" });

    const data = await zafClient.get("ticket.requester");
    const requester = data["ticket.requester"];
    setRequester(requester);
  }, []);

  return (
    <div className="App">
      <h2>ZenVelov</h2>
      {!showLogin && !showSignup && currentUser == null ? <Home /> : ""}
      {showSignup ? <Signup /> : ""}
      {showLogin ? <Login /> : ""}
      {currentUser && !showProfil ? <Map /> : ""}
      {currentUser && showProfil ? <Profil /> : ""}
    </div>
  );
}
