import { faEnvelope, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import React from "react";

import ButtonIcon from "../../Buttons/ButtonIcon";
import CustomIconButtonAlt from "../../Buttons/CustomIconButtonAlt";
import CardSubHeader from "../../Text/CardSubHeader";

import { RepTabProps } from "../../../customIntefaces/AppTypes";
import { call, mailTo } from "../../../functions/stdAppFunctions";
import appValues from "../../../resources/AppValues";

interface InfoProps  extends RepTabProps {
}

//Representative History
const InfoView:React.FC<InfoProps> = ({repData, reps, setReps}) => {


  return (
  <div>
    {/*Row 1 Representative Basic Data**/}
    <div style={{display:"flex"}}>
      {/*Col 1*/}
      <img src={repData.rep.photo ? repData.rep.photo : "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"} alt="Representative" width={appValues.subCardWidth} height={appValues.subCardWidth} style={{margin:"0px 10px 10px 0px", /*borderRadius:"50%", objectFit:"cover"*/ objectFit:"contain"}}/>
      {/*Col 2*/}
      <div style={{flex:1, justifyContent:"space-between", flexDirection:"column"}}>
        <CardSubHeader>{repData.rep.title+" "+repData.rep.firstName+" "+repData.rep.lastName}</CardSubHeader>
        <div>
          <div style={{paddingBottom:3}}>{repData.rep.birthDate ? "Birth Date: " + repData.rep.birthDate : "Birth Date Not Found"}</div>
          <div style={{paddingBottom:3}}>{repData.rep.gender ? repData.rep.gender : "Gender Not Found"}</div>
          <div style={{paddingBottom:3}}>{repData.rep.constituencyOffice ? repData.rep.constituencyOffice : "Address Not Found"}</div>
          <div style={{display:"flex", paddingTop:"10px"}}>
            <CustomIconButtonAlt style={{paddingRight:10}} onClick={()=>{mailTo(repData.rep.email)}}>
              <ButtonIcon icon={faEnvelope}/>
            </CustomIconButtonAlt>
            
            <CustomIconButtonAlt onClick={()=>{call(repData.rep.call)}}>
                <ButtonIcon icon={faPhoneAlt}/>
            </CustomIconButtonAlt>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default InfoView;