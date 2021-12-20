import React from "react";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

import useStyles from './styles';

const StdInputIcon:React.FC<FontAwesomeIconProps> = ({icon, ...props}) => {
  const classes = useStyles();

  return (
    <FontAwesomeIcon icon={icon} className={classes.stdInputIcon} {...props} />
  );
}

export default StdInputIcon;