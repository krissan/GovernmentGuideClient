import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  navLink: {
    color: theme.palette.primary.main,
    borderRadius:0,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    }
  },
  navLinkSelected: {
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.primary.contrastText,
      fontWeight:"bold",
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText
      }
    },
  },
  navBarInner: {
    backgroundColor:"transparent", 
    borderBottom:"1px solid " + theme.palette.primary.main,
    height:"64px",
    marginBottom:"20px"
  },
  navBarOuter: {
    backgroundColor:"transparent", 
  },
  navGrid:{
    display:"flex",
    justifyContent:"center"
  },
  gradeLetter:{
    color:theme.palette.primary.dark,
    padding:"0px 10px 0px 5px",
    fontWeight:"bold",
    fontSize:18
  },
  gradeIcon:{
    color:theme.palette.primary.dark
  },
  symbol:{
    color:theme.palette.primary.primary
  },
  StdToggleContainer:{
    alignItems:"flex-end",
    paddingBottom:20,
    "& button":{
      borderRadius:0,
      backgroundColor:theme.palette.primary.main,
      padding:"5px auto",
      fontSize:12,
      height:70,
      color:theme.palette.primary.contrastText
    },
    "& button:hover":{
      backgroundColor:theme.palette.primary.dark,
      color:theme.palette.primary.contrastText
    },
    "& button.Mui-selected":{
      borderRadius:0,
      backgroundColor:theme.palette.primary.dark,
      color:theme.palette.primary.contrastText,
      height:80
    },
    "& button.Mui-selected:hover":{
      backgroundColor:theme.palette.primary.dark,
      color:theme.palette.primary.contrastText,
    }
  }
}));