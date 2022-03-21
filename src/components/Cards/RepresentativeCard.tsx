import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Button, Card, CardContent, Typography, useTheme } from "@material-ui/core";
import { faPhoneAlt, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"

import StdButton from "../Buttons/StdButton";
import CardSubHeader from "../Text/CardSubHeader";
import ButtonIcon from "../Buttons/ButtonIcon";
import CustomIconButtonAlt from "../Buttons/CustomIconButtonAlt";
import MiniHeader from "../Text/MiniHeader";
import StdSwitch from "../Buttons/StdSwitch";
import ToggleContainer from "../Misc/ToggleContainer";

import useStyles from './styles';
import { Boundary, Representative, RepBoundary, useAppContext } from "../../AppContext";
import appValues from "../../resources/AppValues";
import { call, mailTo } from "../../functions/stdAppFunctions";
import { useNavigate } from "react-router-dom";
import { Nullable } from "../../customIntefaces/AppTypes";


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
    const partyColor = repBoundary.rep.partyColor ? "#"+repBoundary.rep.partyColor : "black";

    const rep:Representative = repBoundary.rep;
    const boundary:Nullable<Boundary> = repBoundary.boundary ? repBoundary.boundary : null;
    
    //App Context
    const { setSelectedER } = useAppContext();


    let navigate = useNavigate();

    //Toggle Boundary if already selected
    const toggleBoundary = () => {
        if(repBoundary.boundary) {
            if(repBoundary.boundary.id===boundaryToggled?.boundary?.id)
            {
                setBoundaryToggled(null);
            }
            else
            {
                setBoundaryToggled(repBoundary);
            }
        }
    }


    useEffect(()=>{
        if(repBoundary.boundary) {
            if(repBoundary.boundary?.id===boundaryToggled?.boundary?.id){
                setBrightness(0.95);
                setElevation(5);
            }
            else
            {
                setBrightness(1);
                setElevation(1);
            }
        }
    }, [repBoundary.boundary?.id, boundaryToggled?.boundary?.id, repBoundary.boundary]);

  return (
    <Card style={{backgroundColor: theme.palette.primary.light, filter: "brightness("+brightness+")", marginBottom:"10px"}} elevation={elevation}>
        <CardContent style={{display:"flex", flexDirection:"column", paddingBottom:5}}>
            {/*Row 1 Representative Basic Data*/}
            <div style={{display:"flex"}}>
                {/*Col 1*/}
                <img src={rep.photo} alt="Representative" width={appValues.subCardWidth} height={appValues.subCardWidth} style={{margin:"0px 10px 10px 0px", /*borderRadius:"50%", objectFit:"cover"*/ objectFit:"contain"}}/>
                {/*Col 2*/}
                <div style={{flex:1, justifyContent:"space-between", flexDirection:"column"}}>
                <CardSubHeader>{boundary?.repTitle+" "+rep.firstName+" "+rep.lastName}</CardSubHeader>
                <div style={{paddingLeft:10}}>
                    {rep.party && <div style={{paddingBottom:3, display:"flex", alignItems:"center"}}>
                        <span style={{fontWeight:"bold", color:partyColor}}>{rep.party}</span> 
                        {rep.partyImage && 
                            <img src={rep.partyImage} alt={rep.partyImage} height="25px" style={{marginLeft:"15px", objectFit:"fill"}}/>
                        }
                    </div>}
                    <div style={{paddingBottom:3}}>{boundary?.boundaryName}</div>
                    <div style={{paddingBottom:3}}>{rep.gender ? rep.gender : "Gender Not Found"}</div>
                    <div style={{paddingBottom:3}}>{rep.constituencyOffice}</div>
                </div>
                </div>
            </div>
            {/*Row 2 Representative Grades, Email, Call, Toggle Boundary,*/}
            <div style={{display:"flex", paddingBottom:"10px"}}>
                {/*Col 1*/}
                <div style={{width:appValues.subCardWidth, paddingRight:"30px", display:"flex",alignItems:"center"}}>
                    {//Display boundary toggle if it exists
                    repBoundary.boundary && <StdSwitch label="BOUNDARY" checked={repBoundary.boundary?.id===boundaryToggled?.boundary?.id} onClick={()=>{toggleBoundary()}} />}
                </div>
                {/*Col 2*/}
                <div style={{display:"flex", justifyContent:"space-between", flex:1, alignItems:"center", alignContent:"bottom"}}>
                    <div style={{display:"flex"}}>
                        {/*High Light*/}
                        {/*
                        <MiniHeader>Environment</MiniHeader>
                        <Grade grade="D" />
                        */}
                    </div>
                    <div style={{display:"flex"}}>
                        <CustomIconButtonAlt style={{paddingRight:10}} onClick={()=>{mailTo(rep.email)}}>
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
                    {repBoundary.eleRiding &&
                        <StdButton classes={{root: classes.electionButton}} style={{width:"100%"}} onClick={()=>{setSelectedER(repBoundary.eleRiding ? repBoundary.eleRiding : null);navigate("/election")}}>Election</StdButton>
                    }
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