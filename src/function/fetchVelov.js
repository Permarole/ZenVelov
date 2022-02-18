import React from "react";
import distance from "./distance";
import axios from "axios";


export async function getStationStatus(){
    const res = await axios.get('https://transport.data.gouv.fr/gbfs/lyon/station_status.json')
    return res.data.data.stations;
  }

export async function getStationInformation(){
    const res = await axios.get('https://transport.data.gouv.fr/gbfs/lyon/station_information.json')
    return res.data.data.stations;
  }

export function handleRelevantStations (map, stationsInfo, stationsStatus, RADIUS, KEYRUS_COOR){
    for (let station of stationsInfo) {
      let point1 = KEYRUS_COOR;
      let point2 = [station.lat, station.lon];
      if(distance([point1, point2]) <= RADIUS){
        for(let status of stationsStatus){
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