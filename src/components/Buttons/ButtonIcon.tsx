import React from "react";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

import useStyles from './styles';


const ButtonIcon:React.FC<FontAwesomeIconProps> = ({icon, fontSize=20, ...props}) => {
  const classes = useStyles();

  return (
    <FontAwesomeIcon icon={icon} className={classes.ButtonIcon} style={{fontSize:fontSize}} {...props} />
  );
}

export default ButtonIcon;