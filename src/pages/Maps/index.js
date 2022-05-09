import React from "react";
import Leaflet from "leaflet"
import Geoparser from './geoparser'
import { api } from '../../api'

function Leaf(props) {
  const source = [20.6593985,-103.3492725]  
  const {
      setRoutes, 
      setStations, 
      setStaticFiles, 
      setLastUnits, 
      
      filters, 
      setFilters,

      routeNames, 
      stationNames, 


    } = React.useContext(Geoparser.Context)


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

    setStations(Leaflet.geoJSON().addTo(map))
    setRoutes(Leaflet.geoJSON().addTo(map))
    Leaflet.control.scale().addTo(map);
    
    Leaflet.Marker.prototype.options.icon = Leaflet.icon({
        iconUrl: "./marker.png",
        iconSize:     [20, 20], // size of the icon
    });
    api.getStaticFiles(null, setStaticFiles)
    api.getLastUnits(null, setLastUnits)
  }, []);

  function filterSelection(e) {
    console.log(e.currentTarget.value)
    if(e.currentTarget)
      setFilters(e.currentTarget.name, e.currentTarget.value)
  }

  return ( 
    <div >
      <div id="map" style={{height:'500px', width:'800px'}}></div>
      {routeNames && stationNames && 
        <div id="filters" >
          <div id="filters-route">
            <label>{ (filters && filters["route"]) || "Selecciona ruta"}</label>
            <select onChange={filterSelection} name="route" id="route_selector">
              {stationNames.map( r => (<option value={routeNames[r]}>{r}</option>) )}
            </select>
          </div>
        </div>
      }
    </div>
  );
}

export default Leaf;