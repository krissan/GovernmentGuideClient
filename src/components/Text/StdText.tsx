import React from "react";
import { Typography, TypographyProps } from "@material-ui/core";

import useStyles from './styles';

const StdText:React.FC<TypographyProps> = ({children, ...props}) => {
  const classes = useStyles();

  return (
    <Typography className={classes.stdText} style={{...props}} gutterBottom component="div">
      {children}
    </Typography>
  );
}

export default StdText;