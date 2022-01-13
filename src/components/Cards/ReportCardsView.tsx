import React, { useEffect, useState } from "react";

import Symbol from "../Misc/Symbol";
import MiniHeader from "../Text/MiniHeader";
import MiniSubHeader from "../Text/MiniSubHeader";

import { RepBoundary, ReportCard  } from "../../AppContext";
import { SymbolEnum } from "../../CustomIntefaces/Enumerators";
import StdText from "../Text/StdText";

interface ReportCardProps {
    repBoundary:RepBoundary,
}

//Representative Card
const PlatformsView:React.FC<ReportCardProps> = ({repBoundary}) => {
    const [reportCards, setReportCards] = useState<Array<Array<ReportCard|undefined>>>([]);

    useEffect(() => {
        if(!repBoundary.reportCards){
            //change this to to import
            //if successfully imported run structurePlatformList()
        }
    }, [repBoundary.reportCards])


    //Create list of a list of platforms grouped by title
    const structReportCardList = () => {
        var reportCards = repBoundary.reportCards;

        var structReportCardList:Array<Array<ReportCard|undefined>> = [];
        //loop through platforms and if current item has title already in structPlatList add it to specific group
        if(reportCards && reportCards.length>0)
        {
            reportCards?.forEach((rptCard)=>{
                let exists:Boolean = false;
                //check if plat title already exists in struct list and break out of loop if it does
                for(let i = 0; i < structReportCardList.length; i++)
                {
                    console.log(structReportCardList[i]);
                    if(structReportCardList[i][0] && rptCard.category === structReportCardList[i][0]?.category){
                        
                        structReportCardList[i].push(rptCard);
                        exists = true;
                        break;
                    }
                }

                if(exists === false)
                {
                    structReportCardList.push([rptCard]);
                }
            });

            setReportCards(structReportCardList);
        }
    }

  return (
    <>
        {
            reportCards && reportCards.length > 0 ?
                reportCards?.map((pl)=>{
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
                                    <div style={{border:"1px solid black"}}>{p?.grade}</div>
                                </div>
                                <StdText>{p?.description}</StdText>
                            </>
                        })}
                    </div>);
                    }
                })
            :
            <div>Report Card not found</div>
        }
    </>
  );
}

export default PlatformsView;  