import React, { useEffect, useRef, useState } from "react";
import GoogleMapReact from "google-map-react";

import useWindowDimensions from "../../customHooks/useWindowDimensions";
import { RepBoundary, useAppContext } from "../../AppContext";

interface Dimension {
  width: number,
  height: number
}

const Map = () => {
  //Maintain width of container
  const ref = useRef<HTMLDivElement>(null);
  const [mapDimension, setMapDimension] = useState<Dimension>({width:300, height:300});
  const { repBoundaries } = useAppContext();

  const { height, width } = useWindowDimensions();

  useEffect(() => {
    const offsetY:number = ref.current?.offsetTop ? ref.current?.offsetTop : 0;
    const offsetX:number = ref.current?.offsetLeft ? ref.current?.offsetLeft : 0;

    setMapDimension({width:width-offsetX-500, height:(height-offsetY)});
  }, [height,width]);

  //map props
  const center = {lat: 43.64, lng: -79.47}

  return (
    <div ref={ref} style={{flex:1}}>
      <div style={{width: mapDimension.width, height:mapDimension.height}}>
      <GoogleMapReact
        defaultCenter={center}
        center={center}
        defaultZoom={14}
      >
        { repBoundaries.map((rb:RepBoundary)=>{
          return /*<RepCard repBoundary={rb} key={rb.rep.id}/>*/
        })
        }
      </GoogleMapReact>
      </div>
    </div>  
  );
}

export default Map;
