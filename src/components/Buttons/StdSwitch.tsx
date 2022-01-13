import * as React from 'react';
import { Switch, SwitchProps, Typography } from '@material-ui/core';

import useStyles from './styles';

interface StdSwitchProps extends SwitchProps {
    label: string;
}

//Standard Toggle Switch
const StdSwitch:React.FC<StdSwitchProps> = ({label,...props}) => {
  const classes = useStyles();
  
  return (
    <div style={{display:"flex", alignItems:"center"}}>
        <Switch   classes={{
            track: classes.switch_track,
            switchBase: classes.switch_base,
        }} {...props} />
        <Typography className={classes.StdSwitchAndLabel}>{label}</Typography>
    </div>
  );
}



export default StdSwitch;