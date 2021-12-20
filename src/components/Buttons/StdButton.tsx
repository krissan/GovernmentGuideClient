import React from "react";
import { Button, ButtonProps } from "@material-ui/core";

import useStyles from './styles';

interface StdButtonProps extends ButtonProps {
  onHoverColor?:string;
}

const StdButton:React.FC<StdButtonProps> = ({onHoverColor,...props}) => {
  const classes = useStyles();

  return (
    <Button className={classes.StdButton} {...props} />
  );
}

export default StdButton;