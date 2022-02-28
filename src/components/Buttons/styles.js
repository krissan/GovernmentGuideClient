import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  AuthButton: {
    width:400,
    color:theme.palette.primary.contrastText,
    height:50,
    fontSize:20,
    borderRadius:0,
    marginBottom:10,
    boxShadow: "0px 1px 3px rgba(0,0,0, 0.5)",
    "&:hover":{
      boxShadow: "0px 3px 5px rgba(0,0,0, 0.5)",
      color: "#fff",
      transform: "translateY(-1px)"
    }
  },
  StdButton: {
    color:theme.palette.primary.contrastText,
    padding:8,
    borderRadius:0,
    fontSize:16,
    
  },
  StdButtonNS: {
    color:theme.palette.primary.contrastText,
    backgroundColor:theme.palette.primary.main,
    "&:hover":{
      backgroundColor: theme.palette.primary.dark
    },
  },
  ButtonIcon:{
    color:theme.palette.primary.contrastText
  },
  switch_track: {
    backgroundColor: theme.palette.secondary.main,
  },
  switch_base: {
      color: theme.palette.primary.main,
      "&.Mui-checked": {
          color: theme.palette.primary.main
      },
      "&.Mui-checked + .MuiSwitch-track": {
          backgroundColor: theme.palette.primary.main,
      }
  },
  StdSwitchAndLabel: {
    color:theme.palette.secondary.main,
    fontWeight:"bold",
    paddingTop:1
  },
  CustomIconButton: {
    '&.Mui-disabled':{
      backgroundColor: theme.palette.primary.dark,
    },
  },
  header:{
      fontSize:20
  },
  searchItem:{
    border:"2px solid "+theme.palette.primary.main,
    borderRadius:"0",
    marginBottom:10,
    color:theme.palette.primary.main,
    width:"100%",
    '&:hover':{
      backgroundColor:theme.palette.primary.main,
      color:theme.palette.primary.contrastText
    }
  },
  searchItemSelected:{
    border:"0",
    backgroundColor:theme.palette.primary.dark,
    color:theme.palette.primary.contrastText
  },
  dropHighLighted:{
    backgroundColor: theme.palette.primary.dark
  },
  alert:{
    borderRadius:0,
    marginTop:10,
    backgroundColor:theme.palette.error.main,
    fontSize:12,
    fontWeight:"bold",
    padding:"3px 10px",
    '&:hover':{
        backgroundColor:theme.palette.error.dark
    }
  }
}));