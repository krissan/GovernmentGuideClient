import { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

import RepBoundaryPoly from "./RepBoundaryPoly";


import { Dimension } from "../../CustomIntefaces/MapProps";
import useWindowDimensions from "../../customHooks/useWindowDimensions";
import { RepBoundary, useAppContext } from "../../AppContext";
import { pageMargin, sideListWidth } from "../../AppValues";

interface MapProps {

  boundaryToggled:RepBoundary|null, 
  setBoundaryToggled:Dispatch<SetStateAction<RepBoundary | null>>
}

const MapAlt:React.FC<MapProps> = ({boundaryToggled, setBoundaryToggled}) => {
  //App Context
  const { repBoundaries, userAddr, selectedListKey, setSelectedListKey, setHoveredListKey } = useAppContext();

  //height and width of map
  const [mapDimension, setMapDimension] = useState<Dimension>({width:300, height:300});
  const ref = useRef<HTMLDivElement>(null);
  const [shape, setShape] = useState<google.maps.LatLngLiteral[]>([]);

  //Height and Width of window
  const { height, width } = useWindowDimensions();

  //Distance from right and bottom of screen
  const offsetY:number = ref.current?.offsetTop ? ref.current?.offsetTop : 0;
  const offsetX:number = ref.current?.offsetLeft ? ref.current?.offsetLeft : 0;

  //if window dimension changes of representative changes, update map
  useEffect(() => {
    setMapDimension({width:repBoundaries.length > 0 ? width-offsetX-sideListWidth:width-offsetX-pageMargin, height:(height-offsetY)});
  }, [height,width, repBoundaries, offsetX, offsetY]);

  //set shape when boundaryToggle changed
  useEffect(() => {
    if(boundaryToggled && boundaryToggled.boundary.outline)
    {
      const newShape:google.maps.LatLngLiteral[] = boundaryToggled.boundary.outline?.map((o)=>{
        const coord:google.maps.LatLngLiteral = {lat: o.x, lng: o.y};
        return coord;
      })

      setShape(newShape)
    }
    else
    {
      setShape([]);
    }  
  }, [boundaryToggled]);


  return (
    <div ref={ref} style={{flex:1}}>
        <GoogleMap
          center={userAddr}
          mapContainerStyle={{width: mapDimension.width, height:mapDimension.height}}
          mapContainerClassName="App-map"
          zoom={12}
        >
          {boundaryToggled &&
          <RepBoundaryPoly
                  key={boundaryToggled.rep.id}
                  polyKey={boundaryToggled.rep.id}
                 /* onMouseOver={()=>{setHoveredListKey(boundaryToggled.rep.id);console.log("hovered"+boundaryToggled.boundary.boundaryName+boundaryToggled.rep.id);}}
                  onMouseOut={()=>{setHoveredListKey(null);}}
                  onMouseDown={()=>{setSelectedListKey(boundaryToggled.rep.id === selectedListKey ? null : boundaryToggled.rep.id);console.log("selected"+boundaryToggled.boundary.boundaryName);}}*/
                  path={shape}
                />
          }
          {
            //All boundary markers 
            repBoundaries.filter((r)=>{return r.boundary}).map((b:RepBoundary)=>{ 
              return <Marker key={b.boundary.id} onLoad={marker => {
                const customIcon = (opts: { fillColor: string; strokeColor: string; }) => Object.assign({
                  path: 'M12.75 0l-2.25 2.25 2.25 2.25-5.25 6h-5.25l4.125 4.125-6.375 8.452v0.923h0.923l8.452-6.375 4.125 4.125v-5.25l6-5.25 2.25 2.25 2.25-2.25-11.25-11.25zM10.5 12.75l-1.5-1.5 5.25-5.25 1.5 1.5-5.25 5.25z',
                  fillColor: '#34495e',
                  fillOpacity: 1,
                  strokeColor: '#000',
                  strokeWeight: 1,
                  scale: 1,
                }, opts);
    
                marker.setIcon(customIcon({
                  fillColor: 'green',
                  strokeColor: 'white'
                }));
                
              }} position={{lat: b.boundary.centerLat, lng: b.boundary.centerLng}} onClick={()=>{setBoundaryToggled(b)}}/>
            })
          }
          {/*Position Marker*/}
          <Marker position={userAddr}/>  
        </GoogleMap>
    </div>  
  );
}

export default MapAlt;
