import React, { useState, ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CancelIcon from '@material-ui/icons/CancelRounded';
import SendIcon from '@material-ui/icons/SendRounded';
import { Button, Box, Divider, Chip, Badge, CircularProgress, Grid } from '@material-ui/core';
import { I_Drgs_SearchModel, I_Drgs_Search_ReturnModelAfterAdded } from '../../../Interfaces/SearchDrugsTypes';
import { getDrugUnitType, Get_LzDrgStateFormate } from '../Services';
import { displayDrugValidDateAs_MMYYYY_Formate, Get_DrgPriceType_StrFormate } from '../../../Commons/Services';
import { E_LzDrgRequestStatus } from '../../../Interfaces/DrugsTypes';
import {Update_DrgsSearch_Row_AfetrCancelReq,Update_DrgsSearch_Row_AfetrPostReq} from '../../../Redux/Actions/searchDataActions'
import axios from 'axios'
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
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
interface IProps{
  model:I_Drgs_SearchModel
  Update_DrgsSearch_Row_AfetrPostReq:(returnModel: I_Drgs_Search_ReturnModelAfterAdded)=>void
  Update_DrgsSearch_Row_AfetrCancelReq:(id:string)=>void
}
const SearchCard_View=(props:IProps)=> {
  const classes = useStyles();
  const [expanded, setExpanded] =useState(false);
  const [loading,setLoading]=useState(false);
  const {model,Update_DrgsSearch_Row_AfetrCancelReq,Update_DrgsSearch_Row_AfetrPostReq}=props
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleMake_ByRequest=()=>{
    setLoading(true);
    axios.post(`/phrdrgrequests/${model.id}`)
    .then(res=>{
        setLoading(false);
        Update_DrgsSearch_Row_AfetrPostReq(res.data);
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
  const handleCancel_ByRequest=()=>{
    setLoading(true);
    axios.delete(`/phrdrgrequests/made/${model.requestId}`)
    .then(res=>{
        setLoading(false);
        Update_DrgsSearch_Row_AfetrCancelReq(model.id);
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
  const RequestButton= ()=>{
    if(!model.isMadeRequest)
        return (
          <Button variant="outlined"
                  color="primary"
                  className={classes.btnWithIcon}
                  startIcon={<SendIcon className={classes.buttonIcon} color="inherit"/>}
                  onClick={handleMake_ByRequest}>ارسال طلب شراء</Button>
        )
    else 
        return (
            <Button variant="contained" 
                    color="secondary" 
                    className={classes.btnWithIcon}
                    title="الغاء الطلب"
                    startIcon={<CancelIcon style={{marginLeft:9}} className={classes.buttonIcon} color="inherit"/>}
                    onClick={handleCancel_ByRequest}>ألغاء الطلب</Button>)
  }
  return (
    <Card className={classes.root}>
      {loading &&
        <Box m={1}>
            <CircularProgress color="primary"/>
        </Box>}
      <CardHeader 
        className={classes.cardHeader}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar} >
            {`${model.pharmName[0]}`}
          </Avatar>
        }
        action={
         <RequestButton/>
        }
        title={`${model.name} / ${model.type}`}
        subheader={`${model.quantity} ${getDrugUnitType(model.unitType)} بخصم ${model.discount} %`}
      />
      <CardContent>
        <Box mt={-1}>
          <Grid container>
               <Grid item sm={6}>
                  <Typography style={{display:'inline-block'}} variant="body1" color="textSecondary">
                    {`تاريخ الصلاحية : `} 
                    <Chip disabled label={model.valideDate} variant="outlined"/>
                  </Typography>
               </Grid>
              <Grid item sm={6}>
                {model.isMadeRequest && model.status==E_LzDrgRequestStatus.Pending &&
                  <Chip color="primary" label="طلب قيد الانتظار ,انتظر الرد"/>
                }
                {model.isMadeRequest && model.status==E_LzDrgRequestStatus.Rejected &&
                  <Chip color="secondary" label="للاسف تم رفض طلبك"/>
                }
                {model.isMadeRequest && model.status==E_LzDrgRequestStatus.AcceptedForAnotherOne &&
                  <Chip color="secondary" label="للاسف طلبك غير متوفر الان"/>
                }
                {model.isMadeRequest && model.status==E_LzDrgRequestStatus.Accepted &&
                  <Chip color="primary" label="لقد تم الموافقة على طلبك"/>
                }
              </Grid>
          </Grid>
        </Box>
        <Box display="flex" mt={1}>
          <Typography variant="subtitle1" color="primary">
            صيدلية /{model.pharmName}
          </Typography>
          <Divider variant="middle" flexItem orientation="vertical"/>
          <Typography variant="body1" color="textPrimary">
           {model.pharmLocation}
          </Typography>
        </Box>
        <Typography variant="body1" color="textSecondary" component="p">
         {model.desc}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <div style={{display:'none'}}>
        <IconButton aria-label="add to favorites" title="اضافة الى اهتماماتك">
          <FavoriteIcon titleAccess="add to my favorites"/>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        </div>
        <IconButton
          title="التفاصيل"
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <table className={classes.table}>
          <tbody>
              <tr className={classes.tr}>
                  <td>الاسم : {model.name}</td>
              </tr>
              <tr className={classes.tr}>
                  <td>النوع : {model.type}</td>
              </tr>
              <tr className={classes.tr}>
              <td>{Get_LzDrgStateFormate(model)}</td>
              </tr>
              <tr className={classes.tr}>
              <td>تاريخ الصلاحية : {model.valideDate}</td>
              </tr>
              <tr className={classes.tr}>
              <td>{`نوع السعر : ${Get_DrgPriceType_StrFormate(model.priceType)}`}</td>
              </tr>
              <tr className={classes.tr}>
              <td>الخصم : {model.discount} %</td>
              </tr>
          </tbody>
        </table>
        </CardContent>
      </Collapse>
    </Card>
  );
}
export default connect(null, {
  Update_DrgsSearch_Row_AfetrCancelReq,
  Update_DrgsSearch_Row_AfetrPostReq
})(SearchCard_View) as any as (props:{model:I_Drgs_SearchModel})=>ReactElement;