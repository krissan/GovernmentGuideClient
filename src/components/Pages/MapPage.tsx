import { useContext, useEffect, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { useTheme } from "@material-ui/core";

import Map from "../Map/Map";
import AddressBar from "../Map/AddressBar";
import SubHeader from "../Text/SubHeader";

import useStyles from './styles';
import RepCard from "../Cards/RepCard";
import { searchRepresentatives } from "../../api/representative";
import { AppContext, RepBoundary, useAppContext } from "../../AppContext";
import React from "react";

type Libraries = ("drawing" | "geometry" | "localContext" | "places" | "visualization")[];
const libraries:Libraries = ["places"]

const MapPage = () => {
  //width of second 
  const colTwoWidth=500;

  const [address, setAddress] = useState<google.maps.places.Autocomplete>();
  const [coords, setCoords] = useState({});
  const { repBoundaries, setRepBoundaries } = useAppContext();

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ? process.env.REACT_APP_GOOGLE_MAPS_API_KEY : "",
    libraries,
  })
  
  const onTextChange = (addr: google.maps.places.Autocomplete) => setAddress(addr);

  const onPlaceChanged = async () => {
    const lat = address?.getPlace()?.geometry?.location?.lat();
    const lng = address?.getPlace()?.geometry?.location?.lng();

    setCoords({ lat, lng });

    //get representative data
    let searchedRepBoundaries:Array<RepBoundary> = await searchRepresentatives();
    setRepBoundaries(searchedRepBoundaries);
  }
  
  if(loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return (
    <div style={{display:"flex", flexDirection:"column"}}>
      {/*Row 1*/}
      <div style={{display:"flex"}}>
        {/*Col 1*/}
        <div style={{display:"flex", flex:1, alignItems: "center", flexDirection:"column"}}>
          <AddressBar onPlaceChanged={onPlaceChanged} onTextChange={onTextChange} />
        </div>
        {/*Col 2*/}
        <div style={{width:colTwoWidth}}>

        </div>
      </div>
      {/*Row 2*/}
      <div style={{display:"flex"}}>        
        {/*Col 1*/}
        <div style={{flex:1}}>
          <Map />
        </div>
        {/*Row 2*/}        
        <div style={{width:colTwoWidth, paddingLeft:20, scrollBehavior: "smooth", height:800}}>
            <div style={{display:"flex",justifyContent:"center"}}>
              <SubHeader>REPRESENTATIVES</SubHeader>
            </div>
            { repBoundaries.map((rb:RepBoundary)=>{
              return <RepCard repBoundary={rb} key={rb.rep.id}/>
            })
            }
        </div>
      </div>
    </div>
  );
}

export default MapPage;