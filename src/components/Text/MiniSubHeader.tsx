import { Typography, TypographyProps } from "@material-ui/core";
import React from "react";

import useStyles from './styles';


const MiniSubHeader:React.FC<TypographyProps> = ({children, style}) => {
  const styles = useStyles();

  return (
    <Typography style={style} classes={{root: styles.stdGray}} className={styles.miniSubHeader}>
    {children}
    </Typography>
  );
}

export default MiniSubHeader;