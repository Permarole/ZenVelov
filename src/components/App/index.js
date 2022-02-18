import React from "react";
import "./style.scss";
import zafClient from "../../zafClient";
import Login from "../Login";
import Map from "../Map";
import { getStationInformation} from "../../function/fetchVelov"

const App = () => {
  const [requester, setRequester] = React.useState(null);
  const [isLoggedIn, setLog] = React.useState(false);
  const RADIUS = 1500;
  const KEYRUS_COOR = [45.77872391853525, 4.859720853364637];

  React.useEffect(async () => {
    zafClient.invoke("resize", { height: "800px" });

    const data = await zafClient.get("ticket.requester");
    const requester = data["ticket.requester"];
    setRequester(requester);
  }, []);

  React.useEffect(() => {
    // Check if the map container exist
    if (document.getElementById("map")) {
      // GENERATE map using keyrus coordinates
      let map = L.map("map").setView(
        KEYRUS_COOR,
        13
      );
      // Add Mapbox's Streets tile layer
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

      // Create Keyrus mark with its pop up
      let KeyrusMarker = L.marker(KEYRUS_COOR).addTo(map);
      KeyrusMarker.bindPopup("<b>Keyrus");

      // Create range circle using the range defined in the radius const
      var circle = L.circle(KEYRUS_COOR, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.1,
        radius: RADIUS
    }).addTo(map);
    // Generate marker for every statiion inside the circle perimeter
    getStationInformation(map);
    }
  }, [isLoggedIn]);

  return (
    <div className="App">
      {isLoggedIn ? <Map /> : <Login isLoggedIn={isLoggedIn} setLog={setLog} />}
    </div>
  );
};

export default App;
