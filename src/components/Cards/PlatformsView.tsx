import React, { useEffect, useState } from "react";

import Symbol from "../Misc/Symbol";
import MiniHeader from "../Text/MiniHeader";
import MiniSubHeader from "../Text/MiniSubHeader";

import { Platform, RepBoundary,  } from "../../AppContext";
import { SymbolEnum } from "../../CustomIntefaces/Enumerators";
import StdText from "../Text/StdText";

interface PlatformsProps {
    repBoundary:RepBoundary,
}

//Representative Card
const PlatformsView:React.FC<PlatformsProps> = ({repBoundary}) => {
    const [platforms, setPlatforms] = useState<Array<Array<Platform|undefined>>>([]);

    useEffect(() => {
        if(!repBoundary.platforms){
            //change this to to import
            //if successfully imported run structurePlatformList()
        }
    }, [repBoundary.platforms])


    //Create list of a list of platforms grouped by title
    const structurePlatformList = () => {
        var platforms = repBoundary.platforms;

        var structPlatList:Array<Array<Platform|undefined>> = [];
        //loop through platforms and if current item has title already in structPlatList add it to specific group
        if(platforms && platforms.length>0)
        {
            platforms?.forEach((plat)=>{
                let exists:Boolean = false;
                //check if plat title already exists in struct list and break out of loop if it does
                for(let i = 0; i < structPlatList.length; i++)
                {
                    console.log(structPlatList[i]);
                    if(structPlatList[i][0] && plat.category == structPlatList[i][0]?.category){
                        
                        structPlatList[i].push(plat);
                        exists = true;
                        break;
                    }
                }

                if(exists == false)
                {
                    structPlatList.push([plat]);
                }
            });

            setPlatforms(structPlatList);
        }
    }

  return (
    <>
    {
        platforms && platforms.length > 0 ?
            platforms?.map((pl)=>{
                if(pl[0]){
                    console.log(pl);
                return (<div key={pl[0].id} style={{paddingBottom:10}}>
                    <div style={{display:"flex"}}>
                        <Symbol style={{paddingRight:10}} displaySymbol={SymbolEnum[pl[0].category]}/>
                        <MiniHeader>{pl[0].category}</MiniHeader>
                    </div>
                    {pl?.map((p)=>{
                        return <>
                            <div style={{display:"flex"}}>
                                <MiniSubHeader>{p?.name}</MiniSubHeader>
                                <div style={{border:"1px solid black"}}>{p?.status}</div>
                            </div>
                            <StdText>{p?.description}</StdText>
                        </>
                    })}
                </div>);
                }
            })
        :
        <div>Platform not found</div>
    }
    </>
  );
}

export default PlatformsView;