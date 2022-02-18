import React from "react";
import "./style.scss";
import {
  getStationInformation,
  getStationStatus,
  handleRelevantStations,
} from "../../function/fetchVelov";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = () => {
  const RADIUS = 1500;
  const KEYRUS_COOR = [45.77872391853525, 4.859720853364637];
  React.useEffect(async () => {
    // Check if the map container exist
    let map = L.map("map").setView(KEYRUS_COOR, 13);
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
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.1,
      radius: RADIUS,
    }).addTo(map);

    // Generate marker for every station inside the circle perimeter
    // First we gather all the stations information to get the coordinates
    const stationsInfo = await getStationInformation();
    // Then the station status to get the current state of the stations
    const stationsStatus = await getStationStatus();
    // Finaly we map both info to handle only relevant stations
    handleRelevantStations(
      map,
      stationsInfo,
      stationsStatus,
      RADIUS,
      KEYRUS_COOR
    );
  }, []);

  return (
    
    <div>
      <h2>Bienvenue sur ZenVelov</h2>
      <div id="map"></div>
    </div>
  );
};

export default Map;
