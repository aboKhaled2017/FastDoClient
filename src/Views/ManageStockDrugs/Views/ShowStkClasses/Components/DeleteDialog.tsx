import classes from '*.module.css';
import { App_BackDrop } from '@/components/Customs';
import { displayError } from '@/Helpers/HelperJsxFunctions';
import { IPharmasStockClass } from '@/Interfaces/AccountTypes';
import { ISelectInputChange } from '@/Interfaces/EventTypes';
import { Box, Button, CircularProgress, createStyles, Dialog, DialogActions, DialogContent, DialogContentText, FormControl, FormHelperText, InputLabel, makeStyles, MenuItem, Select, Theme, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';

const useStyles=makeStyles((theme:Theme)=>createStyles({
    formControl: {   
        marginTop:'8px', 
        background:'#fff',
        width:'100%',
        minWidth: 120,
    },
    circularProgress:{
        color:theme.palette.background.paper
    },
    formControl_withError: {   
        marginTop:'8px', 
        background:'#fff',
        width:'100%',
        minWidth: 120,   
        
        '& .MuiSelect-select.MuiSelect-selectMenu':{
            border:'1px solid red',
            marginBottom:'0 !important',
            marginTop:'0 !important'
        }
    },
    customeErros:{
        color:'red',
        fontSize:'0.8rem'
    },
}))
interface IProps{
   open:boolean 
   setOpen: React.Dispatch<React.SetStateAction<boolean>>
   setDeleteDescision: React.Dispatch<React.SetStateAction<{
        isAgreed: boolean;
        madeDescision: boolean;
        replacedClass: IPharmasStockClass;
        }>>
    onDeleteDialogOk:()=>void
    errors: {
        replaceClassId?: string[] | undefined;
        G?: string | undefined;
    }
    replacedClasses:IPharmasStockClass[]
    deleteDecision:{
        isAgreed: boolean;
        madeDescision: boolean;
        replacedClass: IPharmasStockClass;
    }
    loading:boolean
    model:IPharmasStockClass
}

const DialogView:React.FC<IProps>=(props)=>{
    const classes=useStyles();
    const {open,setOpen,setDeleteDescision,
        onDeleteDialogOk,errors,model,
        replacedClasses,deleteDecision,loading}=props;
    const handleForClassChange:ISelectInputChange=(e,child)=>{
        let selected=replacedClasses.find(r=>r.id==e.target.value as string)
        ??null as any as IPharmasStockClass;
        setDeleteDescision(prev=>({...prev,replacedClass:selected}))
    }
    if(!deleteDecision.replacedClass)
    deleteDecision.replacedClass=replacedClasses[0];
   
    return (
        <Dialog
            open={open}
            onClose={()=>{setOpen(false)}}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <App_BackDrop open={loading}>
                 <CircularProgress className={classes.circularProgress}/>
              </App_BackDrop>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                هل انت متأكد من حذف هذا التصنيف
            </DialogContentText>
            {model.count>0 && replacedClasses.length>0 &&
            <DialogContent>
                <Box>
                    <Typography variant="body1">
                        يوجد صيدليات قامت بأختيار هذا التصنيف ,قم بأختيار التصنيف البديل فى حالة حذف هذا
                    </Typography>
                    <FormControl  className={errors.replaceClassId?classes.formControl_withError:classes.formControl}>
                        <InputLabel>
                            أختر التصنيف البديل
                        </InputLabel>       
                        <Select
                            variant="outlined"
                            id="ForClassSelect"   
                            name="ReplacedClassId"                                         
                            value={deleteDecision.replacedClass.id}
                            onChange={handleForClassChange}
                            >
                            {replacedClasses.map((item,i)=>(
                            <MenuItem  key={i} value={item.id}>{item.name}</MenuItem>
                            ))}
                        </Select>
                            {<FormHelperText className={classes.customeErros}>{displayError(errors.replaceClassId)}</FormHelperText>}
                    </FormControl>
                </Box>
            </DialogContent>
            }
            </DialogContent>
            <DialogActions>
            <Button onClick={()=>{
                setDeleteDescision({
                isAgreed:false,
                madeDescision:true,
                replacedClass:null as any
                })
                setOpen(false);}} color="primary">
                لست متأكد
            </Button>
            <Button onClick={onDeleteDialogOk} color="primary" autoFocus>
                نعم متأكد
            </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogView;