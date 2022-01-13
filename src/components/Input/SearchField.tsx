import React from "react";
import { TextField, StandardTextFieldProps } from '@material-ui/core';

import useStyles from './styles';

//Search Input
const SearchField:React.FC<StandardTextFieldProps> =  (props) => {
  const classes = useStyles();

  return (
    <div>
      <TextField placeholder="Search…" className={classes.textField} variant="outlined" InputProps={{classes:{root: classes.searchInput}} } />
    </div>
  );
}

export default SearchField;