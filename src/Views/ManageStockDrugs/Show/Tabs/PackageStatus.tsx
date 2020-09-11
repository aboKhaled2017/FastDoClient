import React, { ReactElement, useState, useRef, Fragment } from 'react'
import { getDrugDesc, DrugsPackges, getAvaialableQuantity, getDrugFromPackage, getDrugUnitType } 
from '../../../../Commons/Services'
import { makeStyles, Typography, Button, Box, Grid, FormControl, InputLabel, Select, MenuItem, TextField, InputProps, Badge, Chip, FormHelperText, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Divider } 
from '@material-ui/core';
import EditIcon from '@material-ui/icons/EditRounded'
import { ISelectInputChange } from '../../../../Interfaces/EventTypes';
import AddIcon from '@material-ui/icons/AddRounded'
import RemoveIcon from '@material-ui/icons/CloseRounded' 
import Alert from '@material-ui/lab/Alert';
import { IDrugPackage, LazDrugConsumeType } from '../../../../Interfaces/DataTypes';
import { I_Drug_DataModel, E_LzDrg_ConsumeType } from '../../../../Interfaces/DrugsTypes';
const useStyles = makeStyles((theme) => ({
        
        packTable:{
            margin:'auto',
            borderCollapse: 'separate',
            borderSpacing:'6px 5px',
            '& tr':{
                '&>td':{
                   background:'#9e190f',
                   padding:'3px 6px',
                   color: '#fff',
                   borderRadius:3,                  
                   '&:first-of-type':{
                    borderRadius: 7,
                    background: '#2d3e50',                
                    display: 'inline-block'
                   }
                },
            }
        },
        chip:{
            height:'auto',
            background:'#fff',
            color:'#000'
        },
        divider:{
            margin:'10px auto'
        }
}));
interface IProps {
    model:I_Drug_DataModel
}
interface IAddLzDrugToPackage{
    packName:string 
    quantity:number
}
const DisplayForExchangeConsumedDrug=(props:{model:I_Drug_DataModel,connectdPackgs:IDrugPackage[],availQuantity:number})=>{
    const classes=useStyles();
    const {connectdPackgs,model,availQuantity}=props;
    return(
    <Fragment>
    <Grid item md={4} xs={12}>
                <Box pl={2}>
                    <Alert variant="outlined" severity="info">
                        {connectdPackgs.length==0 &&
                        <p>لم يتم اضافة هذا  الراكد لاى باكج/باقة حتى الان</p>
                        }
                        {connectdPackgs.length==1 && 
                        <p>{`الراكد مضاف الى باكج/باقة بكمية ${getDrugFromPackage(connectdPackgs[0],model.id)?.quantity} ${getDrugUnitType(model.unitType as any)} من هذا الراكد`}</p>
                        }
                        {connectdPackgs.length>1 &&
                         <p>{`الراكد مضاف الى عدد ${connectdPackgs.length} باكج/باقة باجمالى كمية  ${DrugsPackges.getConsumedQuantityOfDrug(model.id)} ${getDrugUnitType(model.unitType as any)} من هذا الراكد`}</p>
                        }
                    </Alert>
                    <Divider className={classes.divider}/>
                    <Alert variant="outlined" severity="info">
                        <Typography variant="subtitle2" color="primary">الباكجز/الباقات التى تحتوى على هذ الراكد</Typography>
                        <Box>
                            {connectdPackgs.map(packg=>(
                            <Box my={1}>
                                <Chip style={{width:'100%'}} component="div" variant="outlined" label={packg.name} color="primary"/> 
                            </Box>
                            ))}
                        </Box>
                    </Alert>
                    <Divider className={classes.divider}/>
                    <Alert variant="outlined" severity="warning">
                        {availQuantity===0 &&
                        <p>حتى الان تم اضافة كل كميات هذا الراكد الى الباكجز</p>
                        }
                        {availQuantity>0 &&
                        <p>يتبقى عدد {availQuantity} {getDrugUnitType(model.unitType as any)} من هذا الراكد لم يتم ادراجة الى اى باكج/باقة حتى الان</p>
                        }
                    </Alert>
                </Box>
            </Grid>
    <Grid item md={8} xs={12}>      
    </Grid>
    </Fragment>
    )
}
const DisplayForBurnedConsumedDrug=(props:{model:I_Drug_DataModel,connectdPackgs:IDrugPackage[]})=>{
    const classes=useStyles();
    const {connectdPackgs,model}=props;
    return (
        <Fragment>
            <Grid item md={6} xs={12}>
                <Box>
                    <Alert  variant="filled" severity="info">
                        <p>المنتج يستهلك عن طريق البيع مباشرة بخصم {model.discount} % </p>                  
                    </Alert>
                    <Divider variant="inset" light className={classes.divider}/>
                    {model.requestCount==0 &&
                    <Alert variant="standard" severity="info">
                    <p>لم يتم عمل اى طلب على هذا الراكد حتى الان</p>
                    </Alert>}
                    {model.requestCount>0 &&
                    <Alert variant="standard" severity="info">
                     <span style={{display:'inline-block'}}>عدد الطلبات التى تمت على هذا الراكد </span>
                     <span style={{display:'inline-block',margin:'auto 15px'}}>
                       <Badge color="secondary" badgeContent={model.requestCount}/>
                     </span>
                    </Alert>}
                </Box>
            </Grid>
            <Grid item md={6} xs={12}>      
            </Grid>
        </Fragment>
    )
}
export default ({model}: IProps)=> {
    const classes=useStyles();
    const [connectdPackgs,setconnectdPackgs]=useState(DrugsPackges.associatedPackages(model.id))
    const [availableQuantity,setAailableQuantity]=useState(getAvaialableQuantity(model as any,connectdPackgs))
    return (
    <Grid container>
        {model.consumeType==E_LzDrg_ConsumeType.burning
         ?<DisplayForBurnedConsumedDrug model={model as any} connectdPackgs={connectdPackgs}/>
         :<DisplayForExchangeConsumedDrug model={model as any} connectdPackgs={connectdPackgs} availQuantity={availableQuantity}/>
        }
    </Grid>
    )
}
