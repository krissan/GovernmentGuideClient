import React from "react";
import { Polygon, PolygonProps } from "@react-google-maps/api";

import { useTheme } from "@material-ui/core";

interface RepBoundaryPolyProps extends PolygonProps {
  polyId:number
}

//Shape for Representative Boundary
const RepBoundaryPoly:React.FC<RepBoundaryPolyProps> = ({polyId, ...props}) => {
  const theme = useTheme();

  return (
    <Polygon
      options={{
        strokeWeight: 1,
        strokeColor: theme.palette.primary.dark,
        fillOpacity: 0.3,
        fillColor: theme.palette.primary.main
      }}
      {...props}
    />
  );
}

export default RepBoundaryPoly;