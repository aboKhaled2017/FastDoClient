import React, { ReactElement, useState, Fragment } from 'react'
import LogoImg from '../../../Images/company.png';
import { NavLink, useHistory} from 'react-router-dom'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Hidden from '@material-ui/core/Hidden'

import {logoutUser} from '@/Redux/Actions/userActions'

import { connect } from 'react-redux';
import { IHistory } from '@/Interfaces/DataTypes';
import { UserRoles } from '@/Interfaces/UserTypes';
import { IUserState } from '@/Interfaces/States';
import {DisktopHeader, MobileHeader} from './Components';
import { Box } from '@material-ui/core';
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

  
  
  const handleLogout=()=>{
    logoutUser(history);
  }
  
  return (
       <AppBar position="sticky" className={classes.appBar}>
         <Toolbar variant="dense">
           <Box  alignItems="center" style={{width:'15%'}}>          
            <NavLink to="/" className={classes.logoLink}>
              <img   src={LogoImg} alt="فاست دو" className={classes.logo}/>
            </NavLink>
           </Box>
           {/**show only desktop screen */}
           <Hidden smDown={true}>
             <DisktopHeader authenticated={authenticated} 
                            role={role} 
                            handleLogout={handleLogout}
                           />
           </Hidden>
           {/**show only for mobile screen */}
           <Hidden mdUp={true}>
            <MobileHeader authenticated={authenticated} 
                           role={role}
                           listItems={listItems}/>
           </Hidden>
         </Toolbar>
       </AppBar>
  );
}
export default connect((state:{user:IUserState})=>({
authenticated:state.user.authenticated,
role:state.user.userIdentity.user.role
}), {logoutUser})(Header as any)