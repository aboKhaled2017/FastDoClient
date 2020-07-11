import React from 'react'
import { Theme, withStyles, Grid, Typography, Container } from '@material-ui/core'
import pharamcyImgIcon from '../../Images/pharmacyIcon.png'
import storeImgIcon from '../../Images/storeIcon.png'
import drugsImgIcon from '../../Images/drugsIcon.png'
interface Props {
    classes:{[key:string]:string}
}
const styles=((theme:Theme)=>({
    servicesContainer:{
      margin:theme.spacing(6,'auto')
    },
    icon_wrapper:{       
    borderColor:'#ffffff',
    transition:'background-color .3s ease-in-out',
    boxShadow:'inset 0 0 7px 0 rgba(0, 0, 0, .08)',
    width: 110,
    height: 110,
    textAlign: 'center',
    //lineHeight: 110,
    fontSize: 50,
    position: 'relative',
    overflow: 'hidden',
    margin:'0 auto 15px',
    borderWidth: 8,
    borderStyle: 'solid',
    display: 'block',
    borderRadius:'100%',
        '& .icon':{
            '&>img':{
                maxWidth:'80%',
                height: 'auto'
            }
        }
    },
    srviceItem:{
    padding:theme.spacing(3)
    }
}))
export default withStyles(styles as any)(({classes}: Props)=>{
    return (
    <Container className={classes.servicesContainer}>
        <Typography variant="h4" color="primary" align="center">خدمات فاست دو</Typography>
        <Grid container justify="center">
        <Grid item xs={12} md className={classes.srviceItem}>
            <div className={classes.icon_wrapper}>
                <div className="icon">
                    <img src={pharamcyImgIcon} alt="pharmacy simpole"/>
                </div>
            </div>
            <Typography variant="h5" color="primary">
            تطوير ادارة الصدليات  
            </Typography>
            <Typography variant="body2"> 
            فاست دو يجعلك قادر على تسجيل صيدليتك لاستدخدام المزايا التى نقدمها , حيث  يمكن لصدليتك التعامل مع المخازن مباشرة والتعامل ايضا مع الصيدليات الاخرى                                             
            </Typography>
        </Grid>
        <Grid item xs={12} md className={classes.srviceItem}>
            <div className={classes.icon_wrapper}>
                <div className="icon">
                    <img src={storeImgIcon} alt="store simpole"/>
                </div>
            </div>
            <Typography variant="h5" color="primary">
            تطوير ادارة المخازن 
            </Typography>
            <Typography variant="body2"> 
            فاست دو يجعلك قادر على تسجيل مخزنك لاستخدام المزايا التى نقدمها للمخازن , حيث يمكن للمخزن التعامل مع الصديليات مباشرة وايضا التعامل مع المخازن الاخرى                           
            </Typography>
        </Grid>
        <Grid item xs={12} md className={classes.srviceItem}>
            <div className={classes.icon_wrapper}>
                <div className="icon">
                    <img src={drugsImgIcon} alt="store simpole"/>
                </div>
            </div>
            <Typography variant="h5" color="primary">
            ايجاد واستبدال رواكد
            </Typography>
            <Typography variant="body2">             
            فاست دو يجعلك قادر على ايجاد واستبدال الرواكد بين صيدليتك واى صيدلية اخرى                                                                   
            </Typography>
        </Grid>
        </Grid>
    </Container>)
})
