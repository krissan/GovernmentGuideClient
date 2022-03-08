import { useState } from "react";
import { faUpload } from "@fortawesome/free-solid-svg-icons"

import PageHeader from "../../Text/PageHeader";
import ButtonIcon from "../../Buttons/ButtonIcon";

import StdDropButton from "../../Buttons/StdDropButton";

import { processCsv } from "../../../functions/stdAppFunctions";
import { Message } from "../../../customIntefaces/AppTypes";
import PageSection from "../../Misc/PageSection";
import { messageType } from "../../../customIntefaces/Enumerators";
import axios from "axios";
import { convertyyyyMMMddToyyyymmdd } from "../../../functions/convertFunctions";

interface ImportCandidates {
  EventNameEnglish:string,
  EventNameFrench:string,	
  IsGeneralElection: number,	
  ElectoralDistrictNumber: number,
  ElectoralDistrictNameEnglish:string,	
  ElectoralDistrictNameFrench: string,
  ReturningOfficerName: string,
  ReturningOfficeCity: string,
  PollingDate: string,
  ResignedMPPName: string,
  NameOfCandidates: string,
  PoliticalInterestCode: string,
  TotalValidBallotsCast:	number,
  PercentOfTotalValidBallotsCast: number,	
  Plurality: number,
  IsMemberOfPreviousLegislature: number

}

/*this is just for grabbing past election data*/
const ValidVoteCastDataPage = () => {
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [uploadMessage, setUploadMessage] = useState<Message|null>();

  const clear = () => {
    setUploadMessage(null);
    setUploadLoading(false);
  }

  async function uploadData(rows:Array<ImportCandidates>, govBodyId:number):Promise<Message> { 
    let message:Message= {type:messageType.success, msg: "" };
    clear();
    
    try{
      const requestParam = {govBodyId: govBodyId, electionCustomDatas:rows.filter((x)=>{return !(x.ElectoralDistrictNameEnglish == null)})};
  
      console.log(requestParam);
  
      var x:Array<ImportCandidates> = await axios.request({
          method: 'post',
          url: 'http://localhost:8080/api/v1/election/populate',
          data: requestParam,
          headers: {
            'Content-Type':'application/json'
          },
      });

      console.log("rejected rows")
      console.log(x);
    }
    catch(e)
    {
      message = {type:messageType.error, msg: "Error Uploading Election Data"}
    }
  
    return message;
  }

  const processFile = async(files:Array<File>) => { 
    try{
      setUploadLoading(true);
      setUploadMessage(null)
      let message:Message|null = null;

      let results = await processCsv(files);

      let rows:Array<ImportCandidates> = results as Array<ImportCandidates>;

      rows = rows.filter((x)=>{return typeof x.PollingDate !== "undefined"}).map((x) => { 
        console.log(x.PollingDate);
        x.PollingDate = convertyyyyMMMddToyyyymmdd(x.PollingDate); 
        return x;})

      message = await uploadData(rows, 3)

      setUploadMessage(message);
    }
    catch(e)
    {
      console.log(e);
    }
    setUploadLoading(false);
  }

  return (
    <div style={{display:"flex"}}>
      <div style={{flex:1}}>
          {/*Title*/}
          <PageHeader>
              Edit Ontario Candidate Vote Data
          </PageHeader>
          <div style={{flexDirection:"row", display:"flex"}}>
            {/* Select Gov Body */}
            <PageSection>
              <StdDropButton message={uploadMessage} loading={uploadLoading} style={{padding:"30px 20px"}} dropFn={processFile}><span style={{paddingRight:10}}>Upload Existing Data</span><ButtonIcon icon={faUpload}/></StdDropButton> 
            </PageSection>
          </div>
      </div>
    </div>
  );
}

export default ValidVoteCastDataPage;