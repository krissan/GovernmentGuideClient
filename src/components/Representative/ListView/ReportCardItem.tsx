import React from "react";
import { useTheme } from "@material-ui/core";

import MiniSubHeader from "../../Text/MiniSubHeader";
import StdText from "../../Text/StdText";
import Grade from "../../Misc/Grade";

import { ReportCard, useAppContext  } from "../../../AppContext";

interface ReportCardItemProps {
  rptCard:ReportCard,
}

//Representative Card
const ReportCardItem:React.FC<ReportCardItemProps> = ({rptCard}) => {
  const theme = useTheme();
  const { orgMap } = useAppContext();

  return (
    <div key={rptCard.id}>
        <div style={{display:"flex", alignItems:"center"}}>
          <div style={{display:"flex", alignItems:"center"}}>
            <img src={orgMap.get(rptCard.orgId)?.orgIcon} alt={orgMap.get(rptCard.orgId)?.name} width="100px" height="100px" style={{margin:"0px 10px 10px 0px", /*borderRadius:"50%", objectFit:"cover"*/ objectFit:"contain"}}/>
            <MiniSubHeader style={{color:theme.palette.secondary.dark}}>{rptCard.name}</MiniSubHeader>
          </div>
          <Grade grade={rptCard.grade} />
        </div>
        <StdText>{rptCard.description}</StdText>
    </div>
  );
}

export default ReportCardItem;