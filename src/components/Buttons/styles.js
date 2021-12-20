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
    fontSize:16
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
  StdSwitchAndLabel:{
    color:theme.palette.secondary.main,
    fontWeight:"bold",
    paddingTop:1
  }
}));