import React from "react";
import { TextField, StandardTextFieldProps } from '@material-ui/core';

import useStyles from './styles';
import ButtonIcon from "../Buttons/ButtonIcon";
import CustomIconButton from "../Buttons/CustomIconButton";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface StandardSearchFieldProps extends StandardTextFieldProps {
  disabledSearch?: boolean,
  onEnter():Promise<void>
}

//Search Input With Search Button
const StandardSearchField:React.FC<StandardSearchFieldProps> =  ({disabledSearch=false, onEnter=(searchTerm:string)=>{}, ...props}) => {
  const classes = useStyles();

  return (
    <div style={{display:"flex", flexDirection:"row", width:"100%"}}>
      <TextField placeholder="Search…" style={{width:"100%"}} className={classes.textField} variant="outlined" InputProps={{classes:{root: classes.searchInput}} } {...props}/>
      {disabledSearch ? 
        <CustomIconButton disabled >
          <ButtonIcon icon={faSearch}/>
        </CustomIconButton> : 
        <CustomIconButton onClick={()=>{onEnter("y")}}>
          <ButtonIcon icon={faSearch}/>
        </CustomIconButton>}
    </div>
  );
}

export default StandardSearchField;