import React, { useState } from 'react';
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
import CheckedIcon from '@material-ui/icons/CheckRounded';
import SendIcon from '@material-ui/icons/SendRounded';
import { ILazDrugShowModel } from '../../Interfaces/ModelsTypes';
import { getDrugUnitType, getLzDrugStateFormate, getDrugValidDate, getDrugPriceType, getDrugConsumeType, getDrugDesc } from '../../Commons/Services';
import { Button } from '@material-ui/core';

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

export default function RecipeReviewCard(props:{model:ILazDrugShowModel}) {
  const classes = useStyles();
  const [expanded, setExpanded] =useState(false);
  const [requestSent,setRequestSent]=useState(false)
  const handleOnBuyRequestClicked=(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    alert("لقد تم ارسال طلبك ,سوف يتم الرد عليك بمجرد فحص طلبك")
    setRequestSent(prev=>!prev);
  }
  const {model}=props
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [fname,lname]=model.pharmacyName.split(' ');
  const RequestButton= ()=>{
    if(!requestSent)
    return (
      <Button variant="outlined"
              color="primary"
              className={classes.btnWithIcon}
              startIcon={<SendIcon className={classes.buttonIcon} color="inherit"/>}
              onClick={handleOnBuyRequestClicked}>ارسال طلب شراء</Button>
    )
    else 
  return (
      <Button variant="contained" 
              color="primary" 
              className={classes.btnWithIcon}
              title="الغاء الطلب"
              startIcon={<CheckedIcon className={classes.buttonIcon} color="inherit"/>}
              onClick={handleOnBuyRequestClicked}> تم ارسال الطلب </Button>)
  }
  return (
    <Card className={classes.root}>
      <CardHeader 
        className={classes.cardHeader}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar} >
            {`${fname[0]}.${lname[0]}`}
          </Avatar>
        }
        action={
         <RequestButton/>
        }
        title={`${model.name} / ${model.type}`}
        subheader={`${model.quantity} ${getDrugUnitType(model.unitType)} بخصم ${model.discount} جنية`}
      />
      <CardContent>
        <Typography variant="body1" color="textSecondary" component="p">
         {model.desc}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" title="اضافة الى اهتماماتك">
          <FavoriteIcon titleAccess="add to my favorites"/>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
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
                  <td>الاسم: {model.name}</td>
              </tr>
              <tr className={classes.tr}>
                  <td>النوع: {model.type}</td>
              </tr>
              <tr className={classes.tr}>
              <td>{getLzDrugStateFormate(model)}</td>
              </tr>
              <tr className={classes.tr}>
              <td>{`تاريخ الصلاحية - ${getDrugValidDate(model.validDate)}`}</td>
              </tr>
              <tr className={classes.tr}>
              <td>{`نوع السعر - ${getDrugPriceType(model.priceType)}`}</td>
              </tr>
              <tr className={classes.tr}>
              <td>الخصم {model.discount} %</td>
              </tr>
          </tbody>
        </table>
        </CardContent>
      </Collapse>
    </Card>
  );
}