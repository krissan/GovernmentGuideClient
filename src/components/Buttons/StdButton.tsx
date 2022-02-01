import React from "react";
import { Button, ButtonProps, useTheme } from "@material-ui/core";
import ScaleLoader from "react-spinners/ClipLoader";

import useStyles from './styles';
import { Message } from "../../customIntefaces/AppTypes";
import { messageType } from "../../customIntefaces/Enumerators";
import { Color } from "@mui/material";

export interface StdButtonProps extends ButtonProps {
  onHoverColor?:string,
  loading?:boolean,
  message?:Message|null
}

//Standard Button
const StdButton:React.FC<StdButtonProps> = ({onHoverColor, classes, loading=false, message=null, children, ...props}) => {
  const singleClass = useStyles();
  const theme = useTheme();

  const getColor = ():string => {
    if(message)
    {
      if(message.type === messageType.success)
      {
        return theme.palette.warning.main;
      }
      else if(message.type === messageType.error)
      {
        return theme.palette.error.main;
      }
      else
      {
        return theme.palette.warning.dark;
      }
    }

    return theme.palette.warning.dark;
  }

  return (
    <div style={{display:"flex", flexDirection:"column"}}>
      <Button className={singleClass.StdButton} classes={classes ? classes : {root:singleClass.StdButtonNS}} {...props}>
        {loading ?
          <ScaleLoader color={theme.palette.primary.contrastText} />
          :
          <>
          {children ? children : <></>}
          </>
        }
      </Button>
      {(message && message.msg !== '') &&
        <div style={{padding:"2px 5px", color:theme.palette.primary.contrastText, fontWeight:"500", backgroundColor:getColor()}}>{message.msg}</div>
      }
    </div>
  );
}

export default StdButton;