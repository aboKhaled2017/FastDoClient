import React, { ReactElement } from 'react'
import { Dialog, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core'

interface IProps {
    openDeleteDialog:boolean
    setOpenDeleteDialoge: React.Dispatch<React.SetStateAction<boolean>>
    setDeleteDescision: React.Dispatch<React.SetStateAction<{
        isAgreed: boolean;
        madeDescision: boolean;
        id:string;
    }>>
    executeAfterConfirmOk:()=>void
}

const DeleteAlertDialoge=(props: IProps)=> {
    const {openDeleteDialog,setDeleteDescision,setOpenDeleteDialoge,executeAfterConfirmOk}=props;
    return (<Dialog
        open={openDeleteDialog}
        onClose={()=>{setOpenDeleteDialoge(false)}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            هل انت متأكد من حذف هذا الطلب
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{
            setDeleteDescision(prev=>({
                id:prev.id,
                isAgreed:false,
                madeDescision:true
            }));
            setOpenDeleteDialoge(false);            
            }} color="primary">
            لست متأكد
          </Button>
          <Button onClick={()=>{
            setDeleteDescision(prev=>({
                id:prev.id,
                isAgreed:true,
                madeDescision:true
            }));
            executeAfterConfirmOk();
            setOpenDeleteDialoge(false);}} color="primary" autoFocus>
            نعم متأكد
          </Button>
        </DialogActions>
    </Dialog>)
}
export default DeleteAlertDialoge
