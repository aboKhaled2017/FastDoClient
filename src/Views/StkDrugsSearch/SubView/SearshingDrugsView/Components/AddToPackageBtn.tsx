import React, { Fragment, ReactElement, useState } from 'react';
import { connect } from 'react-redux';
import {Set_Pharma_PackageData} from '@Redux/Actions/DataActions'
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import { IDataState, IPackagesDataStatus } from '@/Interfaces/States';
import { ISearckStkDrugData_StockDrugsData, IStkDrugsPackage, IStkDrugsPackage_FromStock_DrugData } from '@/Views/StkDrugsSearch/Interfaces';
import { Box, Button, createStyles, Dialog, DialogActions, DialogContent, DialogContentText, makeStyles, TextField, Theme, Typography } from '@material-ui/core';
import CustomFlayableAlert from '@/components/Flyables/CustomSnacBar'

const useStyles=makeStyles((theme:Theme)=>createStyles({

    addToPackageBtn:{
      background:theme.palette.info.dark,
      color:'#fff',
      '&:hover':{
        background:theme.palette.info.light,
      }
    },
    tbody:{},
    textField:{       
        background:'#fff',
        '& .MuiFormLabel-root':{
            fontSize:'1.2rem'
        },
        '& label':{
            color:'#666'
        }
    },
    addToPackageBtnLabel:{
        marginRight:2
    }
  }));
  

interface IExportedBtnProps{
    row:ISearckStkDrugData_StockDrugsData
    drugName:string
}
interface IBtnProps {
    drugName:string
    row:ISearckStkDrugData_StockDrugsData
    packageData:IPackagesDataStatus
    Set_Pharma_PackageData:(packages:IPackagesDataStatus)=>void
}

const AddToPackageBtn: React.FC<IBtnProps> =props=> {
  const classes=useStyles();
  const {row:data,drugName,packageData:{packages,selectedPackageData:{pack,hasEdit}},Set_Pharma_PackageData}=props;
  const [openDialog, setOpenDialog] = useState(false);
  const [quntity, setQuntity] = useState(0);
  const [error, setError] = useState('');
  const [openAlertMess,setOpenAlertMess]=useState(false);
  const isPackContainsThisDrug=pack?.fromStocks.flatMap(e=>e.drugs).some(e=>e.id===data.id);

  const handleCloseAlertMess = (e:any, reason:any) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlertMess(false);
  };
  const onSaveQuantity=()=>{
    let valStr=quntity.toString();
    let val=valStr?parseInt(valStr.trim()):0;
    if(!valStr || !valStr.trim() || val<1){
        setError('الكمية غير صحيحة');
        return;
    }  

    setOpenDialog(false);  
    addToBackage();      

  }
  const addToBackage=()=>{  
    var newDrug:IStkDrugsPackage_FromStock_DrugData={
            discount:data.discount,
            id:data.id,
            name:drugName,
            price:data.price,
            quantity:parseInt(quntity.toString().trim())
    }
    //this stock is found for this package
    if(pack?.fromStocks.some(p=>p.id===data.stockId)){
        let fromStockInd=pack.fromStocks.findIndex(e=>e.id===data.stockId);
        let fromStock=pack.fromStocks[fromStockInd];
        fromStock.drugs.push(newDrug);
        pack.fromStocks.splice(fromStockInd,1,fromStock);
    }
    //this stock is not found for this package
    else{
        pack?.fromStocks.push({
            id:data.stockId,
            name:data.stockName,
            drugs:[newDrug],
            
        } as any)
    }
 
    //update current packages
    let packInd=packages.findIndex(e=>e.packageId===pack?.packageId);
    packages.splice(packInd,1,pack as IStkDrugsPackage);
    setOpenAlertMess(true);
    Set_Pharma_PackageData({
        packages:packages,
        selectedPackageData:{
            pack:pack,
            hasEdit:true
        }
    }); 
  }
  const onAddToBackageBtnClick=()=>{ 
    if(isPackContainsThisDrug){
        alert('exists already');
        return;
    }
    setOpenDialog(true);
  }
  const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setQuntity(e.target.value as any)   
  }
  return (
    <Fragment>
        <CustomFlayableAlert mess="تم الاضافة الى الباكج" 
                             open={openAlertMess} 
                             handleClose={handleCloseAlertMess}/>
        <Button variant="contained" 
                disabled={!data.isJoinedTo || isPackContainsThisDrug}
                onClick={onAddToBackageBtnClick}
                title={'اضف الى الطلبية'}
                endIcon={<AddIcon/>}
                className={classes.addToPackageBtn}>
            اضف الى الطلبية
        </Button>
        {isPackContainsThisDrug && 
        <Typography color="secondary" variant="inherit" className={classes.addToPackageBtnLabel}>
             <span > تم اضافتة </span>
             <CheckIcon style={{verticalAlign:"middle"}} fontSize="small"/>
        </Typography>}
        <Dialog
            open={openDialog}
            onClose={()=>{setOpenDialog(false)}}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogContent>
            <DialogContentText id="alert-dialog-description"> 
                <TextField                   
                label="اسم الطلبية"
                type="number"
                variant="outlined"                                    
                className={classes.textField}
                margin="dense"
                size="medium"
                fullWidth
                helperText={error}
                error={error?true:false}  
                value={quntity}                     
                onChange={handleInputChange}/>
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={()=>{setOpenDialog(false);}} 
                        color="secondary">
                الغاء
            </Button>
            <Button onClick={onSaveQuantity} color="primary" autoFocus>
                حفظ
            </Button>
            </DialogActions>
        </Dialog>
    </Fragment>
  );
};

export default (connect((s:{data:IDataState})=>({
    packageData:s.data.packagesData
  }),{Set_Pharma_PackageData})(AddToPackageBtn)) as 
  any as (props:IExportedBtnProps)=>ReactElement;
