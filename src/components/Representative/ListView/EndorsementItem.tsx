import React from "react";
import { useTheme } from "@material-ui/core";

import MiniSubHeader from "../../Text/MiniSubHeader";
import StdText from "../../Text/StdText";

import { Endorsement  } from "../../../AppContext";

interface EndorsementItemProps {
    endo:Endorsement,
}

//Representative Card
const EndorsementItem:React.FC<EndorsementItemProps> = ({endo}) => {
  const theme = useTheme();

  return (
    <div key={endo.orgId}>
        <MiniSubHeader style={{color:theme.palette.secondary.dark}}>{endo.orgId}</MiniSubHeader>
        <StdText>{endo.description}</StdText>
    </div>
  );
}

export default EndorsementItem;