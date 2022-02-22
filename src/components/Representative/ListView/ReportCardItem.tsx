import React, { useEffect } from "react";
import { useTheme } from "@material-ui/core";

import MiniSubHeader from "../../Text/MiniSubHeader";
import StdText from "../../Text/StdText";
import Grade from "../../Misc/Grade";

import { ReportCard  } from "../../../AppContext";

interface ReportCardItemProps {
  rptCard:ReportCard,
}

//Representative Card
const ReportCardItem:React.FC<ReportCardItemProps> = ({rptCard}) => {
  const theme = useTheme();


  return (
    <div key={rptCard.id}>
        <div style={{display:"flex", alignItems:"center"}}>
            <MiniSubHeader style={{color:theme.palette.secondary.dark}}>{rptCard.name}</MiniSubHeader>
            <Grade grade={rptCard.grade} />
        </div>
        <StdText>{rptCard.description}</StdText>
    </div>
  );
}

export default ReportCardItem;