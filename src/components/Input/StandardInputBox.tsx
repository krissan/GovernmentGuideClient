import React from "react";
import { StandardTextFieldProps, InputLabel } from '@material-ui/core';

import useStyles from './styles';
import StandardInput from "./StandardInput";

interface StandardInputBoxProps extends StandardTextFieldProps {
  inputLabel:string
}

//Standard Input
const StandardInputBox:React.FC<StandardInputBoxProps> =  ({inputLabel,...props}) => {
  const classes = useStyles();

  return (
    <>
      <InputLabel className={classes.stdSelectLabel}>{inputLabel}</InputLabel>
      <StandardInput
        multiline
        placeholder="Enter Message Here..."
        {...props}
      />
    </>
  );
}

export default StandardInputBox;