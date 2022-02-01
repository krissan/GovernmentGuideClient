import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useStyles from './styles';
import { SymbolType } from "../../customIntefaces/Enumerators";

interface SymbolProps {
  displaySymbol:SymbolType,
  style:React.CSSProperties
}

//Category Symbol
const Symbol:React.FC<SymbolProps> = ({displaySymbol,style}) => {
  const classes = useStyles();

  return (
    <FontAwesomeIcon style={style} color={displaySymbol.color} className={classes.symbol} icon={displaySymbol.icon} />
  );
}

export default Symbol;