import React, { useEffect, useState } from "react";

import Symbol from "../Misc/Symbol";
import MiniHeader from "../Text/MiniHeader";
import MiniSubHeader from "../Text/MiniSubHeader";

import { Endorsement, RepBoundary, useAppContext,  } from "../../AppContext";
import { SymbolEnum } from "../../CustomIntefaces/Enumerators";
import StdText from "../Text/StdText";
import { useTheme } from "@material-ui/core";
import { getRepEndorsements } from "../../api/representative";
import { ScaleLoader } from "react-spinners";

interface EndorsementsProps {
    repBoundary:RepBoundary,
}

//Representative Card
const EndorsementsView:React.FC<EndorsementsProps> = ({repBoundary}) => {
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
                console.log(endos);
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
        var endorsements = repBoundary.endorsements;

        var structEndoList:Array<Array<Endorsement>> = [];
        //loop through endorsements and if current item has title already in structEndoList add it to specific group
        if(endorsements && endorsements.length>0)
        {
            endorsements?.forEach((endo)=>{
                    let exists:Boolean = false;
                    //check if endo title already exists in struct list and break out of loop if it does
                    for(let i = 0; i < structEndoList.length; i++)
                    {
                        console.log(structEndoList[i]);
                        if(structEndoList[i][0] && endo.category === structEndoList[i][0]?.category){
                            
                            structEndoList[i].push(endo);
                            exists = true;
                            break;
                        }
                    }

                    if(exists === false)
                    {
                        structEndoList.push([endo]);
                    }
                });

                setEndorsements(structEndoList);
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
                            return <div key={p.orgId}>
                                <MiniSubHeader>{p.orgId}</MiniSubHeader>
                                <StdText>{p.description}</StdText>
                            </div>
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

export default EndorsementsView;