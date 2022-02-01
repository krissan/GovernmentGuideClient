import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Button, Card, CardContent, Typography, useTheme } from "@material-ui/core";
import { faPhoneAlt, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"

import StdButton from "../Buttons/StdButton";
import CardSubHeader from "../Text/CardSubHeader";
import Grade from "../Misc/Grade";
import ButtonIcon from "../Buttons/ButtonIcon";
import CustomIconButtonAlt from "../Buttons/CustomIconButtonAlt";
import MiniHeader from "../Text/MiniHeader";

import useStyles from './styles';
import StdSwitch from "../Buttons/StdSwitch";
import ToggleContainer from "../Misc/ToggleContainer";
import { Boundary, Rep, RepBoundary, useAppContext } from "../../AppContext";
import appValues from "../../resources/AppValues";
import { MailTo } from "../../functions/stdAppFunctions";


interface RepCardProps {
    repBoundary:RepBoundary,
    boundaryToggled:RepBoundary|null, 
    setBoundaryToggled:Dispatch<SetStateAction<RepBoundary | null>>,
}

//Representative Card
const RepresentativeCard:React.FC<RepCardProps> = ({repBoundary, boundaryToggled, setBoundaryToggled}) => {
    const classes = useStyles();
    const theme = useTheme();
    const [expanded, setExpanded] = useState<boolean>(false);
    const [brightness, setBrightness] = useState<number>(1);
    const [elevation, setElevation] = useState<number>(1);

    const rep:Rep = repBoundary.rep;
    const boundary:Boundary = repBoundary.boundary;

    //call number passed
    const call = (number:number) =>{
        navigator.clipboard.writeText(number.toString());
        alert("Copied "+number+" to clip board");
    }

    //Toggle Boundary if already selected
    const toggleBoundary = () => {
        if(repBoundary.boundary.id===boundaryToggled?.boundary.id)
        {
            setBoundaryToggled(null);
        }
        else
        {
            setBoundaryToggled(repBoundary);
        }
    }


    useEffect(()=>{
        if(repBoundary.boundary.id===boundaryToggled?.boundary.id){
            setBrightness(0.95);
            setElevation(5);
        }
        else
        {
            setBrightness(1);
            setElevation(1);
        }

    }, [repBoundary.boundary.id, boundaryToggled?.boundary.id]);

  return (
    <Card style={{backgroundColor: theme.palette.primary.light, filter: "brightness("+brightness+")", marginBottom:"10px"}} elevation={elevation}>
        <CardContent style={{display:"flex", flexDirection:"column", paddingBottom:5}}>
            {/*Row 1 Representative Basic Data*/}
            <div style={{display:"flex"}}>
                {/*Col 1*/}
                <img src={rep.photo} alt="Representative" width={appValues.subCardWidth} height={appValues.subCardWidth} style={{margin:"0px 10px 10px 0px", /*borderRadius:"50%", objectFit:"cover"*/ objectFit:"contain"}}/>
                {/*Col 2*/}
                <div style={{flex:1, justifyContent:"space-between", flexDirection:"column"}}>
                <CardSubHeader>{boundary.repTitle+" "+rep.firstName+" "+rep.lastName}</CardSubHeader>
                <div style={{paddingLeft:10}}>
                    <div style={{paddingBottom:3}}>{boundary.boundaryName}</div>
                    <div style={{paddingBottom:3}}>{rep.gender ? rep.gender : "Gender Not Found"}</div>
                    <div style={{paddingBottom:3}}>{rep.constituencyOffice}</div>
                </div>
                </div>
            </div>
            {/*Row 2 Representative Grades, Email, Call, Toggle Boundary,*/}
            <div style={{display:"flex", paddingBottom:"10px"}}>
                {/*Col 1*/}
                <div style={{width:appValues.subCardWidth, paddingRight:"30px", display:"flex",alignItems:"center"}}>
                    <StdSwitch label="BOUNDARY" checked={repBoundary.boundary.id===boundaryToggled?.boundary.id} onClick={()=>{toggleBoundary()}} />
                </div>
                {/*Col 2*/}
                <div style={{display:"flex", justifyContent:"space-between", flex:1,alignItems:"center"}}>
                    <div style={{display:"flex"}}>
                        <Grade grade="A" />
                        <Grade grade="A" />
                        <Grade grade="A" />
                    </div>
                    <div style={{display:"flex"}}>
                        <CustomIconButtonAlt style={{paddingRight:10}} onClick={()=>{MailTo(rep.email)}}>
                            <ButtonIcon icon={faEnvelope}/>
                        </CustomIconButtonAlt>
                        
                        <CustomIconButtonAlt onClick={()=>{call(rep.call)}}>
                            <ButtonIcon icon={faPhoneAlt}/>
                        </CustomIconButtonAlt>
                    </div>
                </div>
            </div>
            {/*Row 3 Election Button, Tags*/}
            <div style={{display:"flex", paddingBottom:"10px"}}>
                {/*Col 1*/}
                <div style={{width:appValues.subCardWidth, paddingRight:"30px"}}>
                    <StdButton classes={{root: classes.electionButton}} style={{width:"100%"}}>Election</StdButton>
                </div>
                {/*Col 2*/}
                <div style={{display:"flex", flex:1}}>
                <MiniHeader>Tags:</MiniHeader>
                <Typography style={{paddingRight:5, wordWrap:"normal", fontSize:15}}>Deputy Mayor | Executive Committee</Typography>
                </div>
            </div>
            {
                expanded ?
                <>
                    {/*Divider*/}
                    <div style={{backgroundColor:"white", height:2, margin:"20px 10px"}}>
                    </div>
                    {/*Row 4 Representative Advanced Info*/}
                    <ToggleContainer repBoundary={repBoundary}/>
                </>
                :
                <></>
            }

            {/*Expand/Collapse arrow button*/}
            <Button variant="text" style={{padding:"0px 10px", backgroundColor:"transparent"}} onClick={()=>{setExpanded(!expanded)}}>
                <ButtonIcon style={{color:theme.palette.primary.main, fontSize:45, transform: expanded ? "rotate(180deg)" : ""}} icon={faChevronDown}/>
            </Button>
        </CardContent>
    </Card>
  );
}

export default RepresentativeCard;