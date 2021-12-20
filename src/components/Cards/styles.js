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
    miniHeader:{
        color:theme.palette.primary.dark, 
        fontWeight:"bold", 
        paddingRight:5
    }
}));