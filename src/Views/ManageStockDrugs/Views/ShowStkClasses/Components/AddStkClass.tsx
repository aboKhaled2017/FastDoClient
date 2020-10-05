import { Box, Button, CircularProgress, createStyles, Dialog, DialogActions, DialogContent, DialogContentText, makeStyles, TextField, Theme } from '@material-ui/core';
import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/PlusOne';
import { displayError } from '@/Helpers/HelperJsxFunctions';
import { Alert } from '@material-ui/lab';
import { App_BackDrop } from '@/components/Customs';
import store from "../../../../../Redux/store";
import axios from 'axios';
import { setUserIdentity } from '@/Redux/Actions/userActions';
import { IPharmasStockClass } from '@/Interfaces/AccountTypes';

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
    circularProgress:{
        color:theme.palette.background.paper
    }
}))

interface IProps{
    onNewClassAdded:(refresh:()=>void)=>void
    pharmasClasses:IPharmasStockClass[]
}
const AddStkClassView:React.FC<IProps>=props=>{
const classes=useStyles();
const {onNewClassAdded,pharmasClasses}=props;
const [newClass,setNewClass]=useState('');
const [errors,setErrors]=useState<{NewClass?:string[],G?:string}>({
    NewClass:undefined ,
    G:undefined
})
const [openDialog,setOpenDialoge]=React.useState(false);
const [loading,setLoading]=React.useState(false);
const OnAddNewClass=()=>{
if(!newClass.trim()) {
    setErrors(prev=>({...prev,NewClass:["ادخل اسم التصنيف"]}));
    return;
}
if(pharmasClasses.some(c=>new RegExp(`^${c.name}$`,'i').test(newClass))){
    setErrors(prev=>({...prev,NewClass:["هذا التصنيف موجود بالفعل"]}));
    return;
}
 setLoading(true);
 axios.post(`stk/phclasses/${newClass.trim()}`)
 .then(res=>{
     setNewClass('');
     setOpenDialoge(false);
     onNewClassAdded(()=>{
        store.dispatch(setUserIdentity(res.data) as any); 
     })
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
    setErrors({NewClass:undefined,G:undefined});   
    setNewClass(e.target.value);
}
 return (
     <Box>        
        <Button variant="contained" 
                color="primary"
                endIcon={<AddIcon/>}
                onClick={()=>{setOpenDialoge(true);}}>
            اضافة تصنيف جديد
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
                    id="newClass"
                    name="newClass"
                    label="اسم التصنيف"
                    type="text"
                    variant="outlined"                                    
                    className={classes.textField}
                    margin="dense"
                    size="medium"
                    fullWidth
                    helperText={displayError(errors.NewClass)}
                    error={errors.NewClass?true:false}  
                    value={newClass}                     
                    onChange={handleInputChange}/>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={()=>{setOpenDialoge(false);}} 
                         color="primary">
                   الغاء
                </Button>
                <Button onClick={OnAddNewClass} color="primary" autoFocus>
                   اضافة
                </Button>
              </DialogActions>
    </Dialog>
     </Box>
 )
}

export default AddStkClassView;