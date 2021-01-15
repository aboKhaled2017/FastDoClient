import React, { ReactElement, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IStkDrugsRequest } from '@/Interfaces/StockDrgsRequestsTypes';
import { Box, Button, ButtonGroup, Chip, CircularProgress, Divider } from '@material-ui/core';
import { displayDrugValidDateAs_MMYYYY_Formate } from '@/Commons/Services';
import { EStockDrugsPackgStatus } from '@/Interfaces/StockDrgsRequestsTypes';
import {RequestServices,FuncsService} from '@Views/StockDrugsRequests/Services'
import { connect } from 'react-redux';
import {Set_Stock_Drugs_Requests} from '@Redux/Actions/DataActions'
import store from '@/Redux/store';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    background:'#fafafa',
    border:`1px solid ${theme.palette.primary.dark}`
  },
  spanDivider:{
    margin:'auto 5px',
    color:theme.palette.info.dark
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
  table:{
    width:'100%'
  },
  tr:{
    background:'#748fa5f5',
    borderRadius:5,
    '&>td':{
        padding:'8px 10px',
        borderRadius:5,
        color:'#fff',
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

interface IExportedViewProps {
  model:IStkDrugsRequest
}

interface IViewProps {
    model:IStkDrugsRequest
    Set_Stock_Drugs_Requests:(requests: IStkDrugsRequest[])=>void
}

const SubHeader=(n:number)=>{
  return (
    <Box>
      اجمالى طلب عدد <Chip label={n} size="small" color="secondary"/> نوع من الرواكد
    </Box>
  )
}
const RequestState=(status:EStockDrugsPackgStatus)=>{
  return (
    <Box>
        <Chip color="default" variant="default" className="notArabicFont" label="حالة الطلب"/>
        {status==EStockDrugsPackgStatus.Pending &&
        <Chip style={{margin:'auto 2px'}} 
              variant="default" 
              label={`لم يتم الرد على الطلب حتى الان`}/>}
        {status==EStockDrugsPackgStatus.Rejected &&
        <Chip style={{margin:'auto 2px'}} 
              color="secondary" 
              variant="default" 
              label={`لقد تم رفض الطلب`}/>} 
        {status==EStockDrugsPackgStatus.Accepted &&
        <Chip style={{margin:'auto 2px'}} 
              color="primary" 
              variant="default" 
              label={`تم قبول الطلب`}/>} 
        {status==EStockDrugsPackgStatus.CanceledFromPharma &&
        <Chip style={{margin:'auto 2px'}} 
              color="secondary" 
              variant="default" 
              label={`تم الغاء الطلب من طرف الصيدلية`}/>}
        {status==EStockDrugsPackgStatus.CanceledFromStk &&
        <Chip style={{margin:'auto 2px'}} 
              color="secondary" 
              variant="default" 
              label={`تم الغاء الطلب من طرفك`}/>}       
        {status==EStockDrugsPackgStatus.Completed &&
        <Chip style={{margin:'auto 2px'}} 
              color="primary" 
              variant="default" 
              label={`تم اكتمال الطلب`}/>} 
        {status==EStockDrugsPackgStatus.AtNegotioation &&
        <Chip style={{margin:'auto 2px'}} 
              color="primary" 
              variant="default" 
              label={`فى حالة تفاوض مع الصيدلية`}/>}          
    </Box>
                
  )
}
const View: React.FC<IViewProps> = props => {
  const {model,Set_Stock_Drugs_Requests}=props;
  const {status}=model;
  const classes = useStyles();
  const [expanded, setExpanded] =useState(false);
  const [loading, setloading] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const setRequestStatus=(status:EStockDrugsPackgStatus)=>{
    setloading(true);
    RequestServices.setRequestStatus({
      id:model.packageId,
      val:status,
      onDone(){
        FuncsService.updateStockRequests({...model,status:status},newData=>{
          Set_Stock_Drugs_Requests(newData);
        });
      },
      onComplete(){
        setloading(false);
      }
    })
  }
  return (
    <Card className={classes.root}>
        <CardHeader 
            className={classes.cardHeader} 
            title={`صيدلية ${model.pharma.name}`}
            subheader={SubHeader(model.drugs.length)} 
            avatar={loading && <CircularProgress color="inherit" size="18px"/>}          
        />
        <CardContent>
          <Box mt={-2}>
            <Typography variant="body1" color="textSecondary">
              {`تاريخ الطلب : `} 
              <Chip disabled label={displayDrugValidDateAs_MMYYYY_Formate(new Date(model.createdAt))} variant="outlined"/>
            </Typography>
          </Box>
          <Box display="flex" mt={1}>
            <Typography variant="subtitle1" color="primary">
              صيدلية /{model.pharma.name}
            </Typography>
            <Divider variant="middle" flexItem orientation="vertical"/>
            <Typography variant="body1" color="textPrimary">
            {model.pharma.address}
            </Typography>
          </Box>
          <Typography variant="body1" color="textSecondary" component="p">
            <span>هاتف محمول: {model.pharma.phoneNumber}</span>
            <span className={classes.spanDivider}> | </span>
            <span>تليفون ارضى: {model.pharma.landLinePhone}</span>
          </Typography>
          {model.pharma.addressInDetails && 
          <Typography variant="body1" color="textSecondary" component="p">
            <span>اعنوان التفصيلى | </span>
            <span>{model.pharma.addressInDetails}</span>
          </Typography>
          }
          {RequestState(model.status )}
          <Box mt={1} mb={-3} display="flex">
                <Box width="50%">
                   <Typography variant="h6">تحديد حالة الطلب</Typography>
                </Box>
                <Box width="50%">
                    <ButtonGroup variant="outlined" color="primary" aria-label="تحديد حالة الطلب">
                        <Button 
                            disabled={status==EStockDrugsPackgStatus.Rejected}
                            onClick={()=>{setRequestStatus(EStockDrugsPackgStatus.Rejected)}}>رفض
                        </Button>
                        <Button 
                            disabled={status==EStockDrugsPackgStatus.Accepted}
                            onClick={()=>{setRequestStatus(EStockDrugsPackgStatus.Accepted)}}>موافقة
                        </Button>
                    </ButtonGroup>

                </Box>
            </Box>
        </CardContent>
        <CardActions disableSpacing>
          <Button title="التفاصيل"
            color="primary"
            onClick={handleExpandClick}
            aria-expanded={expanded}
            endIcon={ <ExpandMoreIcon />}
            aria-label="show more">
              الرواكد بالتفصيل
          </Button>
           
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
          <table className={classes.table}>
            <tbody>
              <tr>
                <th>اسم منتج الدواء</th>
                <th>الكمية المطلوبة</th>
              </tr>
            </tbody>
            <tbody>
              {model.drugs.map((el,i)=>(
                <tr key={i} className={classes.tr}>
                    <td>{el.name}</td>
                    <td>{el.quantity}</td>
                </tr>
              ))}                
            </tbody>
          </table>
          </CardContent>
        </Collapse>
      </Card>
  );
};

export default (connect(null,{Set_Stock_Drugs_Requests})(View)) as 
any as (props:IExportedViewProps)=>ReactElement;
