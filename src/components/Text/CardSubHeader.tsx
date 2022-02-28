import { Typography, TypographyProps } from "@material-ui/core";
import React from "react";

import useStyles from './styles';


const CardSubHeader:React.FC<TypographyProps> = ({children, style}) => {
  const classes = useStyles();

  return (
    <Typography className={classes.header} style={{...style}} variant="subtitle1" gutterBottom component="div">
      {children}
    </Typography>
  );
}

export default CardSubHeader;