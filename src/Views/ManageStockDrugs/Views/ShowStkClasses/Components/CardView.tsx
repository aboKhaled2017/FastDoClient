import React, { ReactElement } from 'react'
import { makeStyles, Theme, createStyles, Box, Card, CardHeader, Avatar, CardContent, Typography, Chip, Divider, CardActions, IconButton, Collapse, Badge, ButtonGroup, Button, CircularProgress } from '@material-ui/core'
import { I_DrgRequest_I_Received, E_LzDrgRequestStatus } from '../../../../../Interfaces/DrugsTypes';
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import { connect } from 'react-redux';
import {Update_DrgRequestModel} from '../../../../../Redux/Actions/DataActions'
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
    model:I_DrgRequest_I_Received
    Update_DrgRequestModel:(model:I_DrgRequest_I_Received)=>void
}
const CardView= (props: IProps) => {
    const classes=useStyles();
    const {model,Update_DrgRequestModel}=props;
    const [loading,setLoading]=React.useState(false);
    const handleDefineReqStatus=(status:E_LzDrgRequestStatus)=>{
      const body=[
        {
          "op":"replace",
          "value":true,
          "path":"/Seen"
        },
        {
          "op":"replace",
          "value":status,
          "path":"/Status"
        }
      ];
      setLoading(true);
      axios.patch(`/phrdrgrequests/received/${model.id}`,body)
      .then(res=>{
          Update_DrgRequestModel({...model,status:status});
          setLoading(false);
      })
      .catch(err=>{
        setLoading(false);
      if(err.status==404){
        alert('حدثت مشكلة اثناء معالجة الطلب'); 
          return;
      }
      if(!err.response) 
      {
          alert("خطأ فى الاتصال بالسيرفر");
          return;
      }
      var errorsResult=err.response.data.errors;
      alert(JSON.stringify(errorsResult))
     })
    }
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
                <Chip color="primary" variant="outlined" className="notArabicFont" label={`الراكد: ${model.lzDrugName}`}/>
                {model.status==E_LzDrgRequestStatus.Pending &&
                <Chip style={{margin:'auto 2px'}} 
                      variant="default" 
                      label={` لم تقم بتحديد حالة الطلب`}/>}
                {model.status==E_LzDrgRequestStatus.Rejected &&
                <Chip style={{margin:'auto 2px'}} 
                      color="secondary" 
                      variant="default" 
                      label={`لقد قمت برفض هذا الطلب`}/>} 
                {model.status==E_LzDrgRequestStatus.Accepted &&
                <Chip style={{margin:'auto 2px'}} 
                      color="primary" 
                      variant="default" 
                      label={`لقد قبلت هذا الطلب`}/>}
                {model.status==E_LzDrgRequestStatus.AcceptedForAnotherOne &&
                <Chip style={{margin:'auto 2px'}} 
                      color="primary" 
                      variant="default" 
                      label={`هذا الطلب بالفعل طلبه اخر وقمت بالموافقة عليه`}/>}   
              </Box>
              <Box my={1}>
                <Typography variant="h6">تحديد حالة الطلب</Typography>
                <Box>
                <ButtonGroup variant="contained" color="primary" aria-label="تحديد حالة الطلب">
                    <Button disabled={model.status==E_LzDrgRequestStatus.AcceptedForAnotherOne}
                            onClick={()=>{handleDefineReqStatus(E_LzDrgRequestStatus.AcceptedForAnotherOne)}}
                    >الطلب بالفعل قيد الموفقة لشخص اخر قام بطلبة
                    </Button>
                    <Button 
                        disabled={model.status==E_LzDrgRequestStatus.Rejected}
                        onClick={()=>{handleDefineReqStatus(E_LzDrgRequestStatus.Rejected)}}
                        >رفض</Button>
                    <Button 
                        disabled={model.status==E_LzDrgRequestStatus.Accepted}
                        onClick={()=>{handleDefineReqStatus(E_LzDrgRequestStatus.Accepted)}}
                        >موافقة</Button>
                </ButtonGroup>

                </Box>
              </Box>
            </CardContent>
        </Card>
    );
}

export default connect(null, {Update_DrgRequestModel})(CardView) as any as (props:{model:I_DrgRequest_I_Received})=>ReactElement