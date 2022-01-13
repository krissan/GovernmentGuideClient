import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";


import useStyles from './styles';

{/*Manage Website Data*/}
const ManageDataPage = () => {
  const classes = useStyles();
  let navigate = useNavigate();


  return (
    <div style={{display:"flex"}}>
      <Button variant="text" className={classes.dashBoardButton} onClick={()=>{navigate("/manageData/govBodyData")}}>
        Manage Government Body Data
      </Button>
      <Button variant="text" className={classes.dashBoardButton} onClick={()=>{console.log("hello")}}>
        Manage Report Card Data
      </Button>
    </div>
  );
}

export default ManageDataPage;