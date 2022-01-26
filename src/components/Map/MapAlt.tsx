import { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

import RepBoundaryPoly from "./RepBoundaryPoly";


import { Dimension } from "../../CustomIntefaces/MapProps";
import useWindowDimensions from "../../customHooks/useWindowDimensions";
import { RepBoundary, useAppContext } from "../../AppContext";
import appValues from "../../resources/AppValues";
import CustomMarker from "./CustomMarker";
import { mapStyle } from "../../resources/mapStyle";

interface MapProps {

  boundaryToggled:RepBoundary|null, 
  setBoundaryToggled:Dispatch<SetStateAction<RepBoundary | null>>
}

const MapAlt:React.FC<MapProps> = ({boundaryToggled, setBoundaryToggled}) => {
  //App Context
  const { repBoundaries, userAddr} = useAppContext();

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
    setMapDimension({width:repBoundaries.length > 0 ? width-offsetX-appValues.sideListWidth:width-offsetX-appValues.pageMargin, height:(height-offsetY)});
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
          options={{styles:mapStyle}}
          zoom={12}
        >
          {boundaryToggled &&
          <RepBoundaryPoly
            polyId={boundaryToggled.rep.id}
            /* onMouseOver={()=>{setHoveredListKey(boundaryToggled.rep.id);console.log("hovered"+boundaryToggled.boundary.boundaryName+boundaryToggled.rep.id);}}
            onMouseOut={()=>{setHoveredListKey(null);}}
            onMouseDown={()=>{setSelectedListKey(boundaryToggled.rep.id === selectedListKey ? null : boundaryToggled.rep.id);console.log("selected"+boundaryToggled.boundary.boundaryName);}}*/
            path={shape}
          />
          }
          {
            //All boundary markers 
            repBoundaries.filter((r)=>{return r.boundary}).map((b:RepBoundary)=>{ 
              return <CustomMarker 
                        selected={b.boundary.id===boundaryToggled?.boundary.id}
                        key={b.boundary.id} 
                        position={{lat: b.boundary.centerLat, lng: b.boundary.centerLng}} 
                        onClick={()=>{setBoundaryToggled(b)}}/>
            })
          }
          {/*Position Marker*/}
          <Marker position={userAddr}/>  
        </GoogleMap>
    </div>  
  );
}

export default MapAlt;
