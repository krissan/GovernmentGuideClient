import { useState } from "react";
import { faUpload } from "@fortawesome/free-solid-svg-icons"

import PageHeader from "../../Text/PageHeader";
import ButtonIcon from "../../Buttons/ButtonIcon";
import PageSection from "../../Misc/PageSection";
import StdDropButton from "../../Buttons/StdDropButton";

import { processCsv } from "../../../functions/stdAppFunctions";
import { Message } from "../../../customIntefaces/AppTypes";
import { convertyyyyMMMddToyyyymmdd } from "../../../functions/convertFunctions";
import { uploadCustomEleCanData } from "../../../api/election";

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

  const processFile = async(files:Array<File>) => { 
    try{
      clear();
      setUploadLoading(true);
      let message:Message|null = null;

      let results = await processCsv(files);

      let rows:Array<ImportCandidates> = results as Array<ImportCandidates>;

      rows = rows.filter((x)=>{return typeof x.PollingDate !== "undefined"}).map((x) => { 
        console.log(x.PollingDate);
        x.PollingDate = convertyyyyMMMddToyyyymmdd(x.PollingDate); 
        return x;})

      message = await uploadCustomEleCanData(rows, 3)

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