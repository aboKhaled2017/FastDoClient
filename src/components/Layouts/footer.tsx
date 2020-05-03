import React, { ReactElement } from 'react'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import { Typography, ListItem, Button, Chip, makeStyles, createStyles, Theme, Hidden } from '@material-ui/core'
import { Link } from 'react-router-dom'

import LinkIcon from '@material-ui/icons/NavigateNextOutlined'
import ContactMailIcon from '@material-ui/icons/MailOutlined'
import ContactPhoneIcon from '@material-ui/icons/PhoneOutlined'
import {credentials} from '../../config'

import contactUsImage from '../../Images/home_company_pic11.png'
interface Props {
  
}
const styles=makeStyles((theme:Theme)=>createStyles({
  footer:{
     marginTop:theme.spacing(4), 
     paddingTop:theme.spacing(4),
     borderTop:'2px solid #ccc',   
    '& .MuiGrid-container':{
      [`${theme.breakpoints.down('sm')}`]:{
        marginBottom:theme.spacing(2),       
      },     
    }
  },
  contactUsGrid:{
    [`${theme.breakpoints.down('sm')}`]:{
      justifyContent:'center'
    }
  },
  link:{
    color:'#8d939d',
    textDecoration:'none',
    '&:hover':{
      textDecoration:'underline',
      color:theme.palette.primary.main
    }
  },
  listItemIcon:{
    margin:theme.spacing(0,0,0,1),
    verticalAlign:'middle'
  }
}))
export default ({}: Props)=>
{
  const auth=credentials.auth;
  const pagesListItems=[
    {text:'الرئيسية',to:'/'},
    {text:'ماذا عنا',to:'/aboutUs'},
    {text:'تواصل معنا',to:'/contactUs'}
  ]
  const servicesListItems=[
    {text:'انضم الى فاست دو كصيدلية',to:'/register'},
    {text:'انضم الى فاست دو كمخزن',to:'/register'},
    {text:'قم بالبحث عن الراكد الذى تريده',to:'/serachDrugs'},
    {text:'قم بأضافة وعرض منتجاتك الراكدة',to:'/myDrugs'}
  ]
  const classes=styles();
  return (
    <Grid container className={classes.footer}>
      <Grid item sm={6} md container  justify="center">
        <List subheader={
          <Typography align="center" variant="h5" color="primary">صفحات</Typography>
        }>
          {pagesListItems.map((item,index)=>(
            <ListItem key={index}>
              <LinkIcon color="secondary"/>
              <Link  className={classes.link}  to={item.to}>{item.text}</Link>
            </ListItem>
          ))}
        </List>
      </Grid>

      <Grid item sm={6} md container  justify="center">
        <List subheader={
          <Typography align="center" variant="h5" color="primary">خدمات</Typography>
        }>
          {servicesListItems.map((item,index)=>(
            <ListItem key={index}>
              <LinkIcon color="secondary"/>
              <Link  className={classes.link}  to={item.to}>{item.text}</Link>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item sm container  justify="center" md={6}>
        <Hidden xsDown>
          <Grid item sm={5} container justify="center">
            <img src={contactUsImage} alt="contact us"/>
          </Grid>
        </Hidden>
        <Grid className={classes.contactUsGrid} item  sm={7} container justify="flex-start">
          <List subheader={
            <Typography align="center" variant="h5" color="primary">تواصل معنا</Typography>
          }>
              <ListItem>
                 <Typography variant="body1">
                   محافظة سوهاج ,اخميم
                 </Typography>
              </ListItem>
              <ListItem>
                 <Typography variant="body1">
                    <ContactMailIcon className={classes.listItemIcon} fontSize="small" color="primary"/>
                    <Link className={classes.link} to="mailto:mohamed2511995@gmail.com">mohamed2511995@gmail.com</Link>
                 </Typography>
              </ListItem>
              <ListItem>
                 <Typography variant="overline">
                    <ContactPhoneIcon className={classes.listItemIcon} fontSize="small" color="primary"/>
                    <span>201152506434 +</span>
                 </Typography>
              </ListItem>
          </List>
        </Grid>
      </Grid>
    </Grid>
  )
}

