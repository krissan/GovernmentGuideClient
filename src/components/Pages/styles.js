import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    boundaryButton: {
        backgroundColor:theme.palette.primary.main,
        '&:hover':{
            backgroundColor:theme.palette.primary.dark
        }
    },
    electionButton:{
        backgroundColor:theme.palette.warning.main,
        '&:hover':{
            backgroundColor:theme.palette.warning.dark
        }
    },
    dashBoardButton:{
        backgroundColor:theme.palette.primary.main,
        width:"50%",
        height:"200px",
        margin: "0px 20px",
        color: theme.palette.primary.contrastText,
        fontSize:25,
        '&:hover':{
            backgroundColor:theme.palette.primary.dark
        } 
    }
}));