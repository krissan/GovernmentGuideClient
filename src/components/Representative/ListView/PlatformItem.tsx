import React from "react";
import { useTheme } from "@material-ui/core";

import MiniSubHeader from "../../Text/MiniSubHeader";
import StdText from "../../Text/StdText";
import Status from "../../Misc/Status";

import { Platform, useAppContext  } from "../../../AppContext";

interface PlatformItemProps {
  plat:Platform,
}

//Representative Card
const PlatformItem:React.FC<PlatformItemProps> = ({plat}) => {
  const theme = useTheme();
  const { orgMap } = useAppContext();

  return (
  <div key={plat?.name}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <div style={{display:"flex", alignItems:"center"}}>
            <img src={orgMap.get(plat.orgId)?.orgIcon} alt={orgMap.get(plat.orgId)?.name} width="100px" height="100px" style={{margin:"0px 10px 10px 0px", /*borderRadius:"50%", objectFit:"cover"*/ objectFit:"contain"}}/>
            <MiniSubHeader style={{color:theme.palette.secondary.dark}}>{plat?.name}</MiniSubHeader>
          </div>
          {/*if status exists for platform display it*/
          plat?.status && <Status status={plat.status}/>}
      </div>
      <StdText>{plat?.description}</StdText>
  </div>
  );
}

export default PlatformItem;