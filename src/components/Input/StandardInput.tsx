import React from "react";
import { TextField, StandardTextFieldProps } from '@material-ui/core';

import useStyles from './styles';

//Standard Input
const StandardInput:React.FC<StandardTextFieldProps> =  (props) => {
  const classes = useStyles();

  return (
    <TextField
        className={classes.stdInput}
        {...props}
        variant="standard"
        InputLabelProps={{
          classes: {
            focused: classes.stdInputLabelFocused
          }
        }}
    />
  );
}

export default StandardInput;