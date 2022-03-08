import { useState } from "react";

import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import DisputeButton from "../Buttons/DisputeButton";
import PlatformsView from "../Representative/ListView/PlatformsListView";
import ReportCardsView from "../Representative/ListView/ReportCardsListView";
import EndorsementsView from "../Representative/ListView/EndorsementsListView";
import HistoryView from "../Representative/ListView/HistoryView";

import useStyles from './styles';
import { MailTo } from "../../functions/stdAppFunctions";
import { eleTabEnum, eleTabs, eleTabType} from "../../customIntefaces/TabType";
import { ElectionCandidate, ElectionCandidateData } from "../../customIntefaces/APITypes";
import { StdProps } from "../../customIntefaces/StdProps";

interface ETCProps extends StdProps {
  eleCans:Array<ElectionCandidateData>,
}

//Representative Advanced Info
const EleToggleContainer:React.FC<ETCProps> = ({eleCans, style}) => {
    const classes = useStyles();
    const [tab, setTab] = useState<eleTabType>(eleTabs[0]);
    const [disputeLoading, setDisputeLoading] = useState<boolean>(false);

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newTab: eleTabType
      ) => {
      if(newTab != null)
      {
        setTab(newTab);
      }
    }

    //decide which tab to display
    const showTab = () =>{
      return "hello";
      //info
      if(tab.id === eleTabEnum.Info)
      {
        //return <HistoryView repBoundary={repBoundary}/>
      }
      //platform
      if(tab.id === eleTabEnum.History)
      {
        //return <HistoryView repBoundary={repBoundary}/>
      }
      //report card
      else if(tab.id === eleTabEnum.Platform)
      {
        //return <PlatformsView repBoundary={repBoundary}/>
      }
      else if(tab.id === eleTabEnum.ReportCard)
      {
        //return <ReportCardsView repBoundary={repBoundary}/>
      }
      else
      {
        //return <EndorsementsView repBoundary={repBoundary}/>
      }
      //timeline
      //else if(tab === "time line"){
       // return 
      //}
    }

    const sendMessage = () => {
      setDisputeLoading(true);
      //MailTo("email@email.com", "Dispute " + repBoundary.boundary.id + ":" + repBoundary.boundary.boundaryName + " " + tab.name, "content");
      setDisputeLoading(false);
    }

  return (
    <div style={style}>
        <ToggleButtonGroup
            value={tab}
            exclusive
            onChange={handleChange}
            classes={{root: classes.StdToggleContainer}}
            >
            {/*ToggleButton  value="time line">Time Line</ToggleButton>*/}
            {eleTabs.map((tab)=>{
              return <ToggleButton style={{minWidth:"200px"}} key={tab.id} value={tab}>{tab.name}</ToggleButton>
            })}
        </ToggleButtonGroup>
        <div style={{paddingLeft:20, height:200, display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
          <div style={{display:"flex", scrollBehavior:"smooth", overflowY:"auto"}}>
          {
              showTab()            
          }
          </div>
          <div style={{display:"flex", justifyContent:"flex-end"}}>
            <DisputeButton loading={disputeLoading} onClick={()=>sendMessage()} />
          </div>
        </div>
    </div>
  );
}

export default EleToggleContainer;