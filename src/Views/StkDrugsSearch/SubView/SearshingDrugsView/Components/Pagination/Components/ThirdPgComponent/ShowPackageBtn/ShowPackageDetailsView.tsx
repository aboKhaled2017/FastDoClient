import React, { Fragment, ReactElement, useContext, useEffect, useState } from 'react';
import MainView from '@/Views/StkDrugsSearch/SubView/Shared/ShowPackageView'
import { IStkDrugsPackage, IStkDrugsPackage_FromStock, IStkDrugsPackage_FromStock_DrugData } from '@/Views/StkDrugsSearch/Interfaces';
import { clone } from '@/Helpers/HelperArrayFuncs';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import { IDataState } from '@/Interfaces/States';
import {Set_Pharma_SelectedPackage} from '@Redux/Actions/DataActions'

const FlayableComponents:React.FC<{open:boolean,handleClose:any,mess:string}>=props=>{
    return (
      <Fragment>
          <Snackbar open={props.open} 
                    autoHideDuration={6000} 
                    anchorOrigin={{horizontal:"center",vertical:"top"}}
                    onClose={props.handleClose}>
            <Alert onClose={props.handleClose} severity="success">
              {props.mess}
            </Alert>
          </Snackbar>
      </Fragment>
    )
  }

interface IShowPackageDetailsViewProps {
  selectedPack?:IStkDrugsPackage
  Set_Pharma_SelectedPackage:(pack:{hasEdit:boolean,pack:IStkDrugsPackage})=>void
}

const ShowPackageDetailsView: React.FC<IShowPackageDetailsViewProps> =props => {

  const {selectedPack,Set_Pharma_SelectedPackage}=props;
  const OnDeleteRow=(row:IStkDrugsPackage_FromStock)=>{
    let p=selectedPack as IStkDrugsPackage;
    p.fromStocks= p.fromStocks.filter(r=>r.id!==row.id);
 
    Set_Pharma_SelectedPackage({
      pack:clone(p) as any,
      hasEdit:true
    })

  }
  const onRemoveDrugsRow=(drugRow:IStkDrugsPackage_FromStock_DrugData,stockId:string)=>{
    let p=selectedPack as IStkDrugsPackage;
    let stkRow=p.fromStocks.find(e=>e.id===stockId) as IStkDrugsPackage_FromStock;
    let indOfStkRow=p.fromStocks.findIndex(r=>r.id===stockId);
    if(!stkRow)return;
    stkRow.drugs= stkRow.drugs.filter(d=>d.id!==drugRow.id);
    if(stkRow.drugs.length>0)
    p.fromStocks.splice(indOfStkRow,1,stkRow);
    else
    p.fromStocks.splice(indOfStkRow,1);
    Set_Pharma_SelectedPackage({
      pack:clone(p) as any,
      hasEdit:true
    })
 
  };
  const onSaveQuantityChange=(drugRowId:string,stockId:string,newVal:number)=>{
    if(!newVal || isNaN(newVal))return;
    let p=selectedPack as IStkDrugsPackage;
    let stkRow=p.fromStocks.find(e=>e.id===stockId) as IStkDrugsPackage_FromStock;
    let indOfStkRow=p.fromStocks.findIndex(r=>r.id===stockId);
    if(!stkRow)return;
    var editedDrug=stkRow.drugs.find(d=>d.id===drugRowId);
    if(!editedDrug)return;
    var indxOfDrug=stkRow.drugs.findIndex(d=>d.id===drugRowId);
    editedDrug.quantity=parseInt(newVal.toString());
    stkRow.drugs.splice(indxOfDrug,1,editedDrug);
    p.fromStocks.splice(indOfStkRow,1,stkRow);
    Set_Pharma_SelectedPackage({
      pack:clone(p) as any,
      hasEdit:true
    })
  };
  const [openAlertMess,setOpenAlertMess]=useState(false);
  const handleClickOpenAlertMess= () => {
    setOpenAlertMess(true);
  };
  const handleCloseAlertMess = (e:any, reason:any) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlertMess(false);
  };
  
  return (
      <Fragment>
          <FlayableComponents open={openAlertMess} 
                handleClose={handleCloseAlertMess} 
                mess="تم تعديل الطلبية بنجاح"/>
          <MainView  
            pack={selectedPack as any} 
            OnDeleteRow={OnDeleteRow} 
            onSaveQuantityChange={onSaveQuantityChange}
            onRemoveDrugsRow={onRemoveDrugsRow}/>
      </Fragment>
  );
};

export default (connect((s:{data:IDataState})=>({
  selectedPack:s.data.packagesData.selectedPackageData.pack
}),{Set_Pharma_SelectedPackage})(ShowPackageDetailsView)) as 
any as ()=>ReactElement;
