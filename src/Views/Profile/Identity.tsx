import React, { Component, FormEvent, Fragment } from 'react'
import {Button, CircularProgress, Theme, withStyles, Typography, Card, CardActionArea, CardActions, CardMedia, CardContent, IconButton, Grid } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/SendRounded'
import EditIcon from '@material-ui/icons/EditRounded'
import ZoomInIcon from '@material-ui/icons/ZoomInRounded'
import ZoomOutIcon from '@material-ui/icons/ZoomOutRounded'
import licenseImg from '../../Images/pharma.jpg'
import commertialRegImg from '../../Images/home_company_slider_bg1.jpg'
interface IProps {
    classes:{[key:string]:any}
}
interface IState{
    license:string
    commercialReg:string
    errors:any
}
interface I_PS_FProps{
    classes:{[key:string]:any}
    errors:any
}
const styles=(theme:Theme)=>({
    card: {
        maxWidth: 345,
        margin:theme.spacing(2,'auto')
      },
      media: {
        height: 140,
      },
     buttonIcon:{
         marginLeft:12
     },
     customeErros:{
       marginTop:20,
       color:'red',
       fontSize:'0.8rem'
     },
     progress:{
       position:'absolute',
     }
})
export default withStyles(styles as any)(class extends Component<IProps, IState> {
    state = {license:'',commercialReg:'',errors:{} as any}
    handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
    }
    render() {
        const {classes}=this.props;
        const {errors}=this.state;
        const loading=true;
        const a=false;
        var btn=(<Button 
            type="submit" variant="contained" 
            disabled={loading}
            className={classes.button} color="primary"
            startIcon={<SaveIcon className={classes.buttonIcon}/>}>
        حفظ  
        {
        loading&&(
            <CircularProgress size={30} color="secondary" className={classes.progress}/>
        )
        }
    </Button> )
        return (          
            <Grid container>
              <Grid xs={12} item md>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                        className={classes.media}
                        image={licenseImg}
                        title="صورة الترخيص"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                صورة الترخيص
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                هذه الصورة بمثابة الهوية الاساسية لاثبات وجود الصيدلية او المخزن وامكانية وجودة من عدمه
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <IconButton color="primary">
                                    <EditIcon/>
                        </IconButton>
                        <IconButton color="primary">
                                    <ZoomInIcon/>
                        </IconButton>
                        <IconButton color="primary">
                                    <ZoomOutIcon/>
                        </IconButton>
                </CardActions>
                </Card>
              </Grid>
              <Grid xs={12} item md>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                        className={classes.media}
                        image={commertialRegImg}
                        title="صورة التسجيل التجارى"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                صورة التسجيل التجارى
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                صورة التسجيل التجارى مطلوبة لدى فاست دو ,لتأكد من هوية الصيدلية او المخزن الذى يتاعمل معه
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <IconButton color="primary">
                                    <EditIcon/>
                        </IconButton>
                        <IconButton color="primary">
                                    <ZoomInIcon/>
                        </IconButton>
                        <IconButton color="primary">
                                    <ZoomOutIcon/>
                        </IconButton>
                </CardActions>
                </Card>
              </Grid>
            </Grid>      
        )
    }
})
