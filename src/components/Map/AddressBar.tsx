import React, { useEffect } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { TextField } from '@material-ui/core';
import { faFilter, faSave, faSearch } from '@fortawesome/free-solid-svg-icons'

import CustomIconButton from '../Buttons/CustomIconButton';
import ButtonIcon from "../Buttons/ButtonIcon";

import useStyles from './styles';

interface AddressBarProps {
  onPlaceChanged():void;
  onTextChange(autocomplete: google.maps.places.Autocomplete):void;
}

const AddressBar:React.FC<AddressBarProps> = ({onPlaceChanged, onTextChange}) => {
  const classes = useStyles();

  return (
            <div style={{padding:"10px 0px 20px 0px", display:"flex", width:"100%", justifyContent: "center"}}>
              <Autocomplete onLoad={onTextChange} onPlaceChanged={onPlaceChanged}>
                <TextField placeholder="Search…" className={classes.textField} variant="outlined" InputProps={{classes:{root: classes.searchInput}} } />
              </Autocomplete>
              <CustomIconButton>
                <ButtonIcon icon={faSearch}/>
              </CustomIconButton>
              <CustomIconButton style={{marginLeft:4}}>
                <ButtonIcon icon={faSave}/>
              </CustomIconButton>
              <CustomIconButton style={{marginLeft:4}}>
                <ButtonIcon icon={faFilter} fontSize={18}/>
              </CustomIconButton>            
            </div>  

  );
}

export default AddressBar;