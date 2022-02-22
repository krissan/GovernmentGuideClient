import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  stdInput: {
    width:400,
    color:theme.palette.primary.dark,
    paddingBottom:20,
    '& .MuiInputBase-input': {
      fontSize:18,
      marginTop:10
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
  stdInputLabelFocused: {
    fontSize:25,
  },
  stdInputLabel: {
    color: theme.palette.primary.main,
    fontSize:40,
    '&.Mui-focused': {
      color: theme.palette.primary.dark,
      fontWeight:"bold"
    }
  },
  stdInputIcon: {
    padding:"5px 10px", 
    fontSize:25,
    color: theme.palette.secondary.light,
  },
  textField: {
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.dark
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.dark
    },
  },
  searchInput: {
    height:40,
    borderRadius:0,
  },
  stdSelect: {
    width:400,
    color:theme.palette.primary.dark,
    marginBottom:20,
    '&.MuiInput-underline:before': {
      borderBottomColor: "rgba(0,0,0, 0.2)",
      borderBottom:"1.5px solid"
    },
    /* hover */
    '&.MuiInput-underline:hover:before': {
      borderBottomColor: theme.palette.primary.main,
    },
    /* focused */
    '&.MuiInput-underline:after': {
      borderBottomColor: theme.palette.primary.dark,
      borderBottom:"3px solid"
    }
  },
  stdSelectLabel: {
    color: theme.palette.primary.main,
    fontSize:18,
    '&.Mui-focused': {
      color: theme.palette.primary.dark,
      fontWeight:"bold"
    }
  },
}));