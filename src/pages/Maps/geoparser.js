import React from "react";
import Leaflet from "leaflet";
import { api } from '../api'
import { useMap } from '../../hooks/useMap'

function Shapefile({ source }) {

  const [staticFiles, setStaticFiles] = React.useState(null)
  const [lastUnits, setLastUnits] = React.useState(null)

  React.useEffect(() => {
    api.getStaticFiles(null, setStaticFiles)
    api.getLastUnits(null, setLastUnits)
  }, []);

  React.useEffect(() => {
    if(staticFiles && lastUnits){
      const map = Leaflet.map('map').setView(source, 13)
      addLayers(staticFiles)
      //addLayers(lastUnits)
    }
  }, [staticFiles, lastUnits])


  return "love leaf";
}

function addLayers(layers, map){
  const addToMap = geo => map.addLayer( Leaflet.geoJSON(geo) )
  Array.isArray(data)?data.map(addToMap):addToMap(data)
}


export default Shapefile;
