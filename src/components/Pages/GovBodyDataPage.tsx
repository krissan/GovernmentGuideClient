import { useEffect, useState } from "react";
import { faDownload, faUpload } from "@fortawesome/free-solid-svg-icons"

import PageHeader from "../Text/PageHeader";
import { useNavigate } from "react-router-dom";
import ButtonIcon from "../Buttons/ButtonIcon";
import StandardSearchField from "../Input/StandardSearchField";
import SearchItem from "../Buttons/SearchItem";
import StepHeader from "../Text/StepHeader";
import StepSubHeader from "../Text/StepSubHeader";
import StdButton from "../Buttons/StdButton";
import StdDropButton from "../Buttons/StdDropButton";

import useStyles from './styles';
import { Endorsement, GovBody, RepBiography, RepEndorsement, RepPlatform, RepReportCard } from "../../AppContext";
import { getBiographyData, getEndorsementData, getPlatformData, getReportCardData, searchGovBody, uploadBiographies, uploadEndorsements, uploadPlatforms, uploadReportCards } from "../../api/representative";
import { processCsv } from "../../functions/fileFunctions";
import { Message } from "../../CustomIntefaces/AppTypes";
import { infoEnum } from "../../CustomIntefaces/Enumerators";

interface EditOption {
  name:string,
}

interface TypeOption {
  name:string,
  type:infoEnum
}

const GovBodyDataPage = () => {
  let navigate = useNavigate();
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedGB, setSelectedGB] = useState<Number|null>(null);
  const [selectedEditOption, setSelectedEditOption] = useState<EditOption | null>(null);
  const [selectedType, setSelectedType] = useState<infoEnum>(infoEnum.representative);
  const [govBodyList, setGovBodyList] = useState<Array<GovBody>>([]);
  const [getLoading, setGetLoading] = useState<boolean>(false);
  const [getMessage, setGetMessage] = useState<Message|null>();
  const [uploadMessage, setUploadMessage] = useState<Message|null>();

  const orgName:string = "Green Peace";

  const onSearchGovBody = async () => {
    let res:Array<GovBody> = await searchGovBody(searchTerm); 
    setSelectedGB(null);
    setSelectedEditOption(null);

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
      }

      setUploadMessage(message);
    }
    catch(e)
    {
      console.log(e);
    }
  }

  const getData = async() => {
      setGetLoading(true);
      setGetMessage(null)
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

  const editOptions:Array<EditOption> = [
    {name:"Biography"}, 
    {name:"Platform"},
    {name:"Report Card"}, 
    {name:"Endorsement"}
  ];

  const typeOptions:Array<TypeOption> = [
    {name:"Representative", type:infoEnum.representative}, 
    {name:"Party", type:infoEnum.party}
  ];

  useEffect(()=>{console.log(selectedEditOption)},[selectedEditOption]);

  return (
    <div style={{display:"flex"}}>
      <div style={{flex:1}}>
          {/*Title*/}
          <PageHeader subHeader={orgName}>
              Edit Government Body
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
                    onClick={()=>{setSelectedGB(g.id)}}/>; 
                  })
                }
              </div>
            </div>

            {/* Select Criteria and Data type to edit*/}
            <div style={{width:"33.3%"}}>
            { selectedGB &&
             <>
                <StepHeader>2. Select Criteria</StepHeader>
                <div style={{flexDirection:"column", display:"flex"}}>
                    {editOptions.map((o:EditOption)=>{
                      return <SearchItem key={o.name} mainText={o.name}  selected={selectedEditOption ? o.name===selectedEditOption.name : false} onClick={()=>{setSelectedEditOption(o)}}/>
                    })}
                </div>

                <StepHeader>3. Select Data To Edit</StepHeader>
                <div style={{flexDirection:"column", display:"flex"}}>
                    {typeOptions.map((i:TypeOption)=>{
                      return <SearchItem key={i.name} mainText={i.name}  selected={selectedType === i.type} onClick={()=>{setSelectedType(i.type)}}/>
                    })}
                </div>
              </>
            }
            </div>

            {/* Make Changes */}
            {selectedEditOption &&
              <div style={{width:"33.3%"}}>
                <StepHeader>4. Make Changes</StepHeader>
                <div style={{flexDirection:"column", display:"flex"}}>
                  {/*i*/}
                  <div style={{flexDirection:"row",display:"flex", paddingBottom:"10px"}}>
                    <div style={{width:25, display:"flex", justifyContent:"flex-end", marginRight:"5px"}}>
                      <StepSubHeader>i.</StepSubHeader>
                    </div> 
                    <StdButton loading={getLoading} style={{padding:"10px 20px", width:400}}><span style={{paddingRight:10}} onClick={getData}>Download Existing Data</span><ButtonIcon icon={faDownload}/></StdButton> 
                  </div>
                  {/*ii*/}
                  <div style={{flexDirection:"row",display:"flex", paddingBottom:"10px"}}>
                    <div style={{width:25, display:"flex", justifyContent:"flex-end", marginRight:"5px"}}>
                      <StepSubHeader>ii.</StepSubHeader>
                    </div> 
                    <StepSubHeader>Make Your Changes to csv file</StepSubHeader>
                  </div>
                  {/*iii*/}
                  <div style={{flexDirection:"row",display:"flex"}}>
                    <div style={{width:25, display:"flex", justifyContent:"flex-end", marginRight:"5px"}}>
                      <StepSubHeader>iii.</StepSubHeader>
                    </div>
                    <StdDropButton style={{padding:"30px 20px", width:400}} dropFn={processFile}><span style={{paddingRight:10}}>Upload Existing Data</span><ButtonIcon icon={faUpload}/></StdDropButton> 
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