import { useEffect, useState } from "react";
import { useTheme } from "@material-ui/core";
import { ScaleLoader } from "react-spinners";

import { StdProps } from "../../../customIntefaces/StdProps";
import { getECVDbyER } from "../../../api/election";
import { ElectionRidingVoteData, ElectionCandidate, PartyData, ElectionCandidateData } from "../../../customIntefaces/APITypes";
import { useAppContext } from "../../../AppContext";
import { BarDatum, ResponsiveBar } from '@nivo/bar';
import { CCard, CCardBody, CCardHeader } from "@coreui/react";

interface EVDProps extends StdProps {
  eleRidingId:number
}

interface graphECVD {
  electionDate:Date,
} 

//Election Voting Data
const EleRidingVoteData:React.FC<EVDProps> = ({eleRidingId, style}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [eleRidingVD, setEleRidingVD] = useState<Array<BarDatum>>([]);
  const [graphKeys, setGraphKeys] = useState<Array<string>>([]);
  const theme = useTheme();
  const { gbPartyData } = useAppContext();

  //grab graph data and format it
  useEffect(()=>{
    const setUp = async() => {
      setLoading(true);

      //grab election candidate vote data
      let results:Array<ElectionRidingVoteData> = await getECVDbyER(eleRidingId);
      let backUpColorList:Array<string> = ['C0C0C0', '808080', '800000', '808000', '00FF00', '00FFFF', '008080', '000080', 'FF00FF', '800080', 'CD5C5C', 'F08080', 'FA8072', 'E9967A', 'FFA07A']

      //format graph
      let graphData:Array<BarDatum> = [];
      let keyMap:Map<string, string> = new Map<string, string>();
      let rowData:BarDatum;

      results.forEach((ecrvd:ElectionRidingVoteData )=>{
        let partyColorCounter = 0;
        rowData = {electionDate: ecrvd.electionDate.toString()}
        console.log(ecrvd);
        
        if(ecrvd.ec){
          ecrvd.ec.forEach((ec:ElectionCandidateData)=>{
            let party:PartyData|undefined = gbPartyData.get(ec.partyId);

            console.log(party);

            if(party && party.shortName){
              if(!keyMap.get(party.shortName))
              {
                keyMap.set(party.shortName, party.shortName);
              }

              if(party.partyColor){
                rowData[party.shortName+"Color"] = '#'+party.partyColor;
              }
              else
              {
                rowData[party.shortName+"Color"] = '#'+backUpColorList[partyColorCounter];
                partyColorCounter += 1;
              }

              rowData[party.shortName] = ec.votes;  
            }
            else
            {
              if(!keyMap.get(ec.repName)){
                keyMap.set(ec.repName, ec.repName);
              }

              rowData[ec.repName] = '#'+backUpColorList[partyColorCounter];
              partyColorCounter += 1;
              rowData[ec.repName] =  ec.votes;
            }

          });
          
          graphData.push(rowData);
        }
      });

      setGraphKeys(Array.from(keyMap.keys()));
      setEleRidingVD(graphData);
      console.log(graphData);
      setLoading(false);
    }

    setUp();
  },[eleRidingId, gbPartyData])
  
  return (
    <div style={style}>
      {!loading ?
      <div>
          legend

          loop through graphs
        <CCard>
            <CCardHeader>
              <h4>Nivo Bar Graph</h4>
            </CCardHeader>
            <CCardBody style={{height:'100px'}}>
              <ResponsiveBar data={eleRidingVD}
                indexBy = "electionDate"
                layout="horizontal"
                colors={({id, data}) => data[`${id.toString()}Color`].toString()}
                /*colors={{ scheme: 'nivo' }}*/
                keys={graphKeys}
              />
            </CCardBody>
        </CCard>
      </div>
      :
      <div style={{display:"flex", height:"200px", width:"100%", justifyContent:"center", alignItems:"center"}}>
        <ScaleLoader color={theme.palette.primary.dark} />
      </div>
    } 
    </div>
  );
}

export default EleRidingVoteData;