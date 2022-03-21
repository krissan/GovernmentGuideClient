
import PageHeader from "../Text/PageHeader";
import SubHeader from "../Text/SubHeader";
import SearchItem from "../Buttons/SearchItem";

import EleToggleContainer from "../Misc/EleToggleContainer";

import { Biography, Endorsement, Platform, ReportCard, Representative, useAppContext } from "../../AppContext";
import { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import { useTheme } from "@material-ui/core";

import { BoundaryGovBodyName, ElectionCandidateRepParty } from "../../customIntefaces/APITypes";
import { findBoundaryAndGovBodyName } from "../../api/boundary";
import { Nullable } from "../../customIntefaces/AppTypes";
import { getECsByER } from "../../api/election";

export interface ElectionCandidateRepPartyItem extends ElectionCandidateRepParty {
  toggled:boolean,
  platforms?:Array<Platform>,
  reportCards?:Array<ReportCard>,
  endorsements?:Array<Endorsement>,
  biography?:Nullable<Biography>,
}

const ElectionPage = () => {
  const { selectedER } = useAppContext();
  const theme = useTheme();
  const [govBodyName, setGovBodyName] = useState<string | null>(null);
  const [boundaryName, setBoundaryName] = useState<string | null>(null);
  const [cmprAllTgl, setCmprAllTgl] = useState<boolean>(true);
  const [eleCans, setEleCans] = useState<Map<number, ElectionCandidateRepPartyItem>>(new Map<number, ElectionCandidateRepPartyItem>());
  const [loading, setLoading] = useState<boolean>(false);
  //used to force rerender when mutating eleCans inside map
  const [reRender, setReRender] = useState<boolean>(false);

  useEffect(()=>{
    const setUp = async() => {
      setLoading(true);
      let id = selectedER?.boundaryId;
      if(id)
      {
        let bgbName:Nullable<BoundaryGovBodyName> = await findBoundaryAndGovBodyName(id);
        if(bgbName?.govBodyName)
        {
          setGovBodyName(bgbName?.govBodyName);
        }
        if(bgbName?.boundaryName)
        {
          setBoundaryName(bgbName?.boundaryName);
        }

        //Get list of election candidate data and convert it to election candidate item
        let eleCanReps:Map<number, ElectionCandidateRepParty> = await getECsByER(id);
        console.log(eleCanReps);
        let eleCanRepItems:Map<number, ElectionCandidateRepPartyItem> = new Map<number, ElectionCandidateRepPartyItem>();

        for (let entry of Array.from(eleCanReps.entries())) {
          eleCanRepItems.set(entry[0], {toggled:true, ...entry[1]});
        }

        setEleCans(eleCanRepItems);
      }

      setLoading(false);
    }

    setUp();
  },[selectedER?.boundaryId])

  return (
    <div style={{display:"flex", height:"100%"}}>
      {!loading ?
        <>{selectedER ? 
          <div style={{flex:1, flexDirection:"column"}}>
            {/*Title*/}
            <PageHeader subHeader={boundaryName ? boundaryName : ""}>
              ELECTION - {govBodyName}
            </PageHeader>
            {/*Representative comparison toggles*/}
            {eleCans.size > 1  && 
              <div style={{width:"95vw", display:"flex", flexDirection:"row", alignItems:"center"}}>
                <SubHeader style={{paddingRight:"10px", color:theme.palette.secondary.dark}}>COMPARE:</SubHeader>
                {/*Compare All Toggle*/}
                <SearchItem
                    mainText="Compare All"
                    selected={cmprAllTgl} 
                    onClick={()=>{setCmprAllTgl(!cmprAllTgl)}}/>

                {!cmprAllTgl && 
                  <div style={{flexDirection:"row", display:"flex"}}>
                    {/*divider*/}
                    <div style={{backgroundColor:theme.palette.primary.dark, width:"3px", margin:"0px 15px", display:"flex"}}></div>
                    
                    <div style={{overflowX:"auto", display:"flex", flexDirection:"row"}}>
                      {[...eleCans].map(([key, value]) => {
                        return <div style={{paddingRight:"10px"}}>
                            <SearchItem 
                              key={value.rep.id.toString()+value.toggled ? "true" : "false"}
                              mainText={value.rep.firstName+" "+value.rep.lastName}
                              selected={value.toggled ? true : false}
                              onClick={()=>{
                                let newEC:ElectionCandidateRepPartyItem = value;
                                newEC.toggled = value.toggled ? !value.toggled : true; 
                                let newECs:Map<number, ElectionCandidateRepPartyItem> = eleCans;
                                newECs.set(value.rep.id, newEC);
                                setEleCans(newECs);
                                setReRender(!reRender);
                              }}/>
                          </div>
                        })
                      }
                    </div>
                  </div>
                }
              </div>          
            }
            {/*Categories To Compare*/}
            <EleToggleContainer style={{paddingTop:"40px"}} eleCans={eleCans/*.filter((e)=>{return cmprAllTgl === true || e.toggled ? true : false})*/} setEleCans={setEleCans}/>
          </div>
          :
          <div>
            No election data found
          </div>
        }</>
        :
        <div style={{display:"flex", height:"100%", width:"100%", justifyContent:"center", alignItems:"center"}}>
          <ScaleLoader color={theme.palette.primary.dark} />
        </div>
      } 
    </div>
  );
}

export default ElectionPage;