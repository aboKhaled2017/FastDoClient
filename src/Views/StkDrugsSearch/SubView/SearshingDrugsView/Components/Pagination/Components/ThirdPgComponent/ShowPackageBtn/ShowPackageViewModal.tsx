import { IStkDrugsPackage } from '@/Views/StkDrugsSearch/Interfaces';
import {  Button, createStyles, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, Theme } from '@material-ui/core';
import React, { useState } from 'react';
import ShowPackageView from './ShowPackageDetailsView';

const useStyles=makeStyles((theme:Theme)=>createStyles({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
  }));
interface IShowPackageViewModalProps {
    openDialog:boolean
    setOpenDialog:React.Dispatch<React.SetStateAction<boolean>>
}

 
const ShowPackageViewModal: React.FC<IShowPackageViewModalProps> =props => {
  const classes=useStyles();
  const {openDialog,setOpenDialog}=props;
  return (
    <Dialog onClose={e=>{setOpenDialog(false)}} 
            aria-labelledby="customized-dialog-title" 
            fullWidth
            maxWidth='lg'
            
            open={openDialog}>
        <DialogTitle id="customized-dialog-title">
        عرض تفاصيل الباكج  
        </DialogTitle>
        <DialogContent dividers>
            <ShowPackageView/> 
        </DialogContent>
        <DialogActions>
            <Button autoFocus 
                    onClick={()=>{setOpenDialog(false)}} 
                    color="primary">
              اغلاق 
            </Button>
        </DialogActions>
    </Dialog>
  );
};

export default ShowPackageViewModal;
