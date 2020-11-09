
import { UserRoles } from '@/Interfaces/UserTypes'
import { Box, Button, createStyles, Divider, Fade, IconButton, makeStyles, Theme, Typography } from '@material-ui/core'
import React, { Fragment, ReactElement, useState } from 'react'
import { Link, NavLink, NavLinkProps } from 'react-router-dom'
import { PharmacyPagesMenu } from '.'
import LoginIcon from '@material-ui/icons/Person'
import LogoutIcon from '@material-ui/icons/ExitToAppRounded'
import AccountCircle from '@material-ui/icons/AccountCircle';

import MenuItem from '@material-ui/core/MenuItem';
import UserIcon from '@material-ui/icons/PersonAddOutlined'
import AcountIconOutlined from '@material-ui/icons/AccountCircleOutlined'
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    activeClass:{
      '& .MuiButtonBase-root':{
        background:theme.palette.primary.dark
      }
        
    },
    appBar:{
      background:theme.palette.primary.main,
      color:'#fff'
    },
    menuButton: {
      marginLeft: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    logo:{
      width:180
    },
    logoLink:{
      position:'absolute',
      top: 0,
      background:theme.palette.primary.main,
      left: 0,
      padding:0,
      borderBottomRightRadius: 60,
      borderBottomLeftRadius: 25
    },
    buttonDivider:{
      width:15,
      background:'transparent'
    },
    appBarButton:{
      fontSize:15,
      margin:'auto',
      '& .buttonText':{
        marginRight:theme.spacing(1),
        textAlign:'center',
        width:70
      }
    },
  }),
);


interface IProps {
    authenticated:boolean
    role:string
    handleLogout:()=>void
}

const LinkButton=(props:NavLinkProps&{text:string})=>{
  var classes=useStyles();
  return <NavLink to={props.to} 
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  activeClassName={props.to==="/"?"":classes.activeClass}>
          <Button color="inherit" className={classes.appBarButton}>
           {props.text}
          </Button>
        </NavLink> 
}

const DisktopHeader=(props: IProps): ReactElement=> {
    const classes=useStyles();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    }; 
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
    const {authenticated,role,handleLogout}=props;
    return (
        <Fragment>
            <Box flexGrow={1}>
              <LinkButton text="الرئيسية" to="/"/>            
              <LinkButton text="ماذا عنا" to="/aboutUs"/>
              <LinkButton text="تواصل معنا" to="/contactUs"/>
               
              {authenticated && role==UserRoles.pharmacier && 
              <>
                <LinkButton text="ادراة رواكدى" to="/myLazDrugs"/>            
                <LinkButton text="البحث عن الرواكد" to="/searchDrugs"/>
                <PharmacyPagesMenu/>
              </>
              }
              {authenticated && role==UserRoles.stocker && <>
                <LinkButton text="مخزنى" to="/myprods"/>                   
              </>
              }
            </Box>
              {authenticated && (
                <Box>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    open={open}
                    TransitionComponent={Fade}
                    onClose={handleMenuClose}
                  >
                    <MenuItem component={Link} to="/profile" 
                             onClick={handleMenuClose}>
                                 
                      <UserIcon/>
                      <Typography variant="subtitle2">عضويتى</Typography>
                    </MenuItem>
                    <MenuItem component={Link} to="/account" 
                             onClick={handleMenuClose}>
                      <AcountIconOutlined/>
                      <Typography variant="subtitle2">حسابى</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <LogoutIcon/>
                      <Typography variant="subtitle2">خروج</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              )}
              {!authenticated && 
              <Box display="flex">
                  <Button  to="/join" color="inherit" 
                           variant="outlined" 
                           startIcon={<UserIcon  fontSize="small"/>}
                           component={Link}                                                                 
                            className={classes.appBarButton}> 
                  <span className="buttonText"> انضم الينا </span>
                  </Button>
                  <Divider className={classes.buttonDivider} orientation="vertical" flexItem/>
                  <Button to="/login" color="inherit" 
                          className={classes.appBarButton} 
                          variant="outlined"
                          startIcon={<LoginIcon  fontSize="small"/> }
                          component={Link} > 
                      <span className="buttonText"> دخول </span>
                  </Button>
              </Box>                 
              }
        </Fragment>
    )
}

export default DisktopHeader
