import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    header: {
        color: theme.palette.primary.dark,
        fontWeight:"bold"
    },
    additonalInfo: {
        color: theme.palette.primary.dark,
    },
    subHeader: {
        color:theme.palette.primary.dark
    },
    stepHeader: {
        color:theme.palette.secondary.main,
        fontSize:18,
        fontWeight:"bold"
    },
    stepSubHeader: {
        color:theme.palette.secondary.main,
        fontSize:16,
        fontWeight:"bold"
    },
    miniHeader:{
        color:theme.palette.primary.dark, 
        fontWeight:"bold", 
        paddingRight:5
    },
    miniSubHeader:{
        fontWeight:"bold", 
        fontSize:15,
        paddingRight:5
    },
    stdGray:{
        color:theme.palette.secondary.main
    },
    stdText:{
        fontSize:15,
    },
}));