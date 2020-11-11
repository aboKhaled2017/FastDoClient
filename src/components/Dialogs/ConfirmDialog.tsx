import { Dialog, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import React from 'react';

interface IConfirmDialogProps {
  onCancel:()=>void
  onConfirm:Function
  message:string 
  openDialog:boolean 
  setOpenDialoge: React.Dispatch<React.SetStateAction<boolean>>
  agreeBtnText?:string 
  cancelBtnText?:string
}

const ConfirmDialog: React.FC<IConfirmDialogProps> =props=> {
  const {onCancel,onConfirm,message,agreeBtnText,cancelBtnText,openDialog,setOpenDialoge}=props;
  const [descision,setDescision]=React.useState({
      isAgreed:false,
      madeDescision:false
  });

  React.useEffect(()=>{
    if(descision.madeDescision&&descision.isAgreed){
      onConfirm();
     }
     if(descision.madeDescision&& !descision.isAgreed){
      onCancel();
     }
  },[descision])
  
  return (
          <Dialog
              open={openDialog}
              onClose={()=>{setOpenDialoge(false)}}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {message}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={()=>{
                  setDescision({
                    isAgreed:false,
                    madeDescision:true
                  });
                  setOpenDialoge(false);}} color="primary">
                  {cancelBtnText?cancelBtnText:'ألغاء'}
                </Button>
                <Button onClick={()=>{
                  setDescision({
                  isAgreed:true,
                  madeDescision:true
                });setOpenDialoge(false);}} color="primary" autoFocus>
                  {agreeBtnText?agreeBtnText:'نعم متأكد'}
                </Button>
              </DialogActions>
          </Dialog>
  );
};

export default ConfirmDialog;
