import { Box, Button, CircularProgress, createStyles, Dialog, DialogActions, DialogContent, DialogContentText, makeStyles, TextField, Theme } from '@material-ui/core';
import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/PlusOne';
import { displayError } from '@/Helpers/HelperJsxFunctions';
import { Alert } from '@material-ui/lab';
import { App_BackDrop } from '@/components/Customs';

import axios from 'axios';


const useStyles=makeStyles((theme:Theme)=>createStyles({
    textField:{       
        background:'#fff',
        '& .MuiFormLabel-root':{
            fontSize:'1.2rem'
        },
        '& label':{
            color:'#666'
        }
    },
    addNewPackBtn:{
        background:theme.palette.info.dark,
        color:'#fff'
      },
    circularProgress:{
        color:theme.palette.background.paper
    }
}))

interface IProps{
    onAddNewPackage:(name:string)=>void
}
const AddNewPackageView:React.FC<IProps>=props=>{
const classes=useStyles();
const {onAddNewPackage}=props;
const [newPack,setNewPack]=useState('');
const [errors,setErrors]=useState<{Name?:string[],G?:string}>({
    Name:undefined ,
    G:undefined
})
const [openDialog,setOpenDialoge]=React.useState(false);
const [loading,setLoading]=React.useState(false);
const handleClick=()=>{
if(!newPack.trim()) {
    setErrors(prev=>({...prev,Name:["ادخل اسم الطلبية"]}));
    return;
}
 setLoading(true);
 const body={
     name:newPack,
     fromStocks:[]
 }
 axios.post(`pharmas/stkdrugpackage`,body)
 .then(res=>{
     setNewPack('');
     setOpenDialoge(false);
     onAddNewPackage(newPack)
 })
 .catch(err=>{
    if(err.status==404){
        alert('لا يمكن حذف هذا العنصر'); 
          return;
      }
      if(!err.response) 
      {
          alert("خطأ فى الاتصال بالسيرفر");
          return;
      }
      
      setErrors({...err.response.data.errors});
 })
 .finally(()=>{
     setLoading(false);
 })
}
const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setErrors({Name:undefined,G:undefined});   
    setNewPack(e.target.value);
}
 return (
     <Box>        
        <Button variant="contained" 
                className={classes.addNewPackBtn}
                endIcon={<AddIcon/>}
                onClick={()=>{setOpenDialoge(true);}}>
            اضافة طلبية جديد
        </Button>
        <Dialog
            open={openDialog}
            onClose={()=>{setOpenDialoge(false)}}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <App_BackDrop open={loading}>
                <CircularProgress className={classes.circularProgress}/>
            </App_BackDrop>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                <Box my={1}>
                    {errors.G &&
                        <Alert severity="error">
                        {displayError(errors.G)}
                        </Alert>
                    }
                </Box> 
                <TextField                   
                label="اسم الطلبية"
                type="text"
                variant="outlined"                                    
                className={classes.textField}
                margin="dense"
                size="medium"
                fullWidth
                helperText={displayError(errors.Name)}
                error={errors.Name?true:false}  
                value={newPack}                     
                onChange={handleInputChange}/>
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={()=>{setOpenDialoge(false);}} 
                        color="secondary">
                الغاء
            </Button>
            <Button onClick={handleClick} color="primary" autoFocus>
                اضافة
            </Button>
            </DialogActions>
        </Dialog>
     </Box>
 )
}

export default AddNewPackageView;