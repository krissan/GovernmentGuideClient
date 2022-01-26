import React, { useEffect, useState } from "react";
import { Polygon, PolygonProps } from "@react-google-maps/api";

import useStyles from './styles';
import { useTheme } from "@material-ui/core";
import { useAppContext } from "../../AppContext";

interface RepBoundaryPolyProps extends PolygonProps {
  polyId:number
}

//Shape for Representative Boundary
const RepBoundaryPoly:React.FC<RepBoundaryPolyProps> = ({polyId, ...props}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [strokeWeight, setStrokeWeight] = useState<number>(1);
  const [fillOpacity, setFillOpacity] = useState<number>(0.3);
  //App Context
  const { selectedListKey, hoveredListKey } = useAppContext();

  //update shape border and opacity if hovered on or selected
  useEffect(()=>{
    if(polyId === selectedListKey)
    {
      setFillOpacity(0.6);
      setStrokeWeight(2);    }
    else if(polyId === hoveredListKey)
    {
      setFillOpacity(0.5);
      setStrokeWeight(1);
    }
    else
    {
        setFillOpacity(0.3);
        setStrokeWeight(1);
    }

  },[selectedListKey, hoveredListKey, polyId])

  return (
    <Polygon
      options={{
        strokeWeight: strokeWeight,
        strokeColor: theme.palette.primary.dark,
        fillOpacity: fillOpacity,
        fillColor: theme.palette.primary.main
      }}
      {...props}
    />
  );
}

export default RepBoundaryPoly;