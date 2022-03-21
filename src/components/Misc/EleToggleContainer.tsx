import { useState } from "react";

import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import DisputeButton from "../Buttons/DisputeButton";
import PlatformsView from "../Representative/ListView/PlatformsListView";
import ReportCardsView from "../Representative/ListView/ReportCardsListView";
import EndorsementsView from "../Representative/ListView/EndorsementsListView";
import HistoryView from "../Representative/ListView/HistoryView";

import useStyles from './styles';
import { mailTo, call } from "../../functions/stdAppFunctions";
import { eleTabEnum, eleTabs, eleTabType} from "../../customIntefaces/TabType";
import { StdProps } from "../../customIntefaces/StdProps";
import { ElectionCandidateRepPartyItem } from "../Pages/ElectionPage";
import { useTheme } from "@material-ui/core";
import InfoView from "../Representative/ListView/InfoView";

interface ETCProps extends StdProps {
  eleCans:Map<number, ElectionCandidateRepPartyItem>     ,
  setEleCans:(c: Map<number, ElectionCandidateRepPartyItem>) => void
}

//Representative Advanced Info
const EleToggleContainer:React.FC<ETCProps> = ({eleCans, setEleCans, style}) => {
    const classes = useStyles();
    const theme = useTheme();
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
    const showTab = (eleCan:ElectionCandidateRepPartyItem) =>{
      //biography and key votes
      if(tab.id === eleTabEnum.History)
      {
        return <HistoryView repData={eleCan} reps={eleCans} setReps={setEleCans}/>
      }
      //platform
      else if(tab.id === eleTabEnum.Platform)
      {
        return <PlatformsView repData={eleCan} reps={eleCans} setReps={setEleCans}/>
      }
      //report card
      else if(tab.id === eleTabEnum.ReportCard)
      {
        return <ReportCardsView repData={eleCan} reps={eleCans} setReps={setEleCans}/>
      }
      else if(tab.id === eleTabEnum.Info)
      {
        return <InfoView repData={eleCan} reps={eleCans} setReps={setEleCans}/>
      }
      else
      {
        return <EndorsementsView repData={eleCan} reps={eleCans} setReps={setEleCans}/>
      }
      //timeline
      //else if(tab === "time line"){
       // return 
      //}
    }

    const sendMessage = () => {
      setDisputeLoading(true);
      //MailTo("email@email.com", "Dispute election" + repBoundary.boundary.id + ":" + repBoundary.boundary.boundaryName + " " + tab.name, "content");
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
            {eleTabs.map((tab)=>{
              return <ToggleButton style={{minWidth:"200px"}} key={tab.id} value={tab}>{tab.name}</ToggleButton>
            })}
        </ToggleButtonGroup>
        <div style={{width:"90vw"}}>
          <div style={{display:"flex", overflowX:"auto", padding:"0px 0px 30px 0px"}}>
              {
                [...eleCans].map(([key, value]) => 
                <div hidden={!value.toggled}>
                  <div style={{display:"flex", fontWeight:"bold", height:"50px", backgroundColor: value.party.partyColor ? '#'+value.party.partyColor : theme.palette.primary.dark, color:theme.palette.primary.contrastText, justifyContent:"center", alignItems:"center"}}>
                    {value.party.shortName+": "+value.rep.firstName+" "+value.rep.lastName}
                  </div>
                  <div style={{display:"flex", flexDirection:"row", borderRight:"2px solid "+theme.palette.primary.dark, borderBottom:"2px solid "+theme.palette.primary.dark}}>
                    <div style={{minWidth:"500px", height:"300px", display:"flex", justifyContent:"space-between", flexDirection:"column", padding:"10px 10px 20px 10px"}}>
                      {showTab(value)}
                      <div style={{display:"flex", justifyContent:"flex-end"}}>
                        <DisputeButton loading={disputeLoading} onClick={()=>sendMessage()} />
                      </div>
                    </div>
                  </div>
                </div>
                )
              }
          </div>
        </div>
    </div>
  );
}

export default EleToggleContainer;