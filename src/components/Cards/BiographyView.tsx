import { useTheme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import { getRepBiography } from "../../api/representative";

import { Biography, RepBoundary, useAppContext,  } from "../../AppContext";
import { Nullable } from "../../CustomIntefaces/AppTypes";
import MiniSubHeader from "../Text/MiniSubHeader";
import StdText from "../Text/StdText";

interface BiographyProps {
    repBoundary:RepBoundary,
}

//Representative Biography
const BiographyView:React.FC<BiographyProps> = ({repBoundary}) => {
    const { repBoundaries, setRepBoundaries } = useAppContext();
    const theme = useTheme();
    const [tabLoading, setTabLoading] = useState<boolean>(false);
    
    //grab repboundaries biography and make it available globally if not already
    useEffect(() => {
        const fetchBiography = async() => {
            setTabLoading(true);

            if(!repBoundary.biography){

                const index = repBoundaries.indexOf(repBoundary);
                let newRepBoundary = repBoundary;
                const bio:Nullable<Biography> =  await getRepBiography(repBoundary.rep.id);

                newRepBoundary.biography =  bio;

                if(index)
                {}
                const newRepBoundaries = Object.assign([...repBoundaries], {
                    [index]: newRepBoundary
                });
                setRepBoundaries(newRepBoundaries);

            }

            setTabLoading(false);
        }

        fetchBiography();
    }, [])

  return (
    <>
    {tabLoading ?
        <div style={{display:"flex", justifyContent:"center"}}>
            <ScaleLoader color={theme.palette.primary.dark} />
        </div>
        :
        <>
            {repBoundary.biography?.bio ?
                <div style={{flexDirection:"column"}}>
                    <StdText>{repBoundary.biography?.bio}</StdText>
                    <MiniSubHeader>Last Updated {repBoundary.biography?.updateDate}</MiniSubHeader>
                </div>
                :
                <div>Biography not found</div>
            }
        </>
    }
    </>
  );
}

export default BiographyView;