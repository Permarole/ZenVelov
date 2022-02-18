import React from "react";
import distance from "./distance"


export async function getStationStatus(map, stationsInfo){
    await fetch('https://transport.data.gouv.fr/gbfs/lyon/station_status.json', {
      method: 'GET'
    })
    .then((response) => (response.json()))
    .then((stationsStatus) => (handleRelevantStations(map, stationsInfo, stationsStatus)));

  }

export async function getStationInformation(map){
    await fetch('https://transport.data.gouv.fr/gbfs/lyon/station_information.json', {
      method: 'GET'
    })
    .then((response) => (response.json()))
    .then((stationsInfo) => getStationStatus(map,stationsInfo));
  }

export function handleRelevantStations (map, stationsInfo, stationsStatus){
    const KEYRUS_COOR = [45.77872391853525, 4.859720853364637];
    const RADIUS = 1500;
    for (let station of stationsInfo.data.stations) {
      let point1 = KEYRUS_COOR;
      let point2 = [station.lat, station.lon];
      if(distance([point1, point2]) <= RADIUS){
        for(let status of stationsStatus.data.stations){
            if (status.station_id === station.station_id){
                let velovMarker = L.marker([station.lat, station.lon]).addTo(map);
                {station.address ?
                velovMarker.bindPopup( `<b> ${station.address} <br>Vélo(s) disponible(s):  ${status.num_bikes_available} <hr> Dock(s) disponible(s): ${status.num_docks_available}`)
                : velovMarker.bindPopup(`<b>Vélo(s) disponible(s):  ${status.num_bikes_available} <hr> Dock(s) disponible(s): ${status.num_docks_available}`)};
                break;
            }
        }   
      }
    }
  }