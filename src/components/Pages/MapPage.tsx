import { useRef, useState } from "react";
import { LoadScript } from "@react-google-maps/api";
import { useMediaQuery, useTheme } from "@material-ui/core";
import { ScaleLoader } from "react-spinners";

import AddressBar from "../Map/AddressBar";
import SubHeader from "../Text/SubHeader";
import RepresentativeCard from "../Cards/RepresentativeCard";
import { searchRepresentatives } from "../../api/representative";
import {  RepBoundary, useAppContext } from "../../AppContext";
import MapAlt from "../Map/MapAlt";
import appValues from "../../resources/AppValues";
import useWindowDimensions from "../../customHooks/useWindowDimensions";

//Interfaces and settings for google-maps
type Libraries = ("drawing" | "geometry" | "localContext" | "places" | "visualization")[];
const libraries:Libraries = ["places", "geometry"]

const MapPage = () => {
  //App Context
  const { repBoundaries, setRepBoundaries, userAddr, setUserAddr } = useAppContext();
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const theme = useTheme();
  const [address, setAddress] = useState<google.maps.places.Autocomplete>();
  const [boundaryToggled, setBoundaryToggled] = useState<RepBoundary|null>(repBoundaries.size > 0 ? Array.from(repBoundaries.values())[0] : null);
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  //Height and Width of window
  const { height } = useWindowDimensions();
  //Distance from right and bottom of screen
  const offsetY:number = ref.current?.offsetTop ? ref.current?.offsetTop : 200;

  //update list height
  //useEffect(()=>{console.log(repBoundaries);console.log(infoEnum.representative)},[repBoundaries]);

  //Address AutoComplete Text Change, Input Selected Functions
  const onTextChange = (addr: google.maps.places.Autocomplete) => setAddress(addr);

  const onPlaceChanged = async () => {
    setLoadingData(true);

    const lat = address?.getPlace()?.geometry?.location?.lat();
    const lng = address?.getPlace()?.geometry?.location?.lng();
    let newAddr:google.maps.LatLngLiteral = userAddr;

    if(lat && lng)
    {
      newAddr = {lat: lat, lng: lng};
      setUserAddr({ lat: lat, lng: lng });
    }

    //get representative data
    if(address?.getPlace()?.geometry?.location)
    {
      let searchedRepBoundaries:Map<number, RepBoundary> = await searchRepresentatives(newAddr);
      
      setRepBoundaries(new Map<number, RepBoundary>());
      setRepBoundaries(searchedRepBoundaries);
    }
    else
    {
      alert("Valid address not selected");
    }

    setLoadingData(false);
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
          <div style={isMobile ? {margin:"0px " + appValues.pageMargin + "px"} : {}}>
            <AddressBar onPlaceChanged={onPlaceChanged} onTextChange={onTextChange} />
          </div>
          {/*Col 2 dummy space*/}
          <div style={{width:appValues.sideListWidth}}>
          </div>
        </div>
        {isMobile ?
          <>
            <div style={{display:"flex", flexDirection:"column"}}>      
              {/*Row 2*/}
              <div style={{flex:1}}>
                <MapAlt boundaryToggled={boundaryToggled} setBoundaryToggled={setBoundaryToggled} repLoading={loadingData} />
              </div>
              {/*Row 3*/}        
              {(loadingData || repBoundaries.size > 0) &&
                <div>
                    <div style={{display:"flex",justifyContent:"center", paddingTop:"15px", backgroundColor:theme.palette.primary.dark}}>
                      <SubHeader style={{color:theme.palette.primary.contrastText}}>REPRESENTATIVES</SubHeader>
                    </div>
                    {/* If data is loading display side */}
                    {loadingData ?
                      <div style={{display:"flex", height:"100%", justifyContent:"center", alignItems:"center"}}>
                        <ScaleLoader color={theme.palette.primary.dark} />
                      </div>
                      : 
                      <div style={{scrollBehavior: "smooth", height:height - offsetY, overflowY:"scroll"}} ref={ref}>
                        {  
                          Array.from(repBoundaries.values(), (rb:RepBoundary) => <RepresentativeCard repBoundary={rb} key={rb.rep.id} boundaryToggled={boundaryToggled} setBoundaryToggled={setBoundaryToggled}/>)
                        }
                      </div>
                    }
                </div>
              }
            </div>
          </>
          :
          <>
            {/*Row 2*/}
            <div style={{display:"flex"}}>      
              {/*Col 1*/}
              <div style={{flex:1}}>
                <MapAlt boundaryToggled={boundaryToggled} setBoundaryToggled={setBoundaryToggled} repLoading={loadingData} />
              </div>
              {/*Col 2*/}        
              {(loadingData || repBoundaries.size > 0) &&
                <div style={{width:appValues.sideListWidth, paddingLeft:20}}>
                    <div style={{display:"flex",justifyContent:"center"}}>
                      <SubHeader>REPRESENTATIVES</SubHeader>
                    </div>
                    {/* If data is loading display side */}
                    {loadingData ?
                      <div style={{display:"flex", height:"100%", justifyContent:"center", alignItems:"center"}}>
                        <ScaleLoader color={theme.palette.primary.dark} />
                      </div>
                      : 
                      <div style={{scrollBehavior: "smooth", height:height - offsetY, overflowY:"scroll"}} ref={ref}>
                        {  
                          Array.from(repBoundaries.values(), (rb:RepBoundary) => <RepresentativeCard repBoundary={rb} key={rb.rep.id} boundaryToggled={boundaryToggled} setBoundaryToggled={setBoundaryToggled}/>)
                        }
                      </div>
                    }
                </div>
              }
            </div>
          </>
        }
      </LoadScript>
    </div>
  );
}

export default MapPage;