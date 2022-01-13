import * as React from 'react';
import { Button, ButtonProps, Theme, useTheme } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import useStyles from './styles';

interface IconButtonProps {
  theme: Theme,
}

const IconButton =styled(
  (props: IconButtonProps & ButtonProps) => <Button {...props} />
)({
  backgroundColor:({ theme }: IconButtonProps) => theme.palette.primary.main,
  minWidth:0,
  width:40,
  height:40,
  padding:0,
  borderRadius:0,
  '&:hover': {
    backgroundColor:({ theme }: IconButtonProps) => theme.palette.primary.dark,
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
  },
  '&:focus': {
  },
});


//button with child icon
const CustomIconButton:React.FC<ButtonProps> = ({children, ...props}) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <IconButton className={classes.CustomIconButton} theme={theme} {...props} >{children}</IconButton>
  );
}



export default CustomIconButton;