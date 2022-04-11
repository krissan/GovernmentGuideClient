import React, { useState } from 'react';
import { AppBar, IconButton, Toolbar, Grid, useTheme, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from "@material-ui/icons/Menu";
import { ReactComponent as LogoSvg } from '../../resources/img/logo.svg';

import CustomIconButton from '../Buttons/CustomIconButton';
import ButtonIcon from '../Buttons/ButtonIcon';

import useStyles from './styles';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../../AppContext';
import appValues from '../../resources/AppValues';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface NavItem {
    menuTitle: string,
    pageURL: string,
    id:string
}

//Main Menu Items
const menuItems:Array<NavItem> = [
    {
        menuTitle: "Map",
        pageURL: "/",
        id:"mapLink"
    },
    {
        menuTitle: "Our Story",
        pageURL: "/ourStory",
        id:"ourStoryLink"
    },
    {
        menuTitle: "Manage Data",
        pageURL: "/manageData",
        id:"manageData"
    },
    {
        menuTitle: "Contact Us",
        pageURL: "/contactUs",
        id:"contactUs"
    }
];

//Auth Items
const authItems:Array<NavItem> = [
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

const allItems = menuItems.concat(authItems);

const NavBar = () => {
    let navigate = useNavigate();
    let location = useLocation();
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const { alert } = useAppContext();

    //menu button
    const [anchorEl, setAnchorEl] = useState<Element|null>(null);
    const open = Boolean(anchorEl);

    //get selected page
    const getMenuIdByPage = () => {
        if(location.pathname)
        {
            let locBase = location.pathname.split("/")[1];

            let items:Array<NavItem> = allItems.filter((x)=>{
                return x.pageURL.replace("/","") === locBase;
            });

            if(items.length > 0)
            {
                return items[0].id
            }
        }
        
        return null;
    }
    const [selectedPage, setSelectedPage] = useState<string | null>(getMenuIdByPage());



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
                <Toolbar disableGutters={true} className={classes.navBarInner} style={isMobile ? {backgroundColor:theme.palette.primary.main} : {backgroundColor:"transparent", borderBottom:"1px solid " + theme.palette.primary.main}} >
                    {isMobile ? 
                    /*Mobile Mode*/
                    (<>
                        {/*Menu Icon*/}
                        <IconButton onClick={handleMenu}>
                            <MenuIcon style={{color: "white"}} />
                        </IconButton>
                        {/*Dropdown menu*/}
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
                            {/*Main Menu Items*/}
                            {menuItems.map(menuItem => {
                            const { id, menuTitle, pageURL } = menuItem;
                            return (
                                <MenuItem onClick={() => handleMenuClick(pageURL, id)}>
                                    {menuTitle}
                                </MenuItem>
                            );
                            })}
                            {/*Auth Menu Items*/}
                            {authItems.map(menuItem => {
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
                            {/*Site Logo*/}
                            <IconButton>
                                <LogoSvg style={{height:"40px", width:"40px"}} />
                            </IconButton>
                            {/*Main Menu Items*/}
                            {menuItems.map(menuItem => {
                            const { id, menuTitle, pageURL } = menuItem;
                                return (
                                    <MenuItem id={id} key={id} onClick={() => handleMenuClick(pageURL, id)} selected={selectedPage === id} classes={{root:classes.navLink, selected: classes.navLinkSelected }}>
                                        {menuTitle}
                                    </MenuItem>
                                );
                            })}
                        </Grid>

                        {/*Auth Menu Items*/}
                        <Grid item className={classes.navGrid}>
                            {authItems.map(menuItem => {
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
            {alert.open ? 
                <div style={{backgroundColor:theme.palette.primary.dark, color:theme.palette.primary.contrastText, display:"flex", justifyContent:"space-between", paddingLeft:"30%", paddingRight:appValues.pageMargin}}>
                    <div>{alert.msg}</div>
                    <CustomIconButton>
                        <ButtonIcon icon={faTimes}/>
                    </CustomIconButton> 
                </div>
                :
                <></>
            }
        </div>
    );
}

export default NavBar;