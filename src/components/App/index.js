import React from "react";
import "./style.scss";
import zafClient from "../../zafClient";
import Footer from "../Footer";
import Login from "../Login";
import Map from "../Map";

const App = () => {
  const [requester, setRequester] = React.useState(null);
  const [isLoggedIn, setLog] = React.useState(false);

  React.useEffect(async () => {
    zafClient.invoke("resize", { height: "600px" });

    const data = await zafClient.get("ticket.requester");
    const requester = data["ticket.requester"];
    setRequester(requester);
  }, []);

  React.useEffect(() => {
    if (document.getElementById("map")) {
      let map = L.map("map").setView(
        [45.779178486192116, 4.859900561376401],
        13
      );
      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
          accessToken:
            "pk.eyJ1Ijoiam9uYXRoYW5rZXlydXMiLCJhIjoiY2t6cjRiaTJkMDlsbjJubW9iYXd5dGF6NyJ9.GVp-MojliqtRhe-0t-pLEQ",
        }
      ).addTo(map);
    }
  }, [isLoggedIn]);

  return (
    <div className="App">
      {isLoggedIn ? <Map /> : <Login isLoggedIn={isLoggedIn} setLog={setLog} />}
    </div>
  );
};

export default App;
