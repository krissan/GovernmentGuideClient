import React, { useEffect, useState } from "react";

import { Biography, RepBoundary,  } from "../../AppContext";
import StdText from "../Text/StdText";

interface BiographyProps {
    repBoundary:RepBoundary,
}

//Representative Card
const BiographyView:React.FC<BiographyProps> = ({repBoundary}) => {
    const [biography, setBiography] = useState<Biography|undefined>();

    useEffect(() => {
        if(!repBoundary.biography){
            //change this to to import
            //if successfully imported run structureBiographyList()
        }
    }, [repBoundary.biography])

  return (
    <>
    {biography ?
        <>
        <StdText>{biography.bio}</StdText>
        <StdText>Last Updated {biography.updateDate}</StdText>
        </>
        :
        <div>Biography not found</div>
    }
    </>
  );
}

export default BiographyView;