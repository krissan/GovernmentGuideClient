import { useEffect, useRef, useState } from "react";
import { LoadScript, useLoadScript } from "@react-google-maps/api";

import AddressBar from "../Map/AddressBar";
import SubHeader from "../Text/SubHeader";
import RepresentativeCard from "../Cards/RepresentativeCard";
import { searchRepresentatives } from "../../api/representative";
import {  RepBoundary, useAppContext } from "../../AppContext";
import MapAlt from "../Map/MapAlt";
import appValues from "../../resources/AppValues";
import useWindowDimensions from "../../customHooks/useWindowDimensions";
import { infoEnum } from "../../CustomIntefaces/Enumerators";

//Interfaces and settings for google-maps
type Libraries = ("drawing" | "geometry" | "localContext" | "places" | "visualization")[];
const libraries:Libraries = ["places", "geometry"]

const MapPage = () => {
  //App Context
  const { repBoundaries, setRepBoundaries, userAddr, setUserAddr, selectedListKey, hoveredListKey } = useAppContext();

  const [address, setAddress] = useState<google.maps.places.Autocomplete>();
  const [boundaryToggled, setBoundaryToggled] = useState<RepBoundary|null>(repBoundaries[0]);
  const ref = useRef<HTMLDivElement>(null);

  //Height and Width of window
  const { height } = useWindowDimensions();
  //Distance from right and bottom of screen
  const offsetY:number = ref.current?.offsetTop ? ref.current?.offsetTop : 0;

  //UseEffect
  useEffect(()=>{console.log(repBoundaries);console.log(infoEnum.representative)},[repBoundaries]);

  //Address AutoComplete Text Change, Input Selected Functions
  const onTextChange = (addr: google.maps.places.Autocomplete) => setAddress(addr);

  const onPlaceChanged = async () => {
    const lat = address?.getPlace()?.geometry?.location?.lat();
    const lng = address?.getPlace()?.geometry?.location?.lng();
    let newAddr:google.maps.LatLngLiteral = userAddr;

    if(lat && lng)
    {
      newAddr = {lat: lat, lng: lng};
      setUserAddr({ lat: lat, lng: lng });
    }

    //get representative data
    let searchedRepBoundaries:Array<RepBoundary> = await searchRepresentatives(newAddr);
    console.log(searchedRepBoundaries);

    setRepBoundaries(searchedRepBoundaries);
  }

  return (
    <div style={{display:"flex", flexDirection:"column"}}>
      {/* Load Google Maps Api */}
      <LoadScript
        id="script-loader"
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY ? process.env.REACT_APP_GOOGLE_MAPS_API_KEY : ""}
        language="en"
        region="us"
        libraries={libraries}
      >
        {/*Row 1*/}
        <div style={{display:"flex"}}>
          {/*Col 1*/}
          <div style={{display:"flex", flex:1, alignItems: "center", flexDirection:"column"}}>
            <AddressBar onPlaceChanged={onPlaceChanged} onTextChange={onTextChange} />
          </div>
          {/*Col 2*/}
          <div style={{width:appValues.sideListWidth}}>

          </div>
        </div>
        {/*Row 2*/}
        <div style={{display:"flex"}}>        
          {/*Col 1*/}
          <div style={{flex:1}}>
            <MapAlt boundaryToggled={boundaryToggled} setBoundaryToggled={setBoundaryToggled} />
          </div>
          {/*Row 2*/}        
          {repBoundaries.length > 0 &&
            <div style={{width:appValues.sideListWidth, paddingLeft:20, scrollBehavior: "smooth", height:height-offsetY, overflowY:"auto"}} ref={ref}>
                <div style={{display:"flex",justifyContent:"center"}}>
                  <SubHeader>REPRESENTATIVES</SubHeader>
                </div>
                { repBoundaries.map((rb:RepBoundary)=>{
                  return <RepresentativeCard repBoundary={rb} key={rb.rep.id} hovered={hoveredListKey === rb.rep.id} selected={selectedListKey === rb.rep.id} boundaryToggled={boundaryToggled} setBoundaryToggled={setBoundaryToggled}/>
                })}
            </div>
          }
        </div>
      </LoadScript>
    </div>
  );
}

export default MapPage;