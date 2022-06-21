import React, { useEffect } from "react";
import { Marker, MarkerProps } from "@react-google-maps/api";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

import { useTheme } from "@material-ui/core";

interface CustomMarkerProps extends MarkerProps
{
  selected:boolean,
  baseColor?:string,
  selectedColor?:string,
  key:string
}

//Shape for Representative Boundary
const CustomMarker:React.FC<CustomMarkerProps> = ({selected, baseColor, selectedColor, ...props}) => {
  const theme = useTheme();

  useEffect(()=>{console.log(selected)},[selected]);

  return (
      <Marker 
        onLoad={marker => {
          const customIcon = (opts: { fillColor: string; strokeColor: string; }) => Object.assign({
            path: faMapMarkerAlt.icon[4] as string,
            fillColor: opts.fillColor,
            fillOpacity: 1,
            anchor: new google.maps.Point(
              faMapMarkerAlt.icon[0] / 2, // width
              faMapMarkerAlt.icon[1] // height
            ),
            strokeWeight: 1,
            strokeColor: opts.strokeColor,
            scale: 0.075,
          }, opts);

          marker.setIcon(customIcon({
            fillColor: selected ? theme.palette.primary.dark : theme.palette.primary.main,
            strokeColor: selected ? theme.palette.primary.dark : theme.palette.primary.main,
          }));
        }} 
        {...props}
        />
  );
}

export default CustomMarker;