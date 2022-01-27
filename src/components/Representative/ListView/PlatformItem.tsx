import React from "react";
import { useTheme } from "@material-ui/core";

import MiniSubHeader from "../../Text/MiniSubHeader";
import StdText from "../../Text/StdText";
import Status from "../../Misc/Status";

import { Platform  } from "../../../AppContext";

interface PlatformItemProps {
  plat:Platform,
}

//Representative Card
const PlatformItem:React.FC<PlatformItemProps> = ({plat}) => {
  const theme = useTheme();

  return (
  <div key={plat?.name}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <MiniSubHeader style={{color:theme.palette.secondary.dark}}>{plat?.name}</MiniSubHeader>
          {/*if status exists for platform display it*/
          plat?.status && <Status status={plat.status}/>}
      </div>
      <StdText>{plat?.description}</StdText>
  </div>
  );
}

export default PlatformItem;