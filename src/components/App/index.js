import React from "react";
import "./style.scss";
import zafClient from "../../zafClient";
import Login from "../Login";
import Map from "../Map";
import Signup from "../Signup/Signup";
import Profil from "../Profil";
import Home from "../Home";
import { useAuth } from "../../contexts/AuthContext";
import ResetPassword from "../ResetPassword/ResetPassword";
import { useSelector } from "react-redux";

export default function App() {
  const [requester, setRequester] = React.useState(null);
  const route = useSelector((state) => state.router.value);

  React.useEffect(async () => {
    zafClient.invoke("resize", { height: "600px" });

    const data = await zafClient.get("ticket.requester");
    const requester = data["ticket.requester"];
    setRequester(requester);
  }, []);

  return (
    <div className="App">
      <h2>ZenVelov</h2>
      {route == 'home' ? <Home /> : ""}
      {route == "login" ? <Login /> : ""}
      {route == "signup" ? <Signup /> : ""}
      {route == "resetPassword" ? <ResetPassword /> : ""}
      {route == "map" ? <Map /> : ""}
      {route == "profil" ? <Profil /> : ""}
    </div>
  );
}
