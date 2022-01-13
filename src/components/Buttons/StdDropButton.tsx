import React, { useState } from "react";
import { ButtonProps } from "@material-ui/core";

import useStyles from './styles';
import StdButton, { StdButtonProps } from "./StdButton";

interface StdDropButtonProps extends StdButtonProps {
  dropFn:(files:Array<File>)=>void
}

//Standard Button
const StdDropButton:React.FC<StdDropButtonProps> = ({onHoverColor, classes, dropFn=(files:Array<File>)=>{}, ...props}) => {
  const singleClass = useStyles();
  const [highlighted, setHighlighted] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <StdButton
      loading={loading}
      className={singleClass.StdButton} 
      classes={{root: highlighted ? `${singleClass.dropHighLighted}` : `${singleClass.StdButtonNS}`}}
      onDragOver={(e)=>{
        e.preventDefault(); 
        setHighlighted(true);
      }} 
      onDragEnter={(e)=>{
        e.preventDefault(); 
        setHighlighted(true);
      }} 
      onDragLeave={(e)=>{
        e.preventDefault();
        setHighlighted(false);
      }}
      onDrop={(e)=>{
        e.preventDefault();
        setLoading(true);
        setHighlighted(false);
        const files:Array<File> = Array.from(e.dataTransfer.files)
        dropFn(files); 
        setLoading(false);
      }}
      {...props} />
  );
}

export default StdDropButton;