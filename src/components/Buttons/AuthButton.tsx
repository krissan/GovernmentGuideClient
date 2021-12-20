import React from "react";
import { Button, ButtonProps } from "@material-ui/core";

import useStyles from './styles';

const AuthButton:React.FC<ButtonProps> = (props) => {
  const classes = useStyles();

  return (
    <Button className={classes.AuthButton} {...props} disableElevation />
  );
}

export default AuthButton;