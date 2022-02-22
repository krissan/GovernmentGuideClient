import React, { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import { useTheme } from "@material-ui/core";

import Symbol from "../../Misc/Symbol";
import MiniHeader from "../../Text/MiniHeader";
import ReportCardItem from "./ReportCardItem";

import { RepBoundary, ReportCard, useAppContext,  } from "../../../AppContext";
import { SymbolEnum } from "../../../customIntefaces/Enumerators";
import { getRepReportCards } from "../../../api/representative";
import { structCategoryList } from "../../../functions/stdAppFunctions";

interface ReportCardProps {
    repBoundary:RepBoundary,
}

//Representative Card
const ReportCardsListView:React.FC<ReportCardProps> = ({repBoundary}) => {
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
        if(repBoundary.reportCards){
            var reportCards = repBoundary.reportCards;
            var structRepCardList:Array<Array<ReportCard>> = structCategoryList(reportCards) as Array<Array<ReportCard>>;

            setReportCards(structRepCardList);
        }
        else
        {
            setReportCards([]);
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
            reportCards?.map((pl )=>{
                if(pl[0]) {
                    return (<div key={pl[0].id} style={{paddingBottom:10}}>
                        <div style={{display:"flex"}}>
                            <Symbol style={{paddingRight:10}} displaySymbol={SymbolEnum[pl[0].category]}/>
                            <MiniHeader>{pl[0].category.toUpperCase()}</MiniHeader>
                        </div>
                        {pl?.map((p)=>{
                            return <ReportCardItem key={p.id} rptCard={p} />
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

export default ReportCardsListView;