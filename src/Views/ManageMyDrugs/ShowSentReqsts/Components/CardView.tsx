import React, { ReactElement } from 'react'
import { makeStyles, Theme, createStyles, Box, Card, CardHeader, Avatar, CardContent, Typography, Chip, Divider, CardActions, IconButton, Collapse, Badge, ButtonGroup, Button, CircularProgress } from '@material-ui/core'
import { E_LzDrgRequestStatus, I_DrgRequest_I_Made } from '../../../../Interfaces/DrugsTypes';
import { red } from '@material-ui/core/colors';
import { connect } from 'react-redux';
import {GetMy_DrgsReqs_IMade_Page} from '../../../../Redux/Actions/DataActions'
const useStyles=makeStyles((theme:Theme)=>createStyles({
    root: {
        maxWidth: 600,
        background:'#fafafa'
      },
      cardHeader:{
        '& .MuiCardHeader-title':{
          color:theme.palette.primary.main,
          fontSize:20,
        }
      },
      media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
      cardContentOnLoading:{
        opacity:.5
      },
      expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
      avatar: {
        backgroundColor: red[500],
        marginLeft:16,
        marginRight:-16
      },
      table:{
        width:'100%'
      },
      tr:{
        background:'#748fa5f5',
        borderRadius:5,
        display:'block',
        '&>td':{
            padding:'8px 10px',
            borderRadius:5,
            color:'#fff',
            margin:'5px auto',
            display:'block'
        }
      },
      btnWithIcon:{
        '& .MuiButton-startIcon':{
          marginRight:-8
        }
      },
      buttonIcon:{
        marginLeft:7
      }
}));
interface IProps {
    model:I_DrgRequest_I_Made
    cancelRequest:(id:string)=>void
    GetMy_DrgsReqs_IMade_Page:()=>void
    loading:boolean
}
const CardView= (props: IProps) => {
    const classes=useStyles();
    const {model,GetMy_DrgsReqs_IMade_Page,cancelRequest,loading}=props;
    return (
        <Card className={classes.root}>
            <CardHeader 
                className={classes.cardHeader}
                title={`صيدلية ${model.phName}`}
                //subheader={`${model.quantity} ${getDrugUnitType(model.unitType)} بخصم ${model.discount} %`}
            />
            <CardContent className={loading?classes.cardContentOnLoading:""}>
              {loading &&
                <div>
                 <CircularProgress color="primary"/>
              </div>}
              <Box>
                <Chip color="primary" variant="default" className="notArabicFont" label={`الراكد: ${model.lzDrugName}`}/>
                {model.status==E_LzDrgRequestStatus.Pending &&
                <Chip style={{margin:'auto 2px'}} 
                      variant="outlined" 
                      label={`طلب قيد الانتظار ,لم يتم مراجعته بعد`}/>}
                {model.status==E_LzDrgRequestStatus.Rejected &&
                <Chip style={{margin:'auto 2px'}} 
                      color="secondary" 
                      variant="outlined" 
                      label={`لقد تم رفض هذا الطلب`}/>} 
                {model.status==E_LzDrgRequestStatus.Accepted &&
                <>
                  <Chip style={{margin:'auto 2px'}} 
                        color="primary" 
                        variant="outlined" 
                        label={`لقد تم قبول هذا الطلب`}/>
                  <Typography variant="body2" color="textPrimary">
                        تم قبول طلبك وخلال اقل من 48 ساعة سيقوم فاست دو بالتواصل بك ,لتوصيل طلبك
                  </Typography>
                </>
                }
                {model.status==E_LzDrgRequestStatus.AcceptedForAnotherOne &&
                <Chip style={{margin:'auto 2px'}} 
                      color="primary" 
                      variant="outlined" 
                      label={`هذا الطلب للاسف تم طلبة من قبلة صيدلية اخرى`}/>}   
              </Box>
              <Box my={1}>
                <Typography variant="h6">تحديد حالة الطلب</Typography>
                <Box>
                <ButtonGroup variant="contained" color="secondary" aria-label="ألغاء الطلب">
                    <Button  onClick={()=>{cancelRequest(model.id)}}>
                      ألغاء الطلب
                    </Button>
                </ButtonGroup>

                </Box>
              </Box>
            </CardContent>
        </Card>
    );
}

export default connect(null, {GetMy_DrgsReqs_IMade_Page})(CardView) as any as (
    props:{
      model:I_DrgRequest_I_Made,
      cancelRequest:(id:string)=>void,
      loading:boolean
    })=>ReactElement