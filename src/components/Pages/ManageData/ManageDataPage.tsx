import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";


import useStyles from '../styles';

{/*Manage Website Data*/}
const ManageDataPage = () => {
  const classes = useStyles();
  let navigate = useNavigate();


  return (
    <div style={{display:"flex", flexDirection:"column"}}>
      <div style={{display:"flex", padding:"10px 10px"}}>
        <Button variant="text" className={classes.dashBoardButton} onClick={()=>{navigate("/manageData/govBodyData")}}>
          Manage Government Body Data
        </Button>
        <Button variant="text" className={classes.dashBoardButton} onClick={()=>{navigate("/manageData/partyData")}}>
          Manage GovBody Parties
        </Button>
      </div>
      <div style={{display:"flex", padding:"10px 10px"}}>
        <Button variant="text" className={classes.dashBoardButton} onClick={()=>{navigate("/manageData/representativeData")}}>
          Manage GovBody Representatives
        </Button>
        <Button variant="text" className={classes.dashBoardButton} onClick={()=>{navigate("/manageData/billData")}}>
          Manage Bill Data
        </Button>
      </div>
      <div style={{display:"flex", padding:"10px 10px"}}>
        <Button variant="text" className={classes.dashBoardButton} onClick={()=>{navigate("/manageData/electionData")}}>
          Manage Elections
        </Button>
        <Button variant="text" className={classes.dashBoardButton} onClick={()=>{navigate("/manageData/electionCandidateData")}}>
          Manage Elections Candidates
        </Button>
      </div>
    </div>
  );
}

export default ManageDataPage;