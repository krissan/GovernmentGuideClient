import React, { Props } from "react";
import { Typography, TypographyProps } from "@material-ui/core";

import useStyles from './styles';

const StepSubHeader:React.FC<TypographyProps> = ({children, ...props}) => {
  const classes = useStyles();

  return (
    <Typography className={classes.stepSubHeader} style={{...props}} gutterBottom component="div">
      {children}
    </Typography>
  );
}

export default StepSubHeader;