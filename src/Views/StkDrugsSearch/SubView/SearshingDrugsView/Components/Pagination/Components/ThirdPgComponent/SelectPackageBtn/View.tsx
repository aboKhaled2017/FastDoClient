import React, { Fragment, ReactElement, useState } from 'react';
import SelectButtonList from '@/Views/StkDrugsSearch/SubView/Components/SelectButtonList';
import { IStkDrugsPackage } from '@/Views/StkDrugsSearch/Interfaces';
import { connect } from 'react-redux';
import { IDataState, IPackagesDataStatus } from '@/Interfaces/States';
import {Set_Pharma_SelectedPackage} from '@Redux/Actions/DataActions'
import ConfirmDialog from '@/components/Dialogs/ConfirmDialog';

interface IExportedViewProps{
}
interface IViewProps {
  packageData:IPackagesDataStatus
  loading:boolean
  Set_Pharma_SelectedPackage:(data:any)=>void
}

const View: React.FC<IViewProps> = props=> {
  const {packageData:{packages,selectedPackageData},Set_Pharma_SelectedPackage,
  loading}=props;
  const [switchedPack, setswitchedPack] = useState(null as any);
  const [openConfirmDialog,setOpenConfirmDialoge]=React.useState(false);
  const onDialogConfirm=()=>{
    Set_Pharma_SelectedPackage({
      hasEdit:false,
      pack:switchedPack 
    });  
  }
  const onSelectPackage= (pack: IStkDrugsPackage)=>{
    setswitchedPack(pack);
    if(selectedPackageData.hasEdit){ 
      setOpenConfirmDialoge(true);                     
    }
    else{
      Set_Pharma_SelectedPackage({
        hasEdit:false,
        pack:pack
      });
    } 
  }
  return (
    <Fragment>
      <SelectButtonList<IStkDrugsPackage> 
                loading={loading}
                style={{minWidth:'100%'}}
                setSelectedVal={onSelectPackage}
                btnText={"الطلبية الحالية"}
                listItemsMap={p=>p.name}
                defaulttext={selectedPackageData.pack?.name}
                hasEdit={selectedPackageData.hasEdit}
                listItems={packages}/>
      
      <ConfirmDialog onCancel={()=>{}} 
                      onConfirm={onDialogConfirm}
                      message={'هل تريد الغاء التغييرات لهذه الباكج'}
                      openDialog={openConfirmDialog}
                      setOpenDialoge={setOpenConfirmDialoge}/>
    </Fragment>
  );
};

export default (connect((s:{data:IDataState})=>({
  packageData:s.data.packagesData,
  loading:s.data.loading
}),{Set_Pharma_SelectedPackage})(View)) as
 any as (props:IExportedViewProps)=>ReactElement;
