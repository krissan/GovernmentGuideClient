import { useState } from "react";

import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { RepBoundary, useAppContext } from "../../AppContext";
import DisputeButton from "../Buttons/DisputeButton";
import PlatformsView from "../Representative/ListView/PlatformsListView";
import ReportCardsView from "../Representative/ListView/ReportCardsListView";
import EndorsementsView from "../Representative/ListView/EndorsementsListView";

import useStyles from './styles';
import { mailTo } from "../../functions/stdAppFunctions";
import { repTabEnum, repTabs, repTabType } from "../../customIntefaces/TabType";
import HistoryView from "../Representative/ListView/HistoryView";


interface TCProps {
  repBoundary:RepBoundary,
}

//Representative Advanced Info
const ToggleContainer:React.FC<TCProps> = ({repBoundary}) => {
    const classes = useStyles();
    const [tab, setTab] = useState<repTabType>(repTabs[0]);
    const [disputeLoading, setDisputeLoading] = useState<boolean>(false);
    const { repBoundaries, setRepBoundaries } = useAppContext();

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newTab: repTabType
      ) => {
      if(newTab != null)
      {
        setTab(newTab);
      }
    }

    //decide which tab to display
    const showTab = () =>{
      //platform
      if(tab.id === repTabEnum.History)
      {
        return <HistoryView repData={repBoundary} reps={repBoundaries} setReps={setRepBoundaries}/>
      }
      //report card
      else if(tab.id === repTabEnum.Platform)
      {
        return <PlatformsView repData={repBoundary} reps={repBoundaries} setReps={setRepBoundaries}/>
      }
      else if(tab.id === repTabEnum.ReportCard)
      {
        return <ReportCardsView repData={repBoundary} reps={repBoundaries} setReps={setRepBoundaries}/>
      }
      else
      {
        return <EndorsementsView repData={repBoundary} reps={repBoundaries} setReps={setRepBoundaries}/>
      }
      //timeline
      //else if(tab === "time line"){
       // return 
      //}
    }

    const sendMessage = () => {
      setDisputeLoading(true);
      mailTo("email@email.com", "Dispute representative boundary" + repBoundary.boundary?.id + ":" + repBoundary.boundary?.boundaryName + " " + tab.name, "content");
      setDisputeLoading(false);
    }

  return (
    <div>
        <ToggleButtonGroup
            value={tab}
            exclusive
            onChange={handleChange}
            classes={{root: classes.StdToggleContainer}}
            >
            {repTabs.map((tab)=>{
              return <ToggleButton key={tab.id} value={tab}>{tab.name}</ToggleButton>
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

export default ToggleContainer;