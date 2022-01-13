import React from "react";
import { Button, ButtonProps, useTheme } from "@material-ui/core";
import ScaleLoader from "react-spinners/ClipLoader";

import useStyles from './styles';
import { Message, messageType } from "../../CustomIntefaces/AppTypes";

export interface StdButtonProps extends ButtonProps {
  onHoverColor?:string,
  loading?:boolean,
  message?:Message|null
}

//Standard Button
const StdButton:React.FC<StdButtonProps> = ({onHoverColor, classes, loading=false, message=null, children, ...props}) => {
  const singleClass = useStyles();
  const theme = useTheme();

  const displayMessage = () => {
    console.log(message);
    if(message)
    {
      if(message.type === messageType.success)
      {
        return <div style={{color:"lightGreen"}}>{message.msg}</div>
      }
      else if(message.type === messageType.error)
      {
        return <div style={{color:"darkRed"}}>{message.msg}</div>
      }
      else
      {
        return <div style={{color:"darkYellow"}}>{message.msg}</div>
      }
    }
  }

  return (
    <>
      <Button className={singleClass.StdButton} classes={classes ? classes : {root:singleClass.StdButtonNS}} {...props}>
        {loading ?
          <ScaleLoader color={theme.palette.primary.contrastText} />
          :
          <>
          {children ? children : <></>}
          </>
        }
      </Button>
      {displayMessage()}
    </>
  );
}

export default StdButton;