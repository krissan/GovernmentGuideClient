import React, { ChangeEvent } from "react";
import {InputLabel, Select, MenuItem } from '@material-ui/core';

import useStyles from './styles';

interface StandardSelectProps {
  items:Array<string>,
  label:string,
  onChange:(event: ChangeEvent<any>)=>void
}

//Standard Select
const StandardSelect:React.FC<StandardSelectProps> =  ({items, label, ...props}) => {
  const classes = useStyles();

  return (
    <div>
      <InputLabel className={classes.stdSelectLabel}>{label}</InputLabel>
      <Select
        className={classes.stdSelect}
        {...props}
      >
        {items.map((x:string)=>
          <MenuItem key={x} value={x}>{x}</MenuItem>
        )}
      </Select>
    </div>
  );
}

export default StandardSelect;