import React from "react";
import { Button, ButtonProps, Typography } from "@material-ui/core";

import useStyles from './styles';

interface SearchItemButtonProps extends ButtonProps {
  mainText?:string,
  subText1?:string,
  subText2?:string,
  selected?:boolean
}

//Search result clickable item
const SearchItem:React.FC<SearchItemButtonProps> = ({mainText, subText1, subText2, selected, ...props}) => {
  const classes = useStyles();

  return (
    <div>
        <Button classes={{root: selected ? `${classes.searchItem} ${classes.searchItemSelected}` : classes.searchItem}} {...props}>
            <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"start", width:"100%", padding:10, textTransform: "initial", paddingBottom:"5"}}>
                <Typography className={classes.header}>{mainText}</Typography>
                <Typography>{subText1}</Typography>
                <Typography>{subText2}</Typography>
            </div>
        </Button>
    </div>
    );
}

export default SearchItem;