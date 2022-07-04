import React from "react";
import { useTheme } from "@material-ui/core";

import MiniSubHeader from "../../Text/MiniSubHeader";
import StdText from "../../Text/StdText";

import { Endorsement, useAppContext  } from "../../../AppContext";

interface EndorsementItemProps {
    endo:Endorsement,
}

//Representative Card
const EndorsementItem:React.FC<EndorsementItemProps> = ({endo}) => {
  const theme = useTheme();
  const { orgMap } = useAppContext();

  return (
    <div key={endo.orgId}>
      <div style={{display:"flex", alignItems:"center"}}>
        <img src={orgMap.get(endo.orgId)?.orgIcon} alt={orgMap.get(endo.orgId)?.name} width="100px" height="100px" style={{margin:"0px 10px 10px 0px", /*borderRadius:"50%", objectFit:"cover"*/ objectFit:"contain"}}/>
        <MiniSubHeader style={{color:theme.palette.secondary.dark}}>{orgMap.get(endo.orgId)?.name.toLocaleUpperCase()}</MiniSubHeader>
      </div>
      <StdText>{endo.description}</StdText>
    </div>
  );
}

export default EndorsementItem;