import React, { useEffect, useState } from "react";
import { useTheme } from "@material-ui/core";

import Symbol from "../../Misc/Symbol";
import MiniHeader from "../../Text/MiniHeader";
import PlatformItem from "./PlatformItem";

import { Platform, RepBoundary, useAppContext,  } from "../../../AppContext";
import { getRepPlatforms } from "../../../api/representative";
import { ScaleLoader } from "react-spinners";
import { structCategoryList } from "../../../functions/stdAppFunctions";
import { SymbolEnum } from "../../../customIntefaces/Enumerators";

interface PlatformsProps {
    repBoundary:RepBoundary,
}

//Representative Platforms
const PlatformsListView:React.FC<PlatformsProps> = ({repBoundary}) => {
    const [platforms, setPlatforms] = useState<Array<Array<Platform>>>([]);
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
        if(repBoundary.platforms){
            var platforms = repBoundary.platforms;
            var structRepCardList:Array<Array<Platform>> = structCategoryList(platforms) as Array<Array<Platform>>;

            setPlatforms(structRepCardList);
        }
        else
        {
            setPlatforms([]);
        }
    }, [repBoundary.platforms])

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
                            return <PlatformItem plat={p} />
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

export default PlatformsListView;