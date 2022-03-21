import React, { useEffect, useState } from "react";
import { useTheme } from "@material-ui/core";

import Symbol from "../../Misc/Symbol";
import MiniHeader from "../../Text/MiniHeader";
import PlatformItem from "./PlatformItem";

import { Platform  } from "../../../AppContext";
import { getRepPlatforms } from "../../../api/representative";
import { ScaleLoader } from "react-spinners";
import { structCategoryList } from "../../../functions/stdAppFunctions";
import { SymbolEnum } from "../../../customIntefaces/Enumerators";
import { RepTabProps } from "../../../customIntefaces/AppTypes";

interface PlatformsProps extends RepTabProps {
}

//Representative Platforms
const PlatformsListView:React.FC<PlatformsProps> = ({repData, reps, setReps}) => {
    const [platforms, setPlatforms] = useState<Array<Array<Platform>>>([]);
    const theme = useTheme();
    const [tabLoading, setTabLoading] = useState<boolean>(false);
    
     //grab representative platforms and make it available globally if not already
    useEffect(() => {
        const fetchPlatforms = async() => {
            setTabLoading(true);
            if(!repData.platforms || repData?.platforms?.length < 1){
                let newRepBoundary = repData;
                const plats:Array<Platform> =  await getRepPlatforms(repData.rep.id);
                newRepBoundary.platforms = plats;

                const newRepBoundaries = reps.set(repData.rep.id, newRepBoundary);
                setReps(newRepBoundaries);
            }
            setTabLoading(false);
        }

        fetchPlatforms();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //Create list of a list of platforms grouped by category
    useEffect(() => {
        if(repData.platforms){
            var platforms = repData.platforms;
            var structRepCardList:Array<Array<Platform>> = structCategoryList(platforms) as Array<Array<Platform>>;

            setPlatforms(structRepCardList);
        }
        else
        {
            setPlatforms([]);
        }
    }, [repData.platforms])

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
                            return <PlatformItem key={p.id} plat={p} />
                        })}
                    </div>);
                    }
                    return <div></div>;
                })
            :
            <div>Platform not found</div>
        }
        </>
    }
    </>
  );
}

export default PlatformsListView;