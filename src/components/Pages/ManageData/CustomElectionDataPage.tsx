import { useState } from "react";
import { faUpload } from "@fortawesome/free-solid-svg-icons"
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import PageHeader from "../../Text/PageHeader";
import ButtonIcon from "../../Buttons/ButtonIcon";
import StepHeader from "../../Text/StepHeader";
import StepSubHeader from "../../Text/StepSubHeader";
import StdDropButton from "../../Buttons/StdDropButton";
import SearchGovBodyForm from "../../Forms/SearchGovBodyForm";
import PageSection from "../../Misc/PageSection";
import StandardInput from "../../Input/StandardInput";


import { processJSON } from "../../../functions/stdAppFunctions";
import { BoundaryCustomImport, Message } from "../../../customIntefaces/AppTypes";
import { RepresentativeData } from "../../../customIntefaces/APITypes";
import { LocalizationProvider } from "@mui/lab";
import SearchElectionForm from "../../Forms/SearchElectionForm";
import { uploadCustomElectionData } from "../../../api/election";

const CustomElectionDataPage = () => {
  const [selectedGB, setSelectedGB] = useState<number|null>(null);
  const [selectedE, setSelectedE] = useState<number|null>(null);
  const [getLoading, setGetLoading] = useState<boolean>(false);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [getMessage, setGetMessage] = useState<Message|null>();
  const [uploadMessage, setUploadMessage] = useState<Message|null>();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const processFile = async(files:Array<File>) => { 
    try{
      setUploadLoading(true);
      setUploadMessage(null)
      let message:Message|null = null;

      if(selectedGB && selectedE && startDate != null)
      {
        let jsonData = await processJSON(files);
        let results:Array<BoundaryCustomImport> = [];
  
        if(jsonData.features)
        {
          jsonData.features.forEach((element:any) => {
            if(element.properties.ENGLISH_NA && element.geometry.coordinates) {
              let name = element.properties.ENGLISH_NA.replaceAll("\uFFFD",'%');
              let outline = element.geometry.coordinates;
              let processedOutline = outline.map((x:Array<Array<Number>>)=>{
                return x.map((x:Array<Number>)=>{
                  return {lat: x[0], lng:x[1]};
                 });
               })

              let boundary:BoundaryCustomImport = {boundaryName: name, outline: processedOutline};

              results.push(boundary);
            }
          });
        }

        message = await uploadCustomElectionData(results, selectedGB, selectedE, startDate, endDate);
      
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
                  <StepHeader>2. Set dates for when boundary comes into effect and which election its for</StepHeader>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label="Start Date"
                      inputFormat="dd/MM/yyyy"
                      value={startDate}
                      onChange={(newValue: Date | null) => {
                        setStartDate(newValue);
                      }}
                      renderInput={(params:any) => <StandardInput {...params} style={{width:"100%"}} />}
                    />
                    <DesktopDatePicker
                      label="End Date"
                      inputFormat="dd/MM/yyyy"
                      value={endDate}
                      onChange={(newValue: Date | null) => {
                        setEndDate(newValue);
                      }}                
                      renderInput={(params:any) => <StandardInput {...params} style={{width:"100%"}} />}
                    />
                  </LocalizationProvider>
                  
                  {/*Search for Election*/}
                  <div style={{flexDirection:"column", display:"flex"}}>
                    {/* Search Field */}
                    <StepSubHeader>Search Election</StepSubHeader>
                    <SearchElectionForm setSelected={(x:number | null)=>{setSelectedE(x);clear();}} selected={selectedE} govBodyId={selectedGB}/>
                  </div>
                </PageSection>
              }

              {selectedE && startDate &&
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