import { useEffect, useState } from "react";
import { faDownload, faUpload } from "@fortawesome/free-solid-svg-icons"

import PageHeader from "../../Text/PageHeader";
import ButtonIcon from "../../Buttons/ButtonIcon";
import StandardSearchField from "../../Input/StandardSearchField";
import SearchItem from "../../Buttons/SearchItem";
import StepHeader from "../../Text/StepHeader";
import StepSubHeader from "../../Text/StepSubHeader";
import StdButton from "../../Buttons/StdButton";
import StdDropButton from "../../Buttons/StdDropButton";

import { GovBody, Party } from "../../../AppContext";
import { getPartyData, searchGovBody, uploadParties } from "../../../api/representative";
import { processCsv } from "../../../functions/stdAppFunctions";
import { Message } from "../../../customIntefaces/AppTypes";
import StdText from "../../Text/StdText";

const GovBodyDataPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedGB, setSelectedGB] = useState<number|null>(null);
  const [govBodyList, setGovBodyList] = useState<Array<GovBody>>([]);
  const [getLoading, setGetLoading] = useState<boolean>(false);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [getMessage, setGetMessage] = useState<Message|null>();
  const [uploadMessage, setUploadMessage] = useState<Message|null>();

  const onSearchGovBody = async () => {
    let res:Array<GovBody> = await searchGovBody(searchTerm); 
    setSelectedGB(null);
    console.log(res);
    if(res)
    {
      setGovBodyList(res)
    }
  }

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearchGovBody();
  }

  const processFile = async(files:Array<File>) => { 
    try{
      setUploadLoading(true);
      setUploadMessage(null)
      let message:Message|null = null;

      let results = await processCsv(files);

      if(selectedGB)
      {
        let parties:Array<Party> = results as Array<Party>;

        message = await uploadParties(parties, selectedGB);
      
        setUploadMessage(message);
      }
      setUploadLoading(false);
    }
    catch(e)
    {
      console.log(e);
    }
  }

  const getData = async() => {
      setGetLoading(true);
      setGetMessage(null);
      let message:Message|null = null;

      if(selectedGB)
      {
        message = await getPartyData(selectedGB);
        setGetMessage(message);
      }

      setGetLoading(false);
  }

  const clear = () => {
    setGetMessage(null);
    setUploadMessage(null);
    setGetLoading(false);
    setUploadLoading(false);
  }

  return (
    <div style={{display:"flex"}}>
      <div style={{flex:1}}>
          {/*Title*/}
          <PageHeader>
              Edit Government Body Parties
          </PageHeader>
          <div style={{flexDirection:"row", display:"flex"}}>
            {/* Select Gov Body */}
            <div style={{width:"33.3%"}}>
              <StepHeader>1. Select Government Body</StepHeader>
              {/* Search Field */}
              <form onSubmit={handleSubmit}
                style={{paddingBottom:20}}
              >
                <StandardSearchField onEnter={onSearchGovBody} onChange={(e)=>{setSearchTerm(e.target.value)}}/>
              </form>
              {/* Select Results */}
              <div style={{flexDirection:"column", display:"flex"}}>
                {
                  govBodyList.map((g)=>{
                    return <SearchItem key={g.id} mainText={g.currentName} subText1={g.address} subText2={g.type} selected={g.id===selectedGB}
                    onClick={()=>{setSelectedGB(g.id);clear();}}/>; 
                  })
                }
              </div>
            </div>

            {/* Make Changes */}
            {selectedGB &&
              <div style={{width:"33.3%"}}>
                <StepHeader>2. Make Changes</StepHeader>
                <div style={{flexDirection:"column", display:"flex"}}>
                  {/*i*/}
                  <div style={{flexDirection:"row",display:"flex", paddingBottom:"10px"}}>
                    <div style={{width:25, display:"flex", justifyContent:"flex-end", marginRight:"5px"}}>
                      <StepSubHeader>i.</StepSubHeader>
                    </div> 
                    <StdButton message={getMessage} loading={getLoading} style={{padding:"10px 20px", width:400}}><span style={{paddingRight:10}} onClick={getData}>Download Existing Data</span><ButtonIcon icon={faDownload}/></StdButton> 
                  </div>
                  {/*ii*/}
                  <div style={{flexDirection:"row",display:"flex", paddingBottom:"10px"}}>
                    <div style={{width:25, display:"flex", justifyContent:"flex-end", marginRight:"5px"}}>
                      <StepSubHeader>ii.</StepSubHeader>
                    </div>
                    <div>
                      <StepSubHeader>Make Your Changes to csv file</StepSubHeader>
                      <StdText><span style={{fontWeight:"bold"}}>NOTE: </span>If parent party exists. Find id here.</StdText>
                    </div>
                  </div>
                  {/*iii*/}
                  <div style={{flexDirection:"row",display:"flex"}}>
                    <div style={{width:25, display:"flex", justifyContent:"flex-end", marginRight:"5px"}}>
                      <StepSubHeader>iii.</StepSubHeader>
                    </div>
                    <StdDropButton message={uploadMessage} loading={uploadLoading} style={{padding:"30px 20px", width:400}} dropFn={processFile}><span style={{paddingRight:10}}>Upload Existing Data</span><ButtonIcon icon={faUpload}/></StdDropButton> 
                  </div>
                </div>
              </div>
            }
          </div>
      </div>
    </div>
  );
}

export default GovBodyDataPage;