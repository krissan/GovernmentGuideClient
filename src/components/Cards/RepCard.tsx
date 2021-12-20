import { Button, Card, CardContent, Typography, useTheme } from "@material-ui/core";
import { faLeaf, faPhoneAlt, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"

import StdButton from "../Buttons/StdButton";
import CardSubHeader from "../Text/CardSubHeader";
import Grade from "../Misc/Grade";
import ButtonIcon from "../Buttons/ButtonIcon";
import CustomIconButtonAlt from "../Buttons/CustomIconButtonAlt";

import useStyles from './styles';
import StdSwitch from "../Buttons/StdSwitch";
import ToggleContainer from "../Misc/ToggleContainer";

import { Boundary, Rep, RepBoundary } from "../../AppContext";
import { useState } from "react";

interface RepCardProps {
    repBoundary:RepBoundary
  }

const RepCard:React.FC<RepCardProps> = ({repBoundary}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [expanded, setExpanded] = useState<Boolean>(false);

  const rep:Rep = repBoundary.rep;
  const boundary:Boundary = repBoundary.boundary;

  const subCardWidth=150;
  
    const call = (number:number) =>{
        console.log(number);
    }

    const email = (email:string) => {
        console.log(email);
    }

  return (
    <Card style={{backgroundColor:"#EAF6F6", marginBottom:"10px"}}>
        <CardContent style={{display:"flex", flexDirection:"column", paddingBottom:5}}>
            {/*Row 1*/}
            <div style={{display:"flex"}}>
                {/*Col 1*/}
                <img src={rep.photo} alt="Rep Photo" width={subCardWidth} height={subCardWidth} style={{margin:"0px 10px 10px 0px", borderRadius:"50%", objectFit:"cover"}}/>
                {/*Col 2*/}
                <div style={{flex:1, justifyContent:"space-between", flexDirection:"column"}}>
                <CardSubHeader>{boundary.repTitle+" "+rep.firstName+" "+rep.lastName}</CardSubHeader>
                <div style={{paddingLeft:10}}>
                    <div style={{paddingBottom:3}}>{boundary.boundaryName}</div>
                    <div style={{paddingBottom:3}}>{rep.gender ? rep.gender : "Unknown"}</div>
                    <div style={{paddingBottom:3}}>{rep.constituencyOffice}</div>
                </div>
                </div>
            </div>
            {/*Row 2*/}
            <div style={{display:"flex", paddingBottom:"10px"}}>
                {/*Col 1*/}
                <div style={{width:subCardWidth, paddingRight:"30px", display:"flex",alignItems:"center"}}>
                    <StdSwitch label="BOUNDARY" />
                </div>
                {/*Col 2*/}
                <div style={{display:"flex", justifyContent:"space-between", flex:1,alignItems:"center"}}>
                    <div style={{display:"flex"}}>
                        <Grade grade="A" icon={faLeaf} />
                        <Grade grade="A" icon={faLeaf} />
                        <Grade grade="A" icon={faLeaf} />
                    </div>
                    <div style={{display:"flex"}}>
                        <CustomIconButtonAlt style={{paddingRight:10}} onClick={()=>{email(rep.email)}}>
                            <ButtonIcon icon={faEnvelope}/>
                        </CustomIconButtonAlt>
                        <CustomIconButtonAlt onClick={()=>{call(rep.call)}}>
                            <ButtonIcon icon={faPhoneAlt}/>
                        </CustomIconButtonAlt>
                    </div>
                </div>
            </div>
            {/*Row 3*/}
            <div style={{display:"flex", paddingBottom:"10px"}}>
                {/*Col 1*/}
                <div style={{width:subCardWidth, paddingRight:"30px"}}>
                <StdButton classes={{root: classes.electionButton}} style={{width:"100%"}}>Election</StdButton>
                </div>
                {/*Col 2*/}
                <div style={{display:"flex", flex:1}}>
                <Typography className={classes.miniHeader}>Tags:</Typography>
                <Typography style={{paddingRight:5, wordWrap:"normal", fontSize:15}}>Deputy Mayor | Executive Committee</Typography>
                </div>
            </div>
            {
                expanded ?
                <>
                    {/*Divider*/}
                    <div style={{backgroundColor:"white", height:2, margin:"20px 10px"}}>
                    </div>
                    {/*Row 4*/}
                    <ToggleContainer/>
                </>
                :
                <></>
            }
            <Button variant="text" style={{padding:10, marginTop:5, backgroundColor:"transparent"}} onClick={()=>{setExpanded(!expanded)}}>
                <ButtonIcon style={{color:theme.palette.primary.main, fontSize:45, transform: expanded ? "rotate(180deg)" : ""}} icon={faChevronDown}/>
            </Button>
        </CardContent>
    </Card>
  );
}

export default RepCard;