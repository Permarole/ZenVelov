import React from "react";
import "./style.scss";
import Logout from "../Logout/Logout";
import {
  getStationInformation,
  getStationStatus,
  getRelevantStations,
} from "../../function/fetchVelov";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayerGroup,
  Circle,
} from "react-leaflet";
import { useAuth } from "../../contexts/AuthContext";

const Map = () => {
  const RADIUS = 1500;
  const KEYRUS_COOR = [45.77872391853525, 4.859720853364637];
  const [refresh, setRefresh] = React.useState(false);
  const [relevantStations, setRelevantStations] = React.useState();
  const { setShowProfil } = useAuth()
  let timer = setTimeout(() => setRefresh(!refresh), 25000);

  React.useEffect(async () => {
    console.log("refresh");
    // First we gather all the stations information to get the coordinates
    const stationsInfo = await getStationInformation();
    // Then the station status to get the current state of the stations
    const stationsStatus = await getStationStatus();
    // Finaly we map both info to handle only relevant stations
    const newRelevantStations = getRelevantStations(
      stationsInfo,
      stationsStatus,
      RADIUS,
      KEYRUS_COOR
    );
    setRelevantStations(newRelevantStations);

    return () => {
      clearTimeout(timer);
    };
  }, [refresh]);

  return (
    <div>
      <h2 className="mapTitle">ZenVelov</h2>
      <div className="nav">
        <button className="profil-btn btn-primary" onClick={() => setShowProfil(true)}>Profil</button>
        <Logout />
      </div>
      <div id="map">
        <MapContainer center={KEYRUS_COOR} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
            url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiam9uYXRoYW5rZXlydXMiLCJhIjoiY2t6cjRiaTJkMDlsbjJubW9iYXd5dGF6NyJ9.GVp-MojliqtRhe-0t-pLEQ"
            id="mapbox/streets-v11"
            tileSize={512}
            zoomOffset={-1}
          />
          <LayerGroup>
            <Circle
              center={KEYRUS_COOR}
              pathOptions={{ color: "red", fillColor: "red" }}
              radius={RADIUS}
            />
          </LayerGroup>
          <Marker position={KEYRUS_COOR}>
            <Popup>{"Keyrus"}</Popup>
          </Marker>
          {relevantStations &&
            relevantStations.map((station, idx) => {
              return (
                <Marker
                  key={`marker-${idx}`}
                  position={[station.lat, station.lon]}
                >
                  <Popup>
                    <b></b> {station.address} <hr></hr> Vélo(s) disponible(s):{" "}
                    {station.num_bikes_available} <hr></hr> Dock(s)
                    disponible(s): {station.num_docks_available}
                  </Popup>
                </Marker>
              );
            })}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
