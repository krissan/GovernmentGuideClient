import { useTheme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import { getRepBiography } from "../../../api/representative";

import MiniSubHeader from "../../Text/MiniSubHeader";
import StdText from "../../Text/StdText";

import { Biography  } from "../../../AppContext";
import { Nullable, RepTabProps } from "../../../customIntefaces/AppTypes";

interface HistoryProps  extends RepTabProps {
}

//Representative History
const HistoryView:React.FC<HistoryProps> = ({repData, reps, setReps}) => {
    const theme = useTheme();
    const [tabLoading, setTabLoading] = useState<boolean>(false);
    
    //grab repboundaries biography and make it available globally if not already
    useEffect(() => {
        const fetchBiography = async() => {
            setTabLoading(true);

            if(!repData.biography){
                let newRepBoundary = repData;
                const bio:Nullable<Biography> =  await getRepBiography(repData.rep.id);
                newRepBoundary.biography =  bio;

                const newRepBoundaries = reps.set(repData.rep.id, newRepBoundary);
                setReps(newRepBoundaries);
            }

            setTabLoading(false);
        }

        fetchBiography();

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return (
    <>
    {tabLoading ?
        <div style={{display:"flex", justifyContent:"center"}}>
            <ScaleLoader color={theme.palette.primary.dark} />
        </div>
        :
        <>
            {repData.biography?.bio ?
                <div style={{flexDirection:"column"}}>
                    <StdText>{repData.biography?.bio}</StdText>
                    <MiniSubHeader>Last Updated {repData.biography?.updateDate}</MiniSubHeader>
                </div>
                :
                <div>Biography not found</div>
            }
        </>
    }
    </>
  );
}

export default HistoryView;