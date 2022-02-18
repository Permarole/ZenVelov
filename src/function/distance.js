import React from "react";

export function distance(points){
    
    const point_a = points[0];
    const point_b = points[1];

    let latlong_a = new L.LatLng(point_a[0], point_a[1]);
    let latlong_b = new L.LatLng(point_b[0], point_b[1]);
    return latlong_b.distanceTo(latlong_a) ;
   
  }

  export default distance;