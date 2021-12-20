import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";

import useStyles from './styles';


const ToggleContainer = () => {
    const classes = useStyles();
    const [tab, setTab] = useState<string>("tl");

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newTab: string
      ) => {
          if(newTab != null)
          {
            setTab(newTab);
          }
      };

  return (
    <div>
        <ToggleButtonGroup
            value={tab}
            exclusive
            onChange={handleChange}
            classes={{root: classes.StdToggleContainer}}
            >
            <ToggleButton  value="tl">Time Line</ToggleButton>
            <ToggleButton  value="p">Platform</ToggleButton>
            <ToggleButton  value="r">Report Card</ToggleButton>
            <ToggleButton  value="b">Biography</ToggleButton>
        </ToggleButtonGroup>
        <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
    </div>
  );
}

export default ToggleContainer;