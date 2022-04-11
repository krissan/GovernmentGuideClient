import { useState } from "react";
import { faDownload, faUpload } from "@fortawesome/free-solid-svg-icons"

import PageHeader from "../../Text/PageHeader";
import ButtonIcon from "../../Buttons/ButtonIcon";
import SearchItem from "../../Buttons/SearchItem";
import StepHeader from "../../Text/StepHeader";
import StepSubHeader from "../../Text/StepSubHeader";
import StdButton from "../../Buttons/StdButton";
import StdDropButton from "../../Buttons/StdDropButton";
import StdText from "../../Text/StdText";

import { processCsv } from "../../../functions/stdAppFunctions";
import { Message } from "../../../customIntefaces/AppTypes";
import { getBillData, getBillVoteData, uploadBills, uploadBillVotes } from "../../../api/bill";
import SearchGovBodyForm from "../../Forms/SearchGovBodyForm";
import SearchBillForm from "../../Forms/SearchBillForm";
import { BillData, RepBillVote } from "../../../customIntefaces/APITypes";
import PageSection from "../../Misc/PageSection";

interface EditOption {
  name:string,
  instruction:string
}

const BillDataPage = () => {
  const [selectedGB, setSelectedGB] = useState<number|null>(null);

  const [selectedEditOption, setSelectedEditOption] = useState<EditOption | null>(null);

  const [selectedB, setSelectedB] = useState<number|null>(null);

  const [getLoading, setGetLoading] = useState<boolean>(false);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [getMessage, setGetMessage] = useState<Message|null>();
  const [uploadMessage, setUploadMessage] = useState<Message|null>();

  const processFile = async(files:Array<File>) => { 
    try{
      setUploadLoading(true);
      setUploadMessage(null)
      let message:Message|null = null;

      let results = await processCsv(files);

      if(selectedGB)
      {
        if(selectedEditOption?.name === "Bill")
        {
          let bills:Array<BillData> = results as Array<BillData>;

          message = await uploadBills(bills, selectedGB)
        }
        else if (selectedEditOption?.name === "Bill Votes" && selectedB)
        {
          let billVotes:Array<RepBillVote> = results as Array<RepBillVote>;

          message = await uploadBillVotes(billVotes, selectedGB, selectedB);
        }
        setUploadMessage(message);
      }
    }
    catch(e)
    {
      console.log(e);
    }
    setUploadLoading(false);
  }

  const getData = async() => {
      setGetLoading(true);
      setGetMessage(null);
      let message:Message|null = null;

      if(selectedGB)
      {
        if(selectedEditOption?.name === "Bill")
        {
          message = await getBillData(selectedGB);
        }
        else if (selectedEditOption?.name === "Bill Votes" && selectedB)
        {
          message = await getBillVoteData(selectedB)
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

  const editOptions:Array<EditOption> = [
    {name:"Bill", instruction:"TBD"}, 
    {name:"Bill Votes", instruction:"TBD"},
  ];

  return (
    <div style={{display:"flex"}}>
      <div style={{flex:1}}>
          {/*Title*/}
          <PageHeader>
              Edit Government Body
          </PageHeader>
          <div style={{flexDirection:"row", display:"flex"}}>
            {/* Select Gov Body */}
            <PageSection>
              <StepHeader>1. Select Government Body</StepHeader>
              {/* Search Field */}
              <SearchGovBodyForm setSelected={(x:number | null)=>{setSelectedGB(x);clear();}} selected={selectedGB} />
            </PageSection>

            {/* Select Criteria and Data type to edit*/}
            <PageSection>
            { selectedGB &&
             <>
                <StepHeader>2. Select Criteria</StepHeader>
                <div style={{flexDirection:"column", display:"flex"}}>
                    {editOptions.map((o:EditOption)=>{
                      return <SearchItem key={o.name} mainText={o.name}  selected={selectedEditOption ? o.name===selectedEditOption.name : false} onClick={()=>{setSelectedEditOption(o);clear();}}/>
                    })}
                </div>

                {/*Search for bill if bill votes edit option selected*/}
                {selectedEditOption?.name === "Bill Votes" &&
                  <>
                    <StepHeader>Select Bill</StepHeader>
                    <SearchBillForm setSelected={(x:number | null)=>{setSelectedB(x);clear();}} selected={selectedB}/>
                  </>
                }
              </>
            }
            </PageSection>

            {/* Make Changes */}
            {(selectedEditOption?.name === "Bill" || (selectedEditOption?.name === "Bill Votes" && selectedB)) &&
              <PageSection>
                <StepHeader>3. Make Changes</StepHeader>
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

export default BillDataPage;