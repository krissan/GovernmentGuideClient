import React from "react";
import { Typography } from "@material-ui/core";

import AdditionalInfoText from "./AdditionalInfoText";

import { StdProps } from "../../CustomIntefaces/StdProps";
import useStyles from './styles';

interface Props extends StdProps {
  additionalInfo?:string
}

const PageHeader:React.FC<Props> = ({children, style, additionalInfo=""}) => {
  const classes = useStyles();

  return (
    <div style={{marginBottom:20}}>
      <Typography className={classes.header} style={{...style}} variant="h5" gutterBottom component="div">
        {children}
      </Typography>
      <AdditionalInfoText>
        {additionalInfo}
      </AdditionalInfoText>
    </div>
  );
}

export default PageHeader;