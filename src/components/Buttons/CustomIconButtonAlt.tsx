import * as React from 'react';
import { Button, ButtonProps, Theme, useTheme } from '@material-ui/core';
import { styled } from '@material-ui/styles';

//styled component
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
  borderRadius:45,
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


//Alternative to button with child icon
const CustomIconButtonAlt:React.FC<ButtonProps> = ({children, style, ...props}) => {
  const theme = useTheme();

  return (
    <div style={style}>
      <IconButton {...props} theme={theme}>{children}</IconButton>
    </div>
  );
}



export default CustomIconButtonAlt;