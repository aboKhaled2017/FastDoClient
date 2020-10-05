import React, { ReactElement, useState, Fragment } from 'react'
import LogoImg from '../../../Images/company.png';
import {Link, useHistory} from 'react-router-dom'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Icon from '@material-ui/core/Icon';

import HomeIcon from '@material-ui/icons/HomeRounded'
import AboutUsIcon from '@material-ui/icons/InfoRounded'
import ContactUsIcon from '@material-ui/icons/ContactSupportRounded'
import MyDrugsIcon from '@material-ui/icons/SearchRounded'
import SearchDrugsIcon from '@material-ui/icons/SearchSharp'
import LogoutIcon from '@material-ui/icons/ExitToAppRounded'
import ManagementIcon from '@material-ui/icons/ScatterPlotSharp';
import StoreIcon from '@material-ui/icons/StoreSharp';

import UserIcon from '@material-ui/icons/PersonAddOutlined'
import LoginIcon from '@material-ui/icons/Person'
import AcountIconOutlined from '@material-ui/icons/AccountCircleOutlined'

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Hidden from '@material-ui/core/Hidden'
import Menu from '@material-ui/core/Menu';

import { Box, Button, Divider, List, ListItem, ListItemText, ListItemIcon, ListSubheader, Typography, Fade } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer'

import {logoutUser} from '../../../Redux/Actions/userActions'
import { IUserState } from '../../../Interfaces/States';
import { connect } from 'react-redux';
import { IHistory } from '../../../Interfaces/DataTypes';
import { UserRoles } from '../../../Interfaces/UserTypes';
import {PharmacyPagesMenu,PharmacyPagesListItems} from './Components';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
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
  role:UserRoles
  logoutUser:(history:IHistory)=>void
}

