import { useState } from "react";

import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { RepBoundary } from "../../AppContext";
import DisputeButton from "../Buttons/DisputeButton";
import BiographyView from "../Representative/ListView/BiographyListView";
import PlatformsView from "../Representative/ListView/PlatformsListView";
import ReportCardsView from "../Representative/ListView/ReportCardsListView";
import EndorsementsView from "../Representative/ListView/EndorsementsListView";

import useStyles from './styles';
import { MailTo } from "../../functions/stdAppFunctions";
import { repTabEnum, repTabs, repTabType } from "../../CustomIntefaces/TabType";


interface TCProps {
  repBoundary:RepBoundary,
}

//Representative Advanced Info
const ToggleContainer:React.FC<TCProps> = ({repBoundary}) => {
    const classes = useStyles();
    const [tab, setTab] = useState<repTabType>(repTabs[0]);
    const [disputeLoading, setDisputeLoading] = useState<boolean>(false);

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
      if(tab.id === repTabEnum.Biography)
      {
        return <BiographyView repBoundary={repBoundary}/>
      }
      //report card
      else if(tab.id === repTabEnum.Platform)
      {
        return <PlatformsView repBoundary={repBoundary}/>
      }
      else if(tab.id === repTabEnum.ReportCard)
      {
        return <ReportCardsView repBoundary={repBoundary}/>
      }
      else
      {
        return <EndorsementsView repBoundary={repBoundary}/>
      }
      //timeline
      //else if(tab === "time line"){
       // return 
      //}
    }

    const sendMessage = () => {
      setDisputeLoading(true);
      MailTo("email@email.com", "Dispute " + repBoundary.boundary.id + ":" + repBoundary.boundary.boundaryName + " " + tab.name, "content");
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
            {/*ToggleButton  value="time line">Time Line</ToggleButton>*/}
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