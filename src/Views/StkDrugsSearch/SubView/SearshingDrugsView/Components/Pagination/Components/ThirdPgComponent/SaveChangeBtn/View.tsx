
import { IDataState, IPackagesDataStatus } from '@/Interfaces/States';
import { Button, CircularProgress } from '@material-ui/core';
import React, { Fragment, ReactElement, useState } from 'react';
import { connect } from 'react-redux';
import {packageService} from '@Views/StkDrugsSearch/Services/PackageServices';
import { IStkDrugsPackage } from '@/Views/StkDrugsSearch/Interfaces';
import {Update_Pharma_Package} from '@Redux/Actions/DataActions'

interface IViewProps {
  packagesData:IPackagesDataStatus
  Update_Pharma_Package:typeof Update_Pharma_Package
}

const View: React.FC<IViewProps> = props=> {
  const {packagesData:{selectedPackageData},Update_Pharma_Package:updatePackage}=props;
  const [saveLoading, setsaveLoading] = useState(false);
  const saveChanges=()=>{
    let pack=selectedPackageData.pack as IStkDrugsPackage;
    var body=packageService.GetPackageUpdatedBodyFromPackage(pack);
    setsaveLoading(true);
    updatePackage({
      body:body,
      packageId:pack.packageId,
      onDone(data:any){
        alert('تم التغيير بنجاح')
      },
      onComplete(){
        setsaveLoading(false);
      }
    })
  }
  return (
    <Fragment>
      <Button endIcon={saveLoading && <CircularProgress size={15}/>}
              disabled={!selectedPackageData.hasEdit || saveLoading} 
              variant="contained" color="primary" 
              size="small"
              onClick={saveChanges}>
        حفظ التغييرات
      </Button>
    </Fragment>
  );
};

export default (connect((s:{data:IDataState})=>({
  packagesData:s.data.packagesData
}),{Update_Pharma_Package})(View as any)) as 
any as ()=>ReactElement;
