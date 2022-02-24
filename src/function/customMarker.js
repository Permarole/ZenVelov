import React from "react";
import L from "leaflet";

export const KeyrusIcon = L.icon({
  iconUrl: "icon-keyrusv2.png",
  iconSize: [25, 41],
  className: "marker",
});

export function getIcon(stationNumDock, stationNumVelov) {
  if (stationNumDock === 0) {
    return L.icon({
      iconUrl: "marker-yellow.png",
      iconSize: [25, 41],
      className: "marker",
    });
  }
  if (stationNumVelov === 0) {
    return L.icon({
      iconUrl: "marker-grey.png",
      iconSize: [25, 41],
      className: "marker",
    });
  }

  return L.icon({
    iconUrl: "marker-red.png",
    iconSize: [25, 41],
    className: "marker",
  });
}
