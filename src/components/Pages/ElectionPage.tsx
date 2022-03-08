
import PageHeader from "../Text/PageHeader";
import SubHeader from "../Text/SubHeader";
import SearchItem from "../Buttons/SearchItem";

import EleToggleContainer from "../Misc/EleToggleContainer";

import { useAppContext } from "../../AppContext";
import { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import { useTheme } from "@material-ui/core";
import { BoundaryGovBodyName, ElectionCandidateData } from "../../customIntefaces/APITypes";
import { findBoundaryAndGovBodyName } from "../../api/boundary";
import { Nullable } from "../../customIntefaces/AppTypes";
import { getECsByER } from "../../api/election";

interface CompareOption {
  name:string,
}

interface ElectionCandidateItem extends ElectionCandidateData {
  toggled?:boolean
}

const ElectionPage = () => {
  const { selectedER } = useAppContext();
  const theme = useTheme();
  const [govBodyName, setGovBodyName] = useState<string | null>(null);
  const [boundaryName, setBoundaryName] = useState<string | null>(null);
  const [cmprAllTgl, setCmprAllTgl] = useState<boolean>(true);
  const [eleCans, setEleCans] = useState<Array<ElectionCandidateItem>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
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

        //setEleCans()
        let ecs:Array<ElectionCandidateItem> = await getECsByER(id);
        console.log(ecs);
        setEleCans(ecs);
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
            {eleCans.length > 1  && 
              <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                <SubHeader style={{paddingRight:"10px", color:theme.palette.secondary.dark}}>COMPARE:</SubHeader>
                {/*Compare All Toggle*/}
                <SearchItem
                    mainText="COMPARE ALL"
                    selected={cmprAllTgl} 
                    onClick={()=>{setCmprAllTgl(!cmprAllTgl)}}/>

                {cmprAllTgl && 
                  <div style={{flexDirection:"row", display:"flex"}}>
                    {/*divider*/}
                    <div style={{backgroundColor:theme.palette.primary.dark, width:"3px", margin:"0px 15px", display:"flex"}}></div>
                    
                    <div style={{overflowX:"scroll", display:"flex", flexDirection:"row"}}>
                      {eleCans.map((e:ElectionCandidateItem, i:number)=>{
                        return <div style={{paddingRight:"10px"}}>
                            <SearchItem 
                              key={i.toString()+e.toggled ? "true" : "false"}
                              mainText={e.repName.toString()}
                              selected={e.toggled ? true : false} 
                              onClick={()=>{
                                let newEC:ElectionCandidateItem = e;
                                newEC.toggled = e.toggled ? !e.toggled : true; 
                                let newECs:Array<ElectionCandidateItem> = eleCans;
                                newECs.splice(i,1,newEC);
                                setEleCans(newECs);
                                console.log(newECs);
                                }}/>
                          </div>
                      })}
                    </div>
                  </div>
                }
              </div>          
            }
            {/*Categories To Compare*/}
            <EleToggleContainer style={{paddingTop:"40px"}} eleCans={eleCans.filter((e)=>{return cmprAllTgl === true || e.toggled ? true : false})}/>
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