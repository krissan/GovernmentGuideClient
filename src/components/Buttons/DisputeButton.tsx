import React from "react";

import useStyles from './styles';
import StdButton, { StdButtonProps } from "./StdButton";

//Buttons for auth pages(signup, login, etc)
const DisputeButton:React.FC<StdButtonProps> = (props) => {
  const classes = useStyles();

  return (
    <StdButton classes={{root: classes.alert}} {...props} >Dispute</StdButton>
    );
}

export default DisputeButton;