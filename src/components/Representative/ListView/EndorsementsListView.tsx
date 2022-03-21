import React, { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import { useTheme } from "@material-ui/core";

import Symbol from "../../Misc/Symbol";
import MiniHeader from "../../Text/MiniHeader";
import EndorsementItem from "./EndorsementItem";

import { Endorsement } from "../../../AppContext";
import { getRepEndorsements } from "../../../api/representative";
import { structCategoryList } from "../../../functions/stdAppFunctions";
import { SymbolEnum } from "../../../customIntefaces/Enumerators";
import { RepTabProps } from "../../../customIntefaces/AppTypes";

interface EndorsementsProps extends RepTabProps {
}

//Representative Card
const EndorsementsListView:React.FC<EndorsementsProps> = ({repData, reps, setReps}) => {
    const [endorsements, setEndorsements] = useState<Array<Array<Endorsement>>>([]);
    const theme = useTheme();
    const [tabLoading, setTabLoading] = useState<boolean>(false);
    
     //grab representative endorsements and make it available globally if not already
    useEffect(() => {
        const fetchEndorsements = async() => {
            setTabLoading(true);

            if(!repData.endorsements || repData?.endorsements?.length < 1){
                let newRepBoundary = repData;
                const endos:Array<Endorsement> =  await getRepEndorsements(repData.rep.id);
                newRepBoundary.endorsements = endos;

                const newRepBoundaries = reps.set(repData.rep.id, newRepBoundary);
                setReps(newRepBoundaries);
            }

            setTabLoading(false);
        }

        fetchEndorsements();

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //Create list of a list of endorsements grouped by category
    useEffect(() => {
        if(repData.endorsements){
            var endorsements = repData.endorsements;
            var structEndoList:Array<Array<Endorsement>> = structCategoryList(endorsements) as Array<Array<Endorsement>>;

            setEndorsements(structEndoList);
        }
        else
        {
            setEndorsements([]);
        }
       }, [repData.endorsements])


  return (
    <>
    {tabLoading ?
        <div style={{display:"flex", justifyContent:"center"}}>
            <ScaleLoader color={theme.palette.primary.dark} />
        </div>
        :
        <div style={{display:"flex", flexDirection:"column"}}>
            {endorsements && endorsements.length > 0 ?
                endorsements?.map((pl)=>{
                    if(pl[0]) {
                        return (<div key={pl[0].id} style={{paddingBottom:10}}>
                            <div style={{display:"flex"}}>
                                <Symbol style={{paddingRight:10}} displaySymbol={SymbolEnum[pl[0].category]}/>
                                <MiniHeader>{pl[0].category.toUpperCase()}</MiniHeader>
                            </div>
                            {pl?.map((p)=>{
                                return <EndorsementItem key={p.id} endo={p} />
                            })}
                        </div>);
                    }
                    return <div></div>;
                })
            :
                <div>Endorsement not found</div>
            }
        </div>
    }
    </>  
  );
}

export default EndorsementsListView;