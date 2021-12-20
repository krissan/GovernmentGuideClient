import React from "react";
import { Typography } from "@material-ui/core";

import { StdProps } from "../../CustomIntefaces/StdProps";
import useStyles from './styles';


const SubHeader:React.FC<StdProps> = ({children, style}) => {
  const classes = useStyles();

  return (
    <div style={{marginBottom:10}}>
      <Typography className={classes.subHeader} style={{...style}} variant="h6" gutterBottom component="div">
        {children}
      </Typography>

    </div>
  );
}

export default SubHeader;