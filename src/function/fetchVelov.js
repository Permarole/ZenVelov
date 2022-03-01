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

export function getRelevantStations (stationsInfo, stationsStatus, RADIUS, KEYRUS_COOR){
    const relevantStations = [];
    for (let station of stationsInfo) {
      let point1 = KEYRUS_COOR;
      let point2 = [station.lat, station.lon];
      if(distance([point1, point2]) <= RADIUS){
        for(let status of stationsStatus){
            if (status.station_id === station.station_id){
                relevantStations.push({...station, ...status }) 
                break;
            }
        }   
      }
    }
    return relevantStations;
  }