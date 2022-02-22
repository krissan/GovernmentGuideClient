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

import { getBiographyData, getEndorsementData, getPlatformData, getReportCardData, uploadBiographies, uploadEndorsements, uploadPlatforms, uploadReportCards } from "../../../api/representative";
import { processCsv } from "../../../functions/stdAppFunctions";
import { Message } from "../../../customIntefaces/AppTypes";
import { infoEnum } from "../../../customIntefaces/Enumerators";
import { RepBiography, RepEndorsement, RepPlatform, RepReportCard } from "../../../customIntefaces/APITypes";
import PageSection from "../../Misc/PageSection";

interface EditOption {
  name:string,
  instruction:string
}

interface TypeOption {
  name:string,
  type:infoEnum
}

const GovBodyDataPage = () => {
  const [selectedGB, setSelectedGB] = useState<number|null>(null);
  const [selectedEditOption, setSelectedEditOption] = useState<EditOption | null>(null);
  const [selectedType, setSelectedType] = useState<infoEnum>(infoEnum.representative);

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
        if(selectedEditOption?.name === "Biography")
        {
          let bios:Array<RepBiography> = results as Array<RepBiography>;

          message = await uploadBiographies(bios, selectedGB, selectedType);
        }
        else if (selectedEditOption?.name === "Platform")
        {
          let plats:Array<RepPlatform> = results as Array<RepPlatform>;

          message = await uploadPlatforms(plats, selectedGB, selectedType);
        }
        else if (selectedEditOption?.name === "Report Card")
        {
          let repCards:Array<RepReportCard> = results as Array<RepReportCard>;
          message = await uploadReportCards(repCards, selectedGB, selectedType);
        }
        else if (selectedEditOption?.name === "Endorsement")
        {
          let endorsements:Array<RepEndorsement> = results as Array<RepEndorsement>;

          message = await uploadEndorsements(endorsements, selectedGB, selectedType);
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
        if(selectedEditOption?.name === "Biography")
        {
          message = await getBiographyData(selectedGB, selectedType);
        }
        else if (selectedEditOption?.name === "Platform")
        {
          message = await getPlatformData(selectedGB, selectedType)
        }
        else if (selectedEditOption?.name === "Report Card")
        {
          message = await getReportCardData(selectedGB, selectedType)
        }
        else if (selectedEditOption?.name === "Endorsement")
        {
          message = await getEndorsementData(selectedGB, selectedType)
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
    {name:"Biography", instruction:"Do not alter repId or representative field."}, 
    {name:"Platform", instruction:"Do not alter repId or representative field. Category can only be from approved list (environment, monetary, industry) and Status must be (COMPLETED, IN_PROGRESS, DROPPED, NOT_STARTED). For multiple platform points duplicate rows and alter as needed."},
    {name:"Report Card", instruction:"Do not alter repId or representative field. Category can only be from approved list (environment, monetary, industry) and Grade must be a single character. For multiple report cards duplicate rows and alter as needed."}, 
    {name:"Endorsement", instruction:"Do not alter repId or representative field. Category can only be from approved list (environment, monetary, industry)."}
  ];

  const typeOptions:Array<TypeOption> = [
    {name:"Representative", type:infoEnum.representative}, 
    {name:"Party", type:infoEnum.party}
  ];

  useEffect(()=>{console.log(selectedEditOption)},[selectedEditOption]);

  return (
    <div style={{display:"flex"}}>
      <div style={{flex:1, overflowX:"scroll"}}>
          {/*Title*/}
          <PageHeader subHeader={orgName}>
              Edit Government Body
          </PageHeader>
          <div style={{flexDirection:"row", display:"flex"}}>
            {/* Select Gov Body */}
            <PageSection>
              <StepHeader>1. Select Government Body</StepHeader>
              {/* Search Gov Body */}
              <SearchGovBodyForm setSelected={(x:number | null)=>{setSelectedGB(x);clear();}} selected={selectedGB}/>
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

                <StepHeader>3. Select Data To Edit</StepHeader>
                <div style={{flexDirection:"column", display:"flex"}}>
                    {typeOptions.map((i:TypeOption)=>{
                      return <SearchItem key={i.name} mainText={i.name}  selected={selectedType === i.type} onClick={()=>{setSelectedType(i.type);clear();}}/>
                    })}
                </div>
              </>
            }
            </PageSection>


            {/* Make Changes */}
            {selectedEditOption &&
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
                      {selectedEditOption.instruction &&
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

export default GovBodyDataPage;