function Header(props: IProps): ReactElement {
  const classes = useStyles();
  const history=useHistory();
  const {logoutUser,role,authenticated}=props;
  const [openDrawer,setOpenDrawer]=useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const unAuthListItems=[
    {text:'الرئيسية',to:'/'},
    {text:'ماذا عنا',to:'/aboutUs'},
    {text:'تواصل معنا',to:'/contactUs'}
  ]
  const authListItems=unAuthListItems;
  if(role==UserRoles.pharmacier){
    authListItems.push(
      {text:'ادارة رواكدى',to:'/myLazDrugs'},
      {text:'البحث عن رواكد',to:'searchDrugs'});
  }
  const listItems =authenticated?authListItems:unAuthListItems;

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleDrawerToggle=()=>{
    setOpenDrawer(!openDrawer);
  }
  const handleLogout=()=>{
    logoutUser(history);
  }
  
  return (
       <AppBar position="sticky" className={classes.appBar}>
         <Toolbar variant="dense">
           <Box  alignItems="center" style={{width:'15%'}}>          
            <Link to="/" className={classes.logoLink}>
              <img   src={LogoImg} alt="فاست دو" className={classes.logo}/>
            </Link>
           </Box>
           {/**show only desktop screen */}
           <Hidden smDown={true}>
            <Box flexGrow={1}>
              <Button component={Link} to="/" variant="text"  color="inherit" className={classes.appBarButton}>الرئيسية</Button>
              <Button component={Link} to="/aboutUs" variant="text"  color="inherit" className={classes.appBarButton}>ماذا عنا</Button>
              <Button component={Link} to="/contactUs" variant="text"  color="inherit" className={classes.appBarButton}>تواصل معنا</Button>
              {authenticated && role==UserRoles.pharmacier && 
              <>
                <Button component={Link} to="/myLazDrugs" variant="text"  color="inherit" className={classes.appBarButton}>ادراة رواكدى</Button>
                <Button component={Link} to="/searchDrugs" variant="text"  color="inherit" className={classes.appBarButton}>البحث عن الرواكد</Button>
                <PharmacyPagesMenu/>
              </>
              }
              {authenticated && role==UserRoles.stocker && <>
                <Button component={Link} to="/myprods" variant="text"  color="inherit" className={classes.appBarButton}>مخزنى</Button>

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
                    <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
                      <UserIcon/>
                      <Typography variant="subtitle2">عضويتى</Typography>
                    </MenuItem>
                    <MenuItem component={Link} to="/account" onClick={handleMenuClose}>
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
                  <Button  component={Link} to="/join" size="medium" color="inherit" 
                        variant="outlined"                   
                        className={classes.appBarButton} 
                        startIcon={<UserIcon  fontSize="small"/> }> 
                  <span className="buttonText"> انضم الينا </span>
                  </Button>
                  <Divider className={classes.buttonDivider} orientation="vertical" flexItem/>
                  <Button component={Link} to="/login" size="medium" color="inherit" 
                          variant="outlined"                   
                          className={classes.appBarButton} 
                          startIcon={<LoginIcon  fontSize="small"/> }> 
                      <span className="buttonText"> دخول </span>
                  </Button>
              </Box>                 
              }
           </Hidden>
           {/**show only for mobile screen */}
           <Hidden mdUp={true}>
            <Box flexGrow={1}/>
            <IconButton edge="start" 
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={openDrawer} 
                    dir="rtl"
                    onClick={handleDrawerToggle}>
              <div role="presentation"
                   onClick={handleDrawerToggle}
                   onKeyDown={handleDrawerToggle}>
                 <List>
                   {listItems.map((item,index)=>(
                     <ListItem button key={index} component={Link} to={item.to}>
                         <ListItemIcon>
                            {index===0 && <HomeIcon/>}
                            {index===1 && <AboutUsIcon/>}
                            {index===2 && <ContactUsIcon/>}
                            {index===3 && <MyDrugsIcon/>}
                            {index===4 && <SearchDrugsIcon/>}
                         </ListItemIcon>
                         <ListItemText primary={item.text}/>
                     </ListItem>
                   ))}
                 </List>
                 <Divider/>
                 {!authenticated &&
                  <List>
                    <ListItem>
                        <Button  component={Link} to="/join"   color="primary" 
                              variant="contained"                   
                              className={classes.appBarButton}
                              startIcon={<Icon  fontSize="small" className="fa fa-user-plus"/> }> 
                            <span className="buttonText"> انضم الينا </span>
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button component={Link} to="/login"   color="primary" 
                                variant="contained"                   
                                className={classes.appBarButton} 
                                startIcon={<Icon  fontSize="small" className="fa fa-sign"/> }> 
                            <span className="buttonText"> دخول </span>
                        </Button>
                    </ListItem>
                  </List>
                 }
                 {authenticated &&
                  <List                       
                       subheader={
                          <ListSubheader>
                            <Typography variant="subtitle1">
                               صفحاتى   
                            </Typography>
                          </ListSubheader>
                        }>
                    <ListItem>
                      <ListItemIcon>
                         <UserIcon/>
                      </ListItemIcon>
                      <ListItemText>
                        <Button component={Link} to="/profile" color="primary">عضويتى</Button>
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                         <AcountIconOutlined/>
                      </ListItemIcon>
                      <ListItemText>
                        <Button component={Link} to="/account" color="primary">حسابى</Button>
                      </ListItemText>
                    </ListItem>
                    {role==UserRoles.pharmacier &&
                    <Fragment>
                      <ListItem>
                        <ListItemIcon>
                            <ManagementIcon/>
                        </ListItemIcon>
                        <ListItemText>
                          <Button component={Link} to="/myLazDrugs" color="primary">رواكدى</Button>
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <SearchDrugsIcon/>
                        </ListItemIcon>
                        <ListItemText>
                          <Button component={Link} to="/searhcDrugs" color="primary">البحث عن رواكد</Button>
                        </ListItemText>
                      </ListItem>
                      <PharmacyPagesListItems/>
                    </Fragment>
                    }
                    {role==UserRoles.stocker &&
                    <Fragment>
                      <ListItem>
                        <ListItemIcon>
                            <StoreIcon/>
                        </ListItemIcon>
                        <ListItemText>
                          <Button component={Link} to="/myprods" color="primary">مخزنى</Button>
                        </ListItemText>
                      </ListItem>

                    </Fragment>
                    }
                  </List>
                 }
              </div>
            </Drawer>
           </Hidden>
         </Toolbar>
       </AppBar>
  );
}
export default connect((state:{user:IUserState})=>({
authenticated:state.user.authenticated,
role:state.user.userIdentity.user.role
}), {logoutUser})(Header as any)