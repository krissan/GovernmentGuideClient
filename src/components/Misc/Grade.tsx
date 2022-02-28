import React from "react";
import { Typography } from "@material-ui/core";

import useStyles from './styles';

interface GradeProps {
  grade:String
}

//Category Grade and Letter
const Grade:React.FC<GradeProps> = ({grade}) => {
  const classes = useStyles();

  return (
      <Typography className={classes.gradeLetter}>{grade}</Typography>
  );
}

export default Grade;