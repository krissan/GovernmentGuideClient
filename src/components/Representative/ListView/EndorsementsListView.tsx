import React, { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import { useTheme } from "@material-ui/core";

import Symbol from "../../Misc/Symbol";
import MiniHeader from "../../Text/MiniHeader";
import EndorsementItem from "./EndorsementItem";

import { RepBoundary, Endorsement, useAppContext,  } from "../../../AppContext";
import { getRepEndorsements } from "../../../api/representative";
import { structCategoryList } from "../../../functions/stdAppFunctions";
import { SymbolEnum } from "../../../customIntefaces/Enumerators";

interface EndorsementsProps {
    repBoundary:RepBoundary,
}

//Representative Card
const EndorsementsListView:React.FC<EndorsementsProps> = ({repBoundary}) => {
    const [endorsements, setEndorsements] = useState<Array<Array<Endorsement>>>([]);
    const { repBoundaries, setRepBoundaries } = useAppContext();
    const theme = useTheme();
    const [tabLoading, setTabLoading] = useState<boolean>(false);
    
     //grab representative endorsements and make it available globally if not already
    useEffect(() => {
        const fetchEndorsements = async() => {
            setTabLoading(true);

            if(!repBoundary.endorsements || repBoundary?.endorsements?.length < 1){
                const index = repBoundaries.indexOf(repBoundary);
                let newRepBoundary = repBoundary;
                const endos:Array<Endorsement> =  await getRepEndorsements(repBoundary.rep.id);
                newRepBoundary.endorsements = endos;

                const newRepBoundaries = Object.assign([...repBoundaries], {
                    [index]: newRepBoundary
                });
                setRepBoundaries(newRepBoundaries);
            }

            setTabLoading(false);
        }

        fetchEndorsements();
    }, [])

    //Create list of a list of report cards grouped by category
    useEffect(() => {
        if(repBoundary.endorsements){
            var endorsements = repBoundary.endorsements;
            var structRepCardList:Array<Array<Endorsement>> = structCategoryList(endorsements) as Array<Array<Endorsement>>;

            setEndorsements(structRepCardList);
        }
        else
        {
            setEndorsements([]);
        }
       }, [repBoundary.endorsements])


  return (
    <>
    {tabLoading ?
        <div style={{display:"flex", justifyContent:"center"}}>
            <ScaleLoader color={theme.palette.primary.dark} />
        </div>
        :
        <>
        {endorsements && endorsements.length > 0 ?
            endorsements?.map((pl)=>{
                if(pl[0]) {
                    return (<div key={pl[0].id} style={{paddingBottom:10}}>
                        <div style={{display:"flex"}}>
                            <Symbol style={{paddingRight:10}} displaySymbol={SymbolEnum[pl[0].category]}/>
                            <MiniHeader>{pl[0].category.toUpperCase()}</MiniHeader>
                        </div>
                        {pl?.map((p)=>{
                            return <EndorsementItem endo={p} />
                        })}
                    </div>);
                }
            })
        :
            <div>Endorsement not found</div>
        }
        </>
    }
    </>  
  );
}

export default EndorsementsListView;