import React, { Component } from 'react'
import homeImage from '../../Images/homeImage.jpg'
import pharamcyImgIcon from '../../Images/pharmacyIcon.png'
import storeImgIcon from '../../Images/storeIcon.png'
import UserIcon from '@material-ui/icons/PersonAddOutlined'
import { Box, Theme, withStyles, Grid, Typography, Button } from '@material-ui/core'
import {Link} from 'react-router-dom'

import ServicesSection from './servicesSection'
import { IUserState } from '../../Interfaces/States'
import { connect } from 'react-redux'
interface IProps {
    classes:{[key:string]:string}
    user:IUserState
}
const styles=((theme:Theme)=>({
    backWrapper:{   
      margin:0,
      marginTop:theme.spacing(-3),
      backgroundImage:`url(${homeImage})`,
      backgroundSize:'cover',
      padding:theme.spacing(3),
      overflow:'hidden',
       
    },
    welcomGrid:{
        color:'#fff',
        padding:theme.spacing(2)
    },
    welocmGridH3:{
       [`${theme.breakpoints.down('sm')}`]:{
           fontSize:'2rem',
           lineHeight:1.7
       },
       [`${theme.breakpoints.only('xs')}`]:{
        fontSize:'1.3rem',  
       } 
    },
    afterWelocmGridH4:{
        [`${theme.breakpoints.down('sm')}`]:{
            fontSize:18,  
            marginTop:theme.spacing(2)
        } 
    },
    afterWelcomGrid:{
        ['text-align']:'center',
        color:'#fff',            
    },
    afterWelcomGridPart:{
        [`${theme.breakpoints.down('sm')}`]:{
            paddingBottom:theme.spacing(3)
        },
    },
    afterWelcomGridImgWrapper:{
        height:140+theme.spacing(5),
        [`${theme.breakpoints.down('sm')}`]:{
            height:110+theme.spacing(3)
        },
        '& img':{
            borderRadius:'50%',
            background:'#fff',
            width:140,           
            height:140,
            padding:theme.spacing(2),
            transition:'.3s all ease-in-out',
            '&:hover':{
                width:100,
                height:100
            },
            [`${theme.breakpoints.down('sm')}`]:{
                width:110,
                height:110 
            }
        },  
    },
    afterWelocmGridButtonIcon:{
        marginLeft:theme.spacing(2)
    },
    afterWelocmGridButton:{
        marginTop:theme.spacing(2)
    },
    afterWelocmGridbody2:{
      color:'#e0dada',
      [`${theme.breakpoints.down('sm')}`]:{
          marginTop:theme.spacing(1)
      }
    }
  }))
const HomeComponent= withStyles(styles)( class Home extends Component<IProps> {
    render() {
        const {classes,user}=this.props;
        const {authenticated,userIdentity}=user;
        return (
            <Box>
                <Grid className={classes.backWrapper}>
                    <Grid item className={classes.welcomGrid}>
                      <Typography variant="h3" color="inherit" className={classes.welocmGridH3}>
                          <span> مرحبا {userIdentity.user.name} بك مع فاست دو</span>
                          <br/>
                          <span>انضم الى فاست دو واستخدم كل خدماتها </span>
                      </Typography>
                      <Typography variant="body2">
                          يسعدنا ان تسجل لدى موقعنا وتنضم الينا
                      </Typography>
                    </Grid>
                    <Grid item container className={classes.afterWelcomGrid}>
                       <Grid item xs={12} md={6} className={classes.afterWelcomGridPart}>
                          <div className={classes.afterWelcomGridImgWrapper}>
                            <img src={pharamcyImgIcon} alt="pharmacy"/>
                          </div>
                          <Typography variant="h4" color="inherit" className={classes.afterWelocmGridH4}>
                            انضم الينا ك/صيدلي
                          </Typography>
                          <Typography variant="body2" color="textSecondary" className={classes.afterWelocmGridbody2}>
                            تحصل على كل خدمات الصيدليات
                          </Typography>
                          {!authenticated &&
                          <Button variant="contained" color="primary" 
                                  className={classes.afterWelocmGridButton}
                                  component={Link}                                 
                                  to="/join"
                          startIcon={
                             <UserIcon className={classes.afterWelocmGridButtonIcon}/>
                          }>انضم الان</Button>
                          }
                       </Grid>
                       <Grid item xs={12} md={6} className={classes.afterWelcomGridPart}>
                          <div className={classes.afterWelcomGridImgWrapper}>
                            <img src={storeImgIcon} alt="pharmacy"/>
                          </div>
                          <Typography variant="h4" color="inherit" className={classes.afterWelocmGridH4}>
                            انضم الينا ك/مالك مخزن
                          </Typography>
                          <Typography variant="body2" color="textSecondary" className={classes.afterWelocmGridbody2}>
                            تحصل على كل خدمات المخازن
                          </Typography>
                          {!authenticated &&
                          <Button variant="contained" color="primary" 
                                  className={classes.afterWelocmGridButton}
                                  component={Link}                                 
                                  to="/join/1"
                          startIcon={
                             <UserIcon className={classes.afterWelocmGridButtonIcon}/>
                          }>انضم الان</Button>
                          }
                       </Grid>
                    </Grid>
                </Grid>
                <ServicesSection/>
            </Box>
        )
    }
});
export default connect((state:{user:IUserState})=>({
    user:state.user
}), {})(HomeComponent)