import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import { RepBoundary } from "../../AppContext";
import BiographyView from "../Cards/BiographyView";
import EndorsementsView from "../Cards/EndorsementsView";
import PlatformsView from "../Cards/PlatformsView";
import ReportCardsView from "../Cards/ReportCardsView";

import useStyles from './styles';

interface TCProps {
  repBoundary:RepBoundary,
}

enum tabEnum {
  platform,
  reportCard,
  biography,
  endorsement
}

//Representative Advanced Info
const ToggleContainer:React.FC<TCProps> = ({repBoundary}) => {
    const classes = useStyles();
    const [tab, setTab] = useState<tabEnum>(tabEnum.platform);

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newTab: tabEnum
      ) => {
      if(newTab != null)
      {
        setTab(newTab);
      }
    }

    //decide which tab to display
    const showTab = () =>{
      //platform
      if(tab === tabEnum.platform)
      {
        return <PlatformsView repBoundary={repBoundary}/>
      }
      //report card
      else if(tab === tabEnum.reportCard)
      {
        return <ReportCardsView repBoundary={repBoundary}/>
      }
      //biography
      else if(tab === tabEnum.biography)
      {
        return <BiographyView repBoundary={repBoundary}/>
      }
      else if(tab === tabEnum.endorsement)
      {
        return <EndorsementsView repBoundary={repBoundary}/>
      }
      //timeline
      //else if(tab === "time line"){
       // return 
      //}
      //endorsements
      else
      {
        return <PlatformsView repBoundary={repBoundary}/>
      }
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
            <ToggleButton  value={tabEnum.platform}>Platform</ToggleButton>
            <ToggleButton  value={tabEnum.reportCard}>Report Card</ToggleButton>
            <ToggleButton  value={tabEnum.biography}>Biography</ToggleButton>
            <ToggleButton  value={tabEnum.endorsement}>Endorsements</ToggleButton>
        </ToggleButtonGroup>
        <div style={{paddingLeft:20}}>
        {
          showTab()
        }
        </div>
    </div>
  );
}

export default ToggleContainer;