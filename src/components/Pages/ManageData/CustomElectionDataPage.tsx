import { useState } from "react";
import { faUpload } from "@fortawesome/free-solid-svg-icons"

import PageHeader from "../../Text/PageHeader";
import ButtonIcon from "../../Buttons/ButtonIcon";
import StepHeader from "../../Text/StepHeader";
import StepSubHeader from "../../Text/StepSubHeader";
import StdDropButton from "../../Buttons/StdDropButton";
import SearchGovBodyForm from "../../Forms/SearchGovBodyForm";
import PageSection from "../../Misc/PageSection";
import SearchElectionForm from "../../Forms/SearchElectionForm";


import { processJSON } from "../../../functions/stdAppFunctions";
import { BoundaryCustomImport, Message } from "../../../customIntefaces/AppTypes";
import { uploadCustomElectionData } from "../../../api/election";

const CustomElectionDataPage = () => {
  const [selectedGB, setSelectedGB] = useState<number|null>(null);
  const [selectedE, setSelectedE] = useState<number|null>(null);
  const [getLoading, setGetLoading] = useState<boolean>(false);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [getMessage, setGetMessage] = useState<Message|null>();
  const [uploadMessage, setUploadMessage] = useState<Message|null>();

  const processFile = async(files:Array<File>) => { 
    try{
      setUploadLoading(true);
      setUploadMessage(null)
      let message:Message|null = null;

      if(selectedGB && selectedE)
      {
        let jsonData = await processJSON(files);
        let results:Array<BoundaryCustomImport> = [];
        if(jsonData.features)
        {
          jsonData.features.forEach((element:any) => {
            if(element.properties.ENGLISH_NA && element.geometry.coordinates) {
              let name = element.properties.ENGLISH_NA.replaceAll("\uFFFD",'%');
              let outline = element.geometry.coordinates;
              let processedOutline = outline.map((x:any)=>{
                let indvidualShape = x.map((y:any)=>{
                  if(name === "Wellington%Halton Hills"){
                    console.log(y);
                  }
                  if(Array.isArray(y[0]))
                  {
                    return y.map((z:Array<Number>)=>{
                      return {lat: z[1], lng:z[0]};
                    });
                  }
                    
                  return {lat: y[1], lng:y[0]};
                });

                //check if indvShape is one or multiple
                if(Array.isArray(indvidualShape[0]))
                {
                  return indvidualShape[0];
                }

                return indvidualShape;
               })

               if(name === "Wellington%Halton Hills"){
                 console.log(outline);
                 console.log(processedOutline);
               }

              let boundary:BoundaryCustomImport = {boundaryName: name, outline: processedOutline};

              results.push(boundary);
            }
          });
        }

        message = await uploadCustomElectionData(results, selectedGB, selectedE);
      
        setUploadMessage(message);
      }
    }
    catch(e)
    {
      console.log(e);
    }
    console.log("hello");
    setUploadLoading(false);
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
              Import Election Data
          </PageHeader>
          <div style={{flexDirection:"row", display:"flex"}}>
            {/* Select Gov Body */}
            <PageSection>
              <StepHeader>1. Select Government Body</StepHeader>
              {/* Search Gov Body */}
              <SearchGovBodyForm setSelected={(x:number | null)=>{setSelectedGB(x);clear();setSelectedE(null)}} selected={selectedGB}/>
            </PageSection>

            {/* Make Changes */}
            {selectedGB &&
            
                <PageSection>
                  <StepHeader>2. Select which Election data is for</StepHeader>
                  
                  {/*Search for Election*/}
                  <div style={{flexDirection:"column", display:"flex"}}>
                    {/* Search Field */}
                    <StepSubHeader>Search Election</StepSubHeader>
                    <SearchElectionForm setSelected={(x:number | null)=>{setSelectedE(x);clear();}} selected={selectedE} govBodyId={selectedGB}/>
                  </div>
                </PageSection>
              }

              {selectedE && 
                <PageSection>
                  <StepHeader>3. Make Changes</StepHeader>
                  <div style={{flexDirection:"column", display:"flex"}}>
                    {/*i*/}
                    <div style={{flexDirection:"row",display:"flex"}}>
                      <div style={{width:25, display:"flex", justifyContent:"flex-end", marginRight:"5px"}}>
                        <StepSubHeader>i.</StepSubHeader>
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

export default CustomElectionDataPage;