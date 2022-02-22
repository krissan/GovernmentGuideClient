
import PageHeader from "../Text/PageHeader";
import SubHeader from "../Text/SubHeader";
import SearchItem from "../Buttons/SearchItem";

import EleToggleContainer from "../Misc/EleToggleContainer";

import { useAppContext } from "../../AppContext";
import { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import { useTheme } from "@material-ui/core";
import { BoundaryGovBodyName, ElectionCandidate } from "../../customIntefaces/APITypes";
import { findBoundaryAndGovBodyName } from "../../api/boundary";
import { Nullable } from "../../customIntefaces/AppTypes";

interface CompareOption {
  name:string,
}

const ElectionPage = () => {
  const { selectedRB } = useAppContext();
  const theme = useTheme();
  const [govBodyName, setGovBodyName] = useState<string | null>(null);
  const [boundaryName, setBoundaryName] = useState<string | null>(null);
  const [cmprAllTgl, setCmprAllTgl] = useState<boolean>(true);
  const [eleCans, setEleCans] = useState<Array<ElectionCandidate>>([]);
  const [selectedECs, setSelectedECs] = useState<Array<number>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  useEffect(()=>{
    const setUp = async() => {
      setLoading(true);
      let id = selectedRB?.eleRiding?.boundaryId;

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
      }

      setLoading(false);
    }

    setUp();
  },[selectedRB?.eleRiding?.boundaryId])



  return (
    <div style={{display:"flex"}}>
      {!loading ?
        <>{(selectedRB && selectedRB.eleRiding) ? 
          <div style={{flex:1, flexDirection:"column"}}>
            {/*Title*/}
            <PageHeader additionalInfo={boundaryName}>
              ELECTION - {govBodyName}
            </PageHeader>
            {/*Representative comparison toggles*/}
            {eleCans.length > 1  && 
              <div style={{flexDirection:"row", overflowX:"scroll"}}>
                <SubHeader>COMPARE:</SubHeader>
                {/*Compare All Toggle*/}
                <SearchItem 
                    selected={cmprAllTgl} 
                    onClick={()=>{setCmprAllTgl(!cmprAllTgl)}}/>

                {!cmprAllTgl && 
                  <>
                    {/*divider*/}
                    <div style={{backgroundColor:theme.palette.primary.dark, width:"3px"}}></div>
                    
                    {eleCans.map((e:ElectionCandidate)=>{
                      return <SearchItem 
                        key={e.id} 
                        mainText={e.repId.toString()}
                        selected={selectedECs.includes(e.id)} 
                        onClick={()=>{selectedECs.includes(e.id) ? selectedECs.splice(selectedECs.indexOf(e.id),1) : selectedECs.push(e.id)}}/>
                    })}
                  </>
                }

                {/*Categories To Compare*/}
                <EleToggleContainer eleCans={eleCans.filter((e)=>{return cmprAllTgl === true || selectedECs.includes(e.id)})}/>
              </div>          
            }
          </div>
          :
          <div>
            No election data found
          </div>
        }</>
        :
        <div style={{display:"flex", height:"100%", justifyContent:"center", alignItems:"center"}}>
          <ScaleLoader color={theme.palette.primary.dark} />
        </div>
      } 
    </div>
  );
}

export default ElectionPage;