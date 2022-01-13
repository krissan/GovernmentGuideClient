import React from "react";
import { Button, ButtonProps } from "@material-ui/core";

import useStyles from './styles';

//Buttons for auth pages(signup, login, etc)
const AuthButton:React.FC<ButtonProps> = (props) => {
  const classes = useStyles();

  return (
    <Button className={classes.AuthButton} {...props} disableElevation />
  );
}

export default AuthButton;