import React, { useEffect, useState } from "react";

import Symbol from "../Misc/Symbol";
import MiniHeader from "../Text/MiniHeader";
import MiniSubHeader from "../Text/MiniSubHeader";

import { Endorsement, RepBoundary,  } from "../../AppContext";
import { SymbolEnum } from "../../CustomIntefaces/Enumerators";
import StdText from "../Text/StdText";

interface EndorsementsProps {
    repBoundary:RepBoundary,
}

//Representative Card
const EndorsementsView:React.FC<EndorsementsProps> = ({repBoundary}) => {
    const [endorsements, setEndorsements] = useState<Array<Array<Endorsement|undefined>>>([]);

    useEffect(() => {
        if(!repBoundary.endorsements){
            //change this to to import
            //if successfully imported run structureEndorsementList()
        }
    }, [repBoundary.endorsements])


    //Create list of a list of endorsements grouped by title
    const structureEndorsementList = () => {
        var endorsements = repBoundary.endorsements;

        var structEndoList:Array<Array<Endorsement|undefined>> = [];
        //loop through endorsements and if current item has title already in structEndoList add it to specific group
        if(endorsements && endorsements.length>0)
        {
            endorsements?.forEach((endo)=>{
                let exists:Boolean = false;
                //check if endo title already exists in struct list and break out of loop if it does
                for(let i = 0; i < structEndoList.length; i++)
                {
                    console.log(structEndoList[i]);
                    if(structEndoList[i][0] && endo.category == structEndoList[i][0]?.category){
                        
                        structEndoList[i].push(endo);
                        exists = true;
                        break;
                    }
                }

                if(exists == false)
                {
                    structEndoList.push([endo]);
                }
            });

            setEndorsements(structEndoList);
        }
    }

  return (
    <>
    {
        endorsements && endorsements.length > 0 ?
            endorsements?.map((pl)=>{
                if(pl[0]){
                    console.log(pl);
                return (<div key={pl[0].id} style={{paddingBottom:10}}>
                    <div style={{display:"flex"}}>
                        <Symbol style={{paddingRight:10}} displaySymbol={SymbolEnum[pl[0].category]}/>
                        <MiniHeader>{pl[0].category}</MiniHeader>
                    </div>
                    {pl?.map((p)=>{
                        return <>
                            <MiniSubHeader>{p?.orgId/*This is */}</MiniSubHeader>
                            <StdText>{p?.description}</StdText>
                        </>
                    })}
                </div>);
                }
            })
        :
        <div>Endorsement not found</div>
    }
    </>
  );
}

export default EndorsementsView;