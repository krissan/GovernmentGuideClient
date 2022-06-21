import { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

import RepBoundaryPoly from "./RepBoundaryPoly";


import { Dimension } from "../../customIntefaces/MapProps";
import useWindowDimensions from "../../customHooks/useWindowDimensions";
import { RepBoundary, useAppContext } from "../../AppContext";
import appValues from "../../resources/AppValues";
import CustomMarker from "./CustomMarker";
import { mapStyle } from "../../resources/mapStyle";
import { useMediaQuery, useTheme } from "@material-ui/core";

interface MapProps {
  boundaryToggled:RepBoundary|null, 
  setBoundaryToggled:Dispatch<SetStateAction<RepBoundary | null>>,
  repLoading: boolean
}

const MapAlt:React.FC<MapProps> = ({boundaryToggled, setBoundaryToggled, repLoading}) => {
  //App Context
  const { repBoundaries, userAddr} = useAppContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  //height and width of map
  const [mapDimension, setMapDimension] = useState<Dimension>({width:300, height:300});
  const ref = useRef<HTMLDivElement>(null);
  const [shapes, setShapes] = useState<Array<google.maps.LatLngLiteral[]>>([]);

  //Height and Width of window
  const { height, width } = useWindowDimensions();

  //Distance from right and bottom of screen
  const offsetY:number = ref.current?.offsetTop ? ref.current?.offsetTop : 0;
  const offsetX:number = ref.current?.offsetLeft ? ref.current?.offsetLeft : 0;

  //if window dimension changes of representative changes, update map
  useEffect(() => {
    if(!isMobile)
    {
      setMapDimension({width:(repBoundaries.size > 0 || repLoading === true)  ? width-offsetX-appValues.sideListWidth:width-offsetX-appValues.pageMargin, height:(height-offsetY)});
    }
  }, [height,width, repBoundaries, offsetX, offsetY, repLoading, isMobile]);

  //set shape when boundaryToggle changed
  useEffect(() => {
    if(boundaryToggled && boundaryToggled.outline)
    {
      const parsedShapes:Array<google.maps.LatLngLiteral[]> = boundaryToggled.outline?.map((o)=>{
        return o.map((s)=>{ 
          const coord:google.maps.LatLngLiteral = {lat: s.x, lng: s.y};
          return coord;
        });
      });

      setShapes(parsedShapes)
    }
    else
    {
      setShapes([]);
    }  
  }, [boundaryToggled]);

  return (
    <div ref={ref} style={{flex:1}}>
        <GoogleMap
          center={userAddr}
          mapContainerStyle={isMobile ? (repBoundaries.size > 0 ?  {width:"100vw", height:"40vw"} : {width:"100vw", height:mapDimension.height}) : {width: mapDimension.width, height:mapDimension.height}}
          mapContainerClassName="App-map"
          options={{styles:mapStyle}}
          zoom={12}
        >
          {boundaryToggled &&
            <RepBoundaryPoly
                polyId={boundaryToggled.rep.id}
                paths={shapes}
              />
          }

          {
            //All boundary markers 
            // eslint-disable-next-line array-callback-return
            Array.from(repBoundaries.values(), (b:RepBoundary)=>{ 
              if(b.boundary && b.shapes)
              {
                return <CustomMarker 
                          selected={b.boundary.id===boundaryToggled?.boundary?.id}
                          key={b.boundary.id.toString()+(b.boundary.id===boundaryToggled?.boundary?.id)} 
                          position={{lat: b.shapes[0].centerLat, lng: b.shapes[0].centerLng}} 
                          onClick={()=>{boundaryToggled?.boundary?.id === b.boundary?.id ? setBoundaryToggled(null) : setBoundaryToggled(b)}}/>
              }
            })
          }
          {/*Position Marker*/}
          <Marker position={userAddr}/>  
        </GoogleMap>
    </div>  
  );
}

export default MapAlt;
