import React, {useEffect, useState} from "react";

import useStyles from './styles';
import { platformStatus } from "../../CustomIntefaces/Enumerators";
import { palette } from "../../CustomIntefaces/Palette";

interface StatusProps {
  status:platformStatus
}

const statusData = [
  {text:"COMPLETED", color: palette.success.main},
  {text:"IN PROGRESS", color: palette.warning.main},
  {text:"DROPPED", color: palette.error.main},
  {text:"NOT STARTED", color:palette.secondary.main}
 ];

//Category Grade and Letter
const Status:React.FC<StatusProps> = ({status}) => {
  const [statusInfo, setStatusInfo] = useState(statusData[0]);

  useEffect(() => {
    if(platformStatus.COMPLETED){
      setStatusInfo(statusData[0])
    }
    else if(platformStatus.IN_PROGRESS){
      setStatusInfo(statusData[1])
    }
    else if(platformStatus.DROPPED){
      setStatusInfo(statusData[2])
    }
    else if(platformStatus.NOT_STARTED){
      setStatusInfo(statusData[3])
    }
  }, [status])





  return (
    <div style={{backgroundColor:statusInfo.color, fontWeight:"bold", color:palette.primary.contrastText, fontSize:12, padding:5}}>{statusInfo.text}</div>
  );
}

export default Status;