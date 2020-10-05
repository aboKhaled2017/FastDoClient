import classes from '*.module.css';
import { App_BackDrop } from '@/components/Customs';
import { displayError } from '@/Helpers/HelperJsxFunctions';
import { IPharmasStockClass } from '@/Interfaces/AccountTypes';
import { ISelectInputChange } from '@/Interfaces/EventTypes';
import { Box, Button, CircularProgress, createStyles, Dialog, DialogActions, DialogContent, DialogContentText, FormControl, FormHelperText, InputLabel, makeStyles, MenuItem, Select, TextField, Theme, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useEffect } from 'react';
import SendIcon from '@material-ui/icons/SendOutlined'
import axios from 'axios';
import { setUserIdentity } from '@/Redux/Actions/userActions';
import store from '@/Redux/store';

const useStyles=makeStyles((theme:Theme)=>createStyles({
    form:{
        marginRight:theme.spacing(3),
        textAlign:'center',
    },
    textField:{   
        marginTop:'8px',     
        background:'#fff',
        '& .MuiFormLabel-root':{
            fontSize:'1.2rem'
        },
        '& label':{
            color:'#666'
        }
    },
    formControl: {   
        marginTop:'8px', 
        background:'#fff',
        width:'100%',
        minWidth: 120,
    },
    formButton:{
     marginTop:theme.spacing(2)
    },
    formButtonIcon:{
        marginLeft:theme.spacing(1.5)
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    customeErros:{
        color:'red',
        fontSize:'0.8rem'
    },
    circularProgress:{
        color:theme.palette.background.paper
    }
}))
interface IProps{
    open:boolean 
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    model:IPharmasStockClass
}

interface IErrorState{
    NewClass?:string[] 
    OldClass?:string[] 
    G?:string
}

const InitErrorState:IErrorState={
    NewClass:undefined,
    OldClass:undefined,
    G:undefined
}
const DialogView:React.FC<IProps>=(props)=>{
    const classes=useStyles();
    const {open,setOpen,model}=props;
    const [newClassName,setNewClasName]=React.useState(model.name);
    const [errors,setErrors]=React.useState(InitErrorState);
    const [status,setStatus]=React.useState({
        loading:false,
        OpenAletr:false
    })
    const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setNewClasName(e.target.value);
    }
    const handleSubmit=(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        if(model.name.trim()==newClassName.trim())return;
        setStatus(prev=>({...prev,loading:true}));
        let body={
            newClass:newClassName.trim(),
            oldClass:model.name
        }
        axios.put(`stk/phclasses`,body)
        .then(res=>{
            setStatus(p=>({...p,loading:false,OpenAletr:true}));
            setErrors({...InitErrorState});
            setTimeout(() => {
                setStatus(p=>({...p,OpenAletr:false}));
            }, 1200);
            store.dispatch(setUserIdentity(res.data) as any); 
        })
        .catch(err=>{
            setStatus(p=>({...p,loading:false}));
            if(err.status==404){
            setErrors({...InitErrorState,G:'لا يمكن تعديل هذا العنصر'}); 
                return;
            }
            if(!err.response) 
            {
                alert("خطأ فى الاتصال بالسيرفر");
                setStatus(p=>({...p,loading:false}));
                return;
            }
            var errorsResult=err.response.data.errors;
            setErrors({...errorsResult}); 
       })
       
    }
    React.useEffect(()=>{
        setNewClasName(model.name);
    },[open])
    return (
        <Dialog
            open={open}
            onClose={()=>{setOpen(false)}}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <App_BackDrop open={status.loading}>
                 <CircularProgress className={classes.circularProgress}/>
              </App_BackDrop>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
               تعديل اسم التصنيف
            </DialogContentText>
            <Box>
            <App_BackDrop className={classes.backdrop}
                          open={status.OpenAletr} 
                          onClick={e=>setStatus(prev=>({...prev,OpenAletr:false}))}>
                    <Alert severity="success">
                        لقد تم تعديل الاسم بنجاح
                    </Alert>
            </App_BackDrop>
            <Box my={1}>
                {errors.G &&
                    <Alert severity="error">
                     {displayError(errors.G)}
                    </Alert>
                }
            </Box>
           <form className={classes.form}>
               <TextField 
                   id="newClass"
                   name="newClass"
                   label="اسم التصنيف الجديد"
                   type="text"
                   variant="outlined"                                    
                   className={classes.textField}
                   margin="dense"
                   size="medium"
                   fullWidth
                   helperText={displayError(errors.NewClass)}
                   error={errors.NewClass?true:false}  
                   value={newClassName}                     
                   onChange={handleInputChange}
               />
                
               <Button 
                        variant="contained" color="primary" 
                        className={classes.formButton} 
                        type="submit"   
                        onClick={handleSubmit}                            
                        startIcon={
                            <SendIcon className={classes.formButtonIcon}/>
                        }> 
                         حفظ التغيير
               </Button>
            </form>
        </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>{setOpen(false);}} color="secondary">
                    اغلاق
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogView;