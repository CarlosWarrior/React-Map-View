import React from "react";
import Leaflet from "leaflet";
import { api } from '../../api'

function Shapefile({ source }) {

  const [staticFiles, setStaticFiles] = React.useState(null)
  const [lastUnits, setLastUnits] = React.useState(null)
  const stations = React.useRef()
  const routes = React.useRef()

  React.useEffect(() => {
    console.log(source)
    const map = Leaflet.map('map')
    //map.setView(source, 1, Leaflet.CRS.EPSG32613)
    map.setView(source, 13)
    Leaflet.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/light-v9',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(map);

    stations.current = Leaflet.geoJSON().addTo(map);
    routes.current = Leaflet.geoJSON().addTo(map);
    Leaflet.control.scale().addTo(map);
    
    Leaflet.Marker.prototype.options.icon = Leaflet.icon({
        iconUrl: "./marker.png",
        iconSize:     [20, 20], // size of the icon
    });

    api.getStaticFiles(null, setStaticFiles)
    api.getLastUnits(null, setLastUnits)
  }, []);

  React.useEffect(() => {
    console.log("useEffect", staticFiles && lastUnits?true:false)
    if(staticFiles && lastUnits){
      JSON.parse(staticFiles.rutas).features.forEach((feature, i) => {
        console.log(i, feature.type, feature.geometry)
        routes.current.addData(feature)
      })
      JSON.parse(staticFiles.estaciones).features.forEach((feature, i) => {
        console.log(i, feature.type, feature.geometry)
        stations.current.addData(feature)
      })
    }
  }, [staticFiles, lastUnits])


  return "love leaf";
}


export default Shapefile;
