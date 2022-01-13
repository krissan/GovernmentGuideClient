import React, { useEffect } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { TextField } from '@material-ui/core';
import { faFilter, faSave, faSearch } from '@fortawesome/free-solid-svg-icons'

import CustomIconButton from '../Buttons/CustomIconButton';
import ButtonIcon from "../Buttons/ButtonIcon";

import useStyles from './styles';
import SearchField from "../Input/SearchField";

interface AddressBarProps {
  onPlaceChanged():void;
  onTextChange(autocomplete: google.maps.places.Autocomplete):void;
}

//Address Search Autocomplete field with Search,Save and Filter Buttons
const AddressBar:React.FC<AddressBarProps> = ({onPlaceChanged, onTextChange}) => {
  const classes = useStyles();

  return (
    <div style={{padding:"10px 0px 20px 0px", display:"flex", width:"100%", justifyContent: "center"}}>
      <Autocomplete onLoad={onTextChange} onPlaceChanged={onPlaceChanged}>
        <SearchField defaultValue={"27 Knowlton Drive, Scarborough, ON, Canada"} />
      </Autocomplete>
      <CustomIconButton disabled>
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