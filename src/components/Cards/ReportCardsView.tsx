import React, { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import { useTheme } from "@material-ui/core";

import Symbol from "../Misc/Symbol";
import MiniHeader from "../Text/MiniHeader";
import MiniSubHeader from "../Text/MiniSubHeader";
import StdText from "../Text/StdText";

import { Endorsement, RepBoundary, ReportCard, useAppContext,  } from "../../AppContext";
import { SymbolEnum } from "../../CustomIntefaces/Enumerators";
import { getRepReportCards } from "../../api/representative";
import Grade from "../Misc/Grade";

interface ReportCardProps {
    repBoundary:RepBoundary,
}

//Representative Card
const ReportCardsView:React.FC<ReportCardProps> = ({repBoundary}) => {
    const [reportCards, setReportCards] = useState<Array<Array<ReportCard>>>([]);
    const { repBoundaries, setRepBoundaries } = useAppContext();
    const theme = useTheme();
    const [tabLoading, setTabLoading] = useState<boolean>(false);
    
     //grab representative endorsements and make it available globally if not already
    useEffect(() => {
        const fetchReportCards = async() => {
            setTabLoading(true);

            if(!repBoundary.reportCards || repBoundary?.reportCards?.length < 1){
                const index = repBoundaries.indexOf(repBoundary);
                let newRepBoundary = repBoundary;
                const repCards:Array<ReportCard> =  await getRepReportCards(repBoundary.rep.id);
                newRepBoundary.reportCards = repCards;
                console.log(repCards);
                const newRepBoundaries = Object.assign([...repBoundaries], {
                    [index]: newRepBoundary
                });
                setRepBoundaries(newRepBoundaries);

            }

            setTabLoading(false);
        }

        fetchReportCards();
    }, [])

    //Create list of a list of report cards grouped by category
    useEffect(() => {
        var reportCards = repBoundary.reportCards;

        var structRepCardList:Array<Array<ReportCard>> = [];
        //loop through report cards and if current item has title already in structEndoList add it to specific group
        if(reportCards && reportCards.length>0)
        {
            reportCards?.forEach((repCard)=>{
                    let exists:Boolean = false;
                    //check if report cards title already exists in struct list and break out of loop if it does
                    for(let i = 0; i < structRepCardList.length; i++)
                    {
                        console.log(structRepCardList[i]);
                        if(structRepCardList[i][0] && repCard.category === structRepCardList[i][0]?.category){
                            
                            structRepCardList[i].push(repCard);
                            exists = true;
                            break;
                        }
                    }

                    if(exists === false)
                    {
                        structRepCardList.push([repCard]);
                    }
                });

                setReportCards(structRepCardList);
            }
       }, [repBoundary.reportCards])


  return (
    <>
    {tabLoading ?
        <div style={{display:"flex", justifyContent:"center"}}>
            <ScaleLoader color={theme.palette.primary.dark} />
        </div>
        :
        <>
        {reportCards && reportCards.length > 0 ?
            reportCards?.map((pl)=>{
                if(pl[0]) {
                    return (<div key={pl[0].id} style={{paddingBottom:10}}>
                        <div style={{display:"flex"}}>
                            <Symbol style={{paddingRight:10}} displaySymbol={SymbolEnum[pl[0].category]}/>
                            <MiniHeader>{pl[0].category.toUpperCase()}</MiniHeader>
                        </div>
                        {pl?.map((p)=>{
                            return <div key={p.id}>
                                <div style={{display:"flex"}}>
                                    <MiniSubHeader>{p.name}</MiniSubHeader>
                                    <Grade grade={p.grade} />
                                </div>
                                <StdText>{p.description}</StdText>
                            </div>
                        })}
                    </div>);
                }
            })
        :
            <div>Report Card not found</div>
        }
        </>
    }
    </>  
  );
}

export default ReportCardsView;