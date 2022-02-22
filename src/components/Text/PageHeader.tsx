import React from "react";
import { Typography } from "@material-ui/core";

import AdditionalInfoText from "./AdditionalInfoText";

import { StdProps } from "../../customIntefaces/StdProps";
import useStyles from './styles';
import { __String } from "typescript";

interface Props extends StdProps {
  additionalInfo?:string | null,
  subHeader?:String
}

const PageHeader:React.FC<Props> = ({children, style, subHeader, additionalInfo=""}) => {
  const classes = useStyles();

  return (
    <div style={{marginBottom:20}}>
      <Typography className={classes.header} style={{...style}} variant="h5" gutterBottom component="div">
        {children}
      </Typography>
      {subHeader && <Typography className={classes.subHeader} style={{...style}} variant="h5" gutterBottom component="div">
        {subHeader}
      </Typography>}
      {additionalInfo && <AdditionalInfoText>
        {additionalInfo}
      </AdditionalInfoText>}
    </div>
  );
}

export default PageHeader;