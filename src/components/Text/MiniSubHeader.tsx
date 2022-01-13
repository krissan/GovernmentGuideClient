import { Typography, TypographyProps } from "@material-ui/core";
import React from "react";

import useStyles from './styles';


const MiniSubHeader:React.FC<TypographyProps> = ({children, style}) => {
  const classes = useStyles();

  return (
    <Typography style={style} className={classes.miniSubHeader}>
    {children}
    </Typography>
  );
}

export default MiniSubHeader;