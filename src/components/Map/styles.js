import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  searchInput: {
    height:40,
    borderRadius:0,

  },
  textField: {
    display:"flex",
    minWidth:400,
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main
    },

  },
  searchInputHover: {
  },  
  searchInputFocused: {
  },
  searchInputOutline: {
  },
}));