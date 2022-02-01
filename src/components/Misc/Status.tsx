import React, {useEffect, useState} from "react";

import { platformStatus } from "../../customIntefaces/Enumerators";
import { palette } from "../../customIntefaces/Palette";


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
    <div style={{ border:"2px solid", borderColor:statusInfo.color, fontWeight:"bold", color:statusInfo.color, fontSize:13, padding:"2px 5px"}}>{statusInfo.text}</div>
  );
}

export default Status;