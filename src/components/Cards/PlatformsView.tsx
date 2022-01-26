import React, { useEffect, useState } from "react";

import Symbol from "../Misc/Symbol";
import MiniHeader from "../Text/MiniHeader";
import MiniSubHeader from "../Text/MiniSubHeader";

import { Platform, RepBoundary, useAppContext,  } from "../../AppContext";
import { SymbolEnum } from "../../CustomIntefaces/Enumerators";
import StdText from "../Text/StdText";
import { useTheme } from "@material-ui/core";
import { getRepPlatforms } from "../../api/representative";
import { ScaleLoader } from "react-spinners";
import Status from "../Misc/Status";

interface PlatformsProps {
    repBoundary:RepBoundary,
}

//Representative Platforms
const PlatformsView:React.FC<PlatformsProps> = ({repBoundary}) => {
    const [platforms, setPlatforms] = useState<Array<Array<Platform|undefined>>>([]);
    const { repBoundaries, setRepBoundaries } = useAppContext();
    const theme = useTheme();
    const [tabLoading, setTabLoading] = useState<boolean>(false);
    
     //grab representative platforms and make it available globally if not already
    useEffect(() => {
        const fetchPlatforms = async() => {
            setTabLoading(true);
            if(!repBoundary.platforms || repBoundary?.platforms?.length < 1){
                const index = repBoundaries.indexOf(repBoundary);
                let newRepBoundary = repBoundary;
                const plats:Array<Platform> =  await getRepPlatforms(repBoundary.rep.id);

                newRepBoundary.platforms = plats;

                const newRepBoundaries = Object.assign([...repBoundaries], {
                    [index]: newRepBoundary
                });
                setRepBoundaries(newRepBoundaries);

            }
            setTabLoading(false);
        }

        fetchPlatforms();
    }, [])

    //Create list of a list of platforms grouped by category
    useEffect(() => {
        var platforms = repBoundary.platforms;

        var structPlatList:Array<Array<Platform|undefined>> = [];
        //loop through platforms and if current item has category already in structPlatList add it to specific group
        if(platforms && platforms.length>0)
        {
            platforms?.forEach((plat)=>{
                let exists:Boolean = false;
                //check if plat category already exists in struct list and break out of loop if it does
                for(let i = 0; i < structPlatList.length; i++)
                {
                    if(structPlatList[i][0] && plat.category === structPlatList[i][0]?.category){
                        
                        structPlatList[i].push(plat);
                        exists = true;
                        break;
                    }
                }

                if(exists === false)
                {
                    structPlatList.push([plat]);
                }
            });

            setPlatforms(structPlatList);
        }    }, [repBoundary.platforms])

  return (
    <>
    {tabLoading ?
        <div style={{display:"flex", justifyContent:"center"}}>
            <ScaleLoader color={theme.palette.primary.dark} />
        </div>
        :
        <>
        {platforms && platforms.length > 0 ?
                platforms?.map((pl)=>{
                    if(pl[0]){
                        return (<div key={pl[0].id} style={{paddingBottom:10}}>
                        <div style={{display:"flex"}}>
                            <Symbol style={{paddingRight:10}} displaySymbol={SymbolEnum[pl[0].category]}/>
                            <MiniHeader>{pl[0].category.toUpperCase()}</MiniHeader>
                        </div>
                        {pl?.map((p)=>{
                            return <div key={p?.name}>
                                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                                    <MiniSubHeader>{p?.name}</MiniSubHeader>
                                    {/*if status exists for platform display it*/
                                    p?.status && <Status status={p.status}/>}
                                </div>
                                <StdText>{p?.description}</StdText>
                            </div>
                        })}
                    </div>);
                    }
                })
            :
            <div>Platform not found</div>
        }
        </>
    }
    </>
  );
}

export default PlatformsView;