import { useState } from "react";
import { faUpload } from "@fortawesome/free-solid-svg-icons"
import axios from "axios";

import PageHeader from "../../Text/PageHeader";
import ButtonIcon from "../../Buttons/ButtonIcon";
import StdDropButton from "../../Buttons/StdDropButton";
import PageSection from "../../Misc/PageSection";

import { processCsv } from "../../../functions/stdAppFunctions";
import { Message } from "../../../customIntefaces/AppTypes";
import { messageType } from "../../../customIntefaces/Enumerators";
import { PartyData } from "../../../customIntefaces/APITypes";

interface PartyCustom {
  EventNameFrench:string,	
  EventNameEnglish:string,	
  PoliticalInterestCode:string,	
  PartyFullNameEnglish:string,	
  PartyFullNameFrench:string,	
  IsRegistered:number
}

/*this is just for grabbing past election data*/
const PartyDataCustomPage = () => {
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [uploadMessage, setUploadMessage] = useState<Message|null>();

  const clear = () => {
    setUploadMessage(null);
    setUploadLoading(false);
  }

  async function uploadData(rows:Array<PartyData>, govBodyId:number):Promise<Message> { 
    let message:Message= {type:messageType.success, msg: "" };
    clear();

    try{
      const requestParam = {govBodyId: govBodyId, parties:rows.filter((x)=>{return !(x.name == null)})};
      console.log(requestParam);
  
      await axios.request({
          method: 'post',
          url: 'http://localhost:8080/api/v1/party/govbody',
          data: requestParam,
          headers: {
            'Content-Type':'application/json'
          },
      });
    }
    catch(e)
    {
      message = {type:messageType.error, msg: "Error Uploading Parties"}
    }
  
    return message;
  }

  const processFile = async(files:Array<File>) => { 
    try{
      setUploadLoading(true);
      setUploadMessage(null)
      let message:Message|null = null;

      let results = await processCsv(files);

      let rows:Array<PartyCustom> = results as Array<PartyCustom>;

      let partyDataList:Array<PartyData> = rows.map((r)=>{
        return {
          parentId:null,
          name: r.PartyFullNameEnglish,
          shortName:r.PoliticalInterestCode,
          description:null,
          partyColor:null,
          partyImage:null
        } as PartyData
      });

      message = await uploadData(partyDataList, 3)

      setUploadMessage(message);
      setUploadLoading(false);
    }
    catch(e)
    {
      console.log(e);
    }
  }

  return (
    <div style={{display:"flex"}}>
      <div style={{flex:1}}>
          {/*Title*/}
          <PageHeader>
              Upload Ontario Party Data
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

export default PartyDataCustomPage;