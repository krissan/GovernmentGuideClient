import React from "react";
import { Marker, MarkerProps } from "@react-google-maps/api";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

import { useTheme } from "@material-ui/core";

interface CustomMarkerProps extends MarkerProps
{
  selected:boolean,
  baseColor?:string,
  selectedColor?:string
}

//Shape for Representative Boundary
const CustomMarker:React.FC<CustomMarkerProps> = ({selected, baseColor, selectedColor, ...props}) => {
  const theme = useTheme();

  const colorChooser = ():string => {
    if(selected)
    {
      return baseColor ? baseColor : theme.palette.primary.main
    }
    else
    {
      return selectedColor ? selectedColor : theme.palette.primary.main
    }
  }

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
          fillColor: colorChooser(),
          strokeColor: colorChooser(),
        }));
        
      }} 
      {...props}
      />
  );
}

export default CustomMarker;