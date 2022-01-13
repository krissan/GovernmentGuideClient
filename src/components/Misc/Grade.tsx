import React from "react";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { Typography } from "@material-ui/core";

import useStyles from './styles';

interface GradeProps extends FontAwesomeIconProps {
  grade:String
}

//Category Grade and Letter
const Grade:React.FC<GradeProps> = ({icon, grade, fontSize=14, ...props}) => {
  const classes = useStyles();

  return (<div style={{flexDirection:"row", display:"flex"}}>
      <FontAwesomeIcon className={classes.gradeIcon} icon={icon} style={{ fontSize:fontSize, paddingTop:4}} {...props} />
      <Typography className={classes.gradeLetter}>{grade}</Typography>
    </div>
  );
}

export default Grade;