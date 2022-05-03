import React from "react";
import GeoParser from './geoparser'

function Leaf(props) {
  const source = [ lat , lng ]
  return (
    <div id="map" style={{height:'500px', width:'800px'}}>
      <GeoParser source={source}/>
    </div>
  );
}

export default Leaf;