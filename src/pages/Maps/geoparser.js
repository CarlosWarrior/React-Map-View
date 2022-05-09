import React from "react";
import gens from './gens'

const LeafletContext = React.createContext({
  ["love leaf"]:"love leaf",
  filters:null, setFilters:() => {},
  routeNames:[], 
  stationNames:[],
  setRouteNames: () => {},
  setStationNames: () => {},
  setRoutes: () => {},
  setStations: () => {},
  setStaticFiles: () => {},
})

function LeafletProvider ({ source, ...props }) {

  const [_staticFiles, setStaticFiles] = React.useState(null)
  
  const [geos, setGeos] = React.useState(null)
  const [routesIndex, setRouteIndex] = React.useState(null)
  const [stationsIndex, setStationIndex] = React.useState(null)
  
  //const routesKeys = {};routes.features.map(feature => routesKeys[feature.properties.Tipo_de_se]=true)    
  //const stationRoutesKeys = {};stations.features.forEach(feat => feat.properties.Rutas_que_.split(",").forEach(r => stationRoutesKeys[r]=true) )    
  const [routeNames, setRouteNames] = React.useState(gens.vectorRoutes)
  const [stationNames, setStationNames] = React.useState(gens.stationRoutes)
  
  const [lastUnits, setLastUnits] = React.useState(null)

  const [filters, setFilters] = React.useState(null)

  const stations = React.useRef()
  function setRoutes(rs, index) {
    stations.current = rs
  }
  function filterRoute(route, index) {
    return Object.keys(gens.vectorRoutes).includes(route.properties["Tipo_de_se"]) && gens.vectorRoutes[route.properties["Tipo_de_se"]].includes(filters["route"])
  }

  const routes = React.useRef()
  function setStations(ss) {
    routes.current = ss
  }
  function filterStation(station, index) {
    const rts = station.properties["Rutas_que_"].split(",")
    if(filters)
      return rts.find(v => v.trim() == filters["route"])
    return rts.reduce((pv, c) => pv || gens.stationRoutes.includes(c), false)
  }
  
  React.useEffect(() => {
    if(_staticFiles){
      console.log("Receiving geojsons...")
      const rutas = JSON.parse(_staticFiles.rutas)
      const estaciones = JSON.parse(_staticFiles.estaciones)
      setFilters(null)
      console.log({rutas: rutas.features.length, estaciones: estaciones.features.length})
    }
  }, [_staticFiles])

  React.useEffect(() => {
    if(filters){
      if(filters["route"]){
        console.log("filtering geos...")
        const rutas = JSON.parse(_staticFiles.rutas)
        const estaciones = JSON.parse(_staticFiles.estaciones)
        console.log({gens, rutas: rutas.features.length, estaciones: estaciones.features.length, geos})
        setGeos({
          routes:{...rutas, features: rutas.features.filter(filterRoute)},
          stations:{...estaciones, features: estaciones.features.filter(filterStation)}
        })
      }
    }
  }, [filters])

  React.useEffect(() => {
    if(geos){
      routes.current.clearLayers()
      geos.routes.features.forEach((feature, i) => 
        routes.current.addData(feature)
      )
      stations.current.clearLayers()
      geos.stations.features.forEach((feature, i) => 
        stations.current.addData(feature)
      )
    }
  }, [geos])

  React.useEffect(() => {
    if(lastUnits){
      //units.current.clearLayers()
    }
  }, [lastUnits])

  const _setFilters = (t,v ) => {
      switch(t){
        case "route":
          if(stationNames.includes(v))
            setFilters({ ...filters, [t]: v })
        break;
    }
  }

  return (
    <LeafletContext.Provider value={{
      filters, 
      setFilters:_setFilters,
      routeNames,
      setLastUnits,
      setRoutes,
      stationNames,
      setStations,
      setStaticFiles,
    }}>
      {props.children}
    </LeafletContext.Provider>
  )
}


export default { Context:LeafletContext, Provider:LeafletProvider }