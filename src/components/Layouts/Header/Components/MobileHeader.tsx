import React, { Fragment, ReactElement, useState } from 'react'
import Icon from '@material-ui/core/Icon';
import HomeIcon from '@material-ui/icons/HomeRounded'
import AboutUsIcon from '@material-ui/icons/InfoRounded'
import ContactUsIcon from '@material-ui/icons/ContactSupportRounded'
import MyDrugsIcon from '@material-ui/icons/SearchRounded'
import SearchDrugsIcon from '@material-ui/icons/SearchSharp'
import AcountIconOutlined from '@material-ui/icons/AccountCircleOutlined'

import ManagementIcon from '@material-ui/icons/ScatterPlotSharp';
import StoreIcon from '@material-ui/icons/StoreSharp';

import UserIcon from '@material-ui/icons/PersonAddOutlined'


import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { Box, Button, Divider, List, ListItem, ListItemText, ListItemIcon, ListSubheader, Typography, Fade, Theme, makeStyles, createStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer'
import { NavLink } from 'react-router-dom';
import { UserRoles } from '@/Interfaces/UserTypes';
import { PharmacyPagesListItems } from '.';


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
    role:string   
    listItems:{text:string,to:string}[]
}

const MobileHeader=(props: IProps): ReactElement=> {
    const classes=useStyles();
    const {role,authenticated,listItems}=props;
    const [openDrawer,setOpenDrawer]=useState(false);
    const handleDrawerToggle=()=>{
        setOpenDrawer(!openDrawer);
      }
    return (
        <Fragment>
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
                     <ListItem button key={index} component={NavLink} to={item.to}>
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
                        <Button  component={NavLink} to="/join"   color="primary" 
                              variant="contained"                   
                              className={classes.appBarButton}
                              startIcon={<Icon  fontSize="small" className="fa fa-user-plus"/> }> 
                            <span className="buttonText"> انضم الينا </span>
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button component={NavLink} to="/login"   color="primary" 
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
                        <Button component={NavLink} to="/profile" color="primary">عضويتى</Button>
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                         <AcountIconOutlined/>
                      </ListItemIcon>
                      <ListItemText>
                        <Button component={NavLink} to="/account" color="primary">حسابى</Button>
                      </ListItemText>
                    </ListItem>
                    {role==UserRoles.pharmacier &&
                    <Fragment>
                      <ListItem>
                        <ListItemIcon>
                            <ManagementIcon/>
                        </ListItemIcon>
                        <ListItemText>
                          <Button component={NavLink} to="/myLazDrugs" color="primary">رواكدى</Button>
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <SearchDrugsIcon/>
                        </ListItemIcon>
                        <ListItemText>
                          <Button component={NavLink} to="/searhcDrugs" color="primary">البحث عن رواكد</Button>
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
                          <Button component={NavLink} to="/myprods" color="primary">مخزنى</Button>
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                            <StoreIcon/>
                        </ListItemIcon>
                        <ListItemText>
                          <Button component={NavLink} to="/stock/drgs/requests" color="primary">طلبات الرواكد</Button>
                        </ListItemText>
                      </ListItem>

                    </Fragment>
                    }
                  </List>
                 }
              </div>
            </Drawer>
           
        </Fragment>
    )
}

export default MobileHeader
