import React, { useState } from 'react';
import { AppBar, IconButton, Toolbar, Grid, useTheme, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from "@material-ui/icons/Menu";
import { ReactComponent as LogoSvg } from '../../resources/img/logo.svg';
import useStyles from './styles';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useNavigate } from 'react-router-dom';

const menuItems = [
    {
        menuTitle: "Map",
        pageURL: "/",
        id:"mapLink"
    },
    {
        menuTitle: "Our Story",
        pageURL: "/ourstory",
        id:"ourStoryLink"
    }
];

const accountItems = [
    {
        menuTitle: "Login",
        pageURL: "/login",
        id:"loginLink"
    },
    {
        menuTitle: "Sign Up",
        pageURL: "/signup",
        id:"signUpLink"
    }
];


export default function NavBar() {
    let navigate = useNavigate();
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    //menu button
    const [anchorEl, setAnchorEl] = useState<Element|null>(null);
    const open = Boolean(anchorEl);
    //page
    const [selectedPage, setSelectedPage] = useState<String>(menuItems[0].id);


    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event?.target as Element);
      };
    
      const handleMenuClick = (pageURL:string, id:string) => {
        navigate(pageURL);
        setSelectedPage(id);
        setAnchorEl(null);
      };
    

    return (
        <div>
        <AppBar className={classes.navBarOuter} position="static" elevation={0}>
            <Toolbar disableGutters={true} className={classes.navBarInner}>
            {isMobile ? 
            /*Mobile Mode*/
            (<>
                <IconButton onClick={handleMenu}>
                    <MenuIcon style={{color: "white"}} />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{
                    vertical: "top",
                    horizontal: "left"
                    }}
                    keepMounted
                    transformOrigin={{
                    vertical: "top",
                    horizontal: "left"
                    }}
                    open={open}
                    onClose={() => setAnchorEl(null)}
                >
                    {menuItems.map(menuItem => {
                    const { id, menuTitle, pageURL } = menuItem;
                    return (
                        <MenuItem onClick={() => handleMenuClick(pageURL, id)}>
                            {menuTitle}
                        </MenuItem>
                    );
                    })}

                    {accountItems.map(menuItem => {
                    const { id, menuTitle, pageURL } = menuItem;
                    return (
                        <MenuItem onClick={() => handleMenuClick(pageURL, id)}>
                            {menuTitle}
                        </MenuItem>
                    );
                    })}
                </Menu>
            </>
          ) 
          : 
          /*Desktop Mode*/
          (
            <Grid
            justifyContent="space-between"
            container 
            >
                <Grid item className={classes.navGrid}>
                    <IconButton>
                        <LogoSvg style={{height:"40px", width:"40px"}} />
                    </IconButton>
                    {menuItems.map(menuItem => {
                    const { id, menuTitle, pageURL } = menuItem;
                    return (
                        <MenuItem id={id} key={id} onClick={() => handleMenuClick(pageURL, id)} selected={selectedPage === id} classes={{root:classes.navLink, selected: classes.navLinkSelected }}>
                            {menuTitle}
                        </MenuItem>
                    );
                    })}
                </Grid>

                <Grid item className={classes.navGrid}>
                    {accountItems.map(menuItem => {
                    const { id, menuTitle, pageURL } = menuItem;
                    return (
                        <MenuItem id={id} key={id} onClick={() => handleMenuClick(pageURL, id)} selected={selectedPage === id} classes={{root:classes.navLink, selected: classes.navLinkSelected }}>
                            {menuTitle}
                        </MenuItem>
                    );
                    })}
                </Grid>
            </Grid>
          )}
            </Toolbar> 
        </AppBar>
        </div>
    );
}