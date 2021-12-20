import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  stdInput: {
    width:400,
    color:theme.palette.primary.dark,
    paddingBottom:20,
    '& .MuiInputBase-input': {
      fontSize:18,
      paddingTop:10
    },    
    '& .MuiInput-underline:before': {                 //normal
      borderBottomColor: "rgba(0,0,0, 0.2)",
      borderBottom:"1.5px solid"
    },
    '& .MuiInput-underline:hover:before': {           //on hover
      borderBottomColor: theme.palette.primary.main,
    },
    '& .MuiInput-underline:after': {                  //on focus
      borderBottomColor: theme.palette.primary.dark,
      borderBottom:"3px solid"
    }
  },
  stdInputLabel: {
    color: theme.palette.primary.main,
    fontSize:25,
    '&.Mui-focused': {
      color: theme.palette.primary.dark,
      fontWeight:"bold"
    }
  },
  stdInputIcon: {
    padding:"5px 10px", 
    fontSize:25,
    color: theme.palette.secondary.light,
  }
}));