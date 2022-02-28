import { useEffect, useState } from "react";
import { faDownload, faUpload } from "@fortawesome/free-solid-svg-icons"

import PageHeader from "../../Text/PageHeader";
import ButtonIcon from "../../Buttons/ButtonIcon";
import SearchItem from "../../Buttons/SearchItem";
import StepHeader from "../../Text/StepHeader";
import StepSubHeader from "../../Text/StepSubHeader";
import StdButton from "../../Buttons/StdButton";
import StdDropButton from "../../Buttons/StdDropButton";
import StdText from "../../Text/StdText";
import SearchGovBodyForm from "../../Forms/SearchGovBodyForm";
import SearchElectionForm from "../../Forms/SearchElectionForm";
import SearchElectionRidingForm from "../../Forms/SearchElectionRidingForm";

import { processCsv } from "../../../functions/stdAppFunctions";
import { Message } from "../../../customIntefaces/AppTypes";
import { getElectionCandidateData, getElectionRepresentativesData, uploadElectionCandidates } from "../../../api/election";
import { uploadRepresentatives } from "../../../api/representative";
import { ElectionCandidateData, RepresentativeData } from "../../../customIntefaces/APITypes";
import PageSection from "../../Misc/PageSection";

interface EditOption {
  name:string,
  instruction:string
}

const ElectionCandidateDataPage = () => {
  const editOptions:Array<EditOption> = [
    {name:"Election Candidates", instruction:"TBD"},
    {name:"Representatives", instruction:"TBD"},
  ];

  const [selectedGB, setSelectedGB] = useState<number|null>(null);

  const [selectedE, setSelectedE] = useState<number|null>(null);

  const [selectedER, setSelectedER] = useState<number|null>(null);

  const [selectedEditOption, setSelectedEditOption] = useState<EditOption | null>(editOptions[0]);

  const [getLoading, setGetLoading] = useState<boolean>(false);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [getMessage, setGetMessage] = useState<Message|null>();
  const [uploadMessage, setUploadMessage] = useState<Message|null>();

  const orgName:string = "Green Peace";

  const processFile = async(files:Array<File>) => { 
    try{
      setUploadLoading(true);
      setUploadMessage(null)
      let message:Message|null = null;

      let results = await processCsv(files);

      if(selectedGB)
      {
        if(selectedEditOption?.name === "Representatives" && selectedER)
        {
          let reps:Array<RepresentativeData> = results as Array<RepresentativeData>;

          message = await uploadRepresentatives(reps, selectedGB)
        }
        else if (selectedEditOption?.name === "Election Candidates" && selectedER)
        {
          let eleCandidates:Array<ElectionCandidateData> = results as Array<ElectionCandidateData>;

          message = await uploadElectionCandidates(eleCandidates, selectedER);
        }

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
        if(selectedEditOption?.name === "Representatives" && selectedER)
        {
          message = await getElectionRepresentativesData(selectedER);
        }
        else if (selectedEditOption?.name === "Election Candidates" && selectedER)
        {
          message = await getElectionCandidateData(selectedER)
        }


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

  useEffect(()=>{
    console.log(selectedGB)
  },[selectedGB]);

  return (
    <div style={{display:"flex"}}>
      <div style={{flex:1}}>
          {/*Title*/}
          <PageHeader subHeader={orgName}>
              Edit Government Body
          </PageHeader>
          <div style={{flexDirection:"row", display:"flex"}}>
            {/* Select Gov Body */}
            <PageSection>
              <StepHeader>1. Select Government Body</StepHeader>
              {/* Search Gov Body */}
              <SearchGovBodyForm setSelected={(x:number | null)=>{setSelectedGB(x);clear();setSelectedE(null);setSelectedER(null);}} selected={selectedGB}/>
            </PageSection>

            {/* Select Criteria and Data type to edit and Election*/}
            {selectedGB &&
              <PageSection>
                  <>
                    <StepHeader>2. Select Criteria</StepHeader>
                    <div style={{flexDirection:"column", display:"flex"}}>
                        {editOptions.map((o:EditOption)=>{
                          return <SearchItem key={o.name} mainText={o.name}  selected={selectedEditOption ? o.name===selectedEditOption.name : false} onClick={()=>{setSelectedEditOption(o);clear();}}/>
                        })}
                    </div>

                    {/*Search for Election*/}
                    <div style={{flexDirection:"column", display:"flex"}}>
                      {/* Search Field */}
                      <StepSubHeader>Search Election</StepSubHeader>
                      <SearchElectionForm setSelected={(x:number | null)=>{setSelectedE(x);clear();setSelectedER(null);}} selected={selectedE} govBodyId={selectedGB}/>
                    </div>
                  </>
              </PageSection>
            }

            {/*Search for Election Rididng*/}
            {(selectedGB && selectedE) &&
            <PageSection>
              <StepHeader>3. Select Electoral Riding</StepHeader>

              <div style={{flexDirection:"column", display:"flex"}}>
                {/* Search Field */}
                <StepSubHeader>Search Election Riding</StepSubHeader>
                <SearchElectionRidingForm setSelected={(x:number | null)=>{setSelectedER(x);clear();}} selected={selectedER} electionId={selectedE}/>
              </div>
            </PageSection>
            }

            {/* Make Changes */}
            {(selectedGB && selectedE && selectedER) &&
              <PageSection>
                <StepHeader>4. Make Changes</StepHeader>
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
                    <div >
                      <StepSubHeader>Make Your Changes to csv file</StepSubHeader>
                      {selectedEditOption?.instruction &&
                        <StdText><span style={{fontWeight:"bold"}}>NOTE: </span>{selectedEditOption.instruction}</StdText>
                      }
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
              </PageSection>
            }
          </div>
      </div>
    </div>
  );
}

export default ElectionCandidateDataPage;