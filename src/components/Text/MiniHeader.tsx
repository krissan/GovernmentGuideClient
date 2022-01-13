import { Typography, TypographyProps } from "@material-ui/core";
import React from "react";

import useStyles from './styles';


const MiniHeader:React.FC<TypographyProps> = ({children, style}) => {
  const classes = useStyles();

  return (
    <Typography style={style} className={classes.miniHeader}>
    {children}
    </Typography>
  );
}

export default MiniHeader;