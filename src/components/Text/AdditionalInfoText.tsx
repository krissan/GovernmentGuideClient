import React from "react";
import { Typography } from "@material-ui/core";

import { StdProps } from "../../customIntefaces/StdProps";
import useStyles from './styles';

const AdditionalInfoText:React.FC<StdProps> = ({children, style}) => {
  const classes = useStyles();

  return (
    <Typography className={classes.additonalInfo} style={{...style}} gutterBottom component="div">
      {children}
    </Typography>
  );
}

export default AdditionalInfoText;