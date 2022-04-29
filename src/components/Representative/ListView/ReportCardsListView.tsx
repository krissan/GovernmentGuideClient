import React, { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import { useTheme } from "@material-ui/core";

import Symbol from "../../Misc/Symbol";
import MiniHeader from "../../Text/MiniHeader";
import ReportCardItem from "./ReportCardItem";

import { ReportCard  } from "../../../AppContext";
import { SymbolEnum } from "../../../customIntefaces/Enumerators";
import { getRepReportCards } from "../../../api/representative";
import { structCategoryList } from "../../../functions/stdAppFunctions";
import { RepTabProps } from "../../../customIntefaces/AppTypes";

interface ReportCardProps  extends RepTabProps {
}

//Representative Card
const ReportCardsListView:React.FC<ReportCardProps> = ({repData, reps, setReps}) => {
    const [reportCards, setReportCards] = useState<Array<Array<ReportCard>>>([]);
    const theme = useTheme();
    const [tabLoading, setTabLoading] = useState<boolean>(false);
    
     //grab representative endorsements and make it available globally if not already
    useEffect(() => {
        const fetchReportCards = async() => {
            setTabLoading(true);

            if(!repData.reportCards || repData?.reportCards?.length < 1){
                let newRepBoundary = repData;
                const repCards:Array<ReportCard> =  await getRepReportCards(repData.rep.id);
                newRepBoundary.reportCards = repCards;
                
                const newRepBoundaries = reps.set(repData.rep.id, newRepBoundary);
                setReps(newRepBoundaries);
            }

            setTabLoading(false);
        }

        fetchReportCards();

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //Create list of a list of report cards grouped by category
    useEffect(() => {
        if(repData.reportCards){
            var reportCards = repData.reportCards;
            var structRepCardList:Array<Array<ReportCard>> = structCategoryList(reportCards) as Array<Array<ReportCard>>;

            setReportCards(structRepCardList);
        }
        else
        {
            setReportCards([]);
        }
    }, [repData.reportCards])


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
                            return <ReportCardItem key={p.id} rptCard={p} />
                        })}
                    </div>);
                }
                return <div></div>;
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