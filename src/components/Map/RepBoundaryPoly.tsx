import React, { useEffect, useState } from "react";
import { Polygon } from "@react-google-maps/api";

import useStyles from './styles';
import { useTheme } from "@material-ui/core";
import { useAppContext } from "../../AppContext";

//Shape for Representative Boundary
const RepBoundaryPoly:React.FC<any> = ({polyKey,...Poly}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [strokeWeight, setStrokeWeight] = useState<Number>(1);
  const [fillOpacity, setFillOpacity] = useState<Number>(0.3);
  //App Context
  const { selectedListKey, hoveredListKey } = useAppContext();

  //update shape border and opacity if hovered on or selected
  useEffect(()=>{
    if(polyKey === selectedListKey)
    {
      setFillOpacity(0.6);
      setStrokeWeight(2);    }
    else if(polyKey === hoveredListKey)
    {
      setFillOpacity(0.5);
      setStrokeWeight(1);
    }
    else
    {
        setFillOpacity(0.3);
        setStrokeWeight(1);
    }

  },[selectedListKey, hoveredListKey, polyKey])

  return (
    <Polygon
      {...Poly}
      options={{
        strokeWeight: strokeWeight,
        strokeColor: theme.palette.primary.dark,
        fillOpacity: fillOpacity,
        fillColor: theme.palette.primary.main
      }}
    />
  );
}

export default RepBoundaryPoly;