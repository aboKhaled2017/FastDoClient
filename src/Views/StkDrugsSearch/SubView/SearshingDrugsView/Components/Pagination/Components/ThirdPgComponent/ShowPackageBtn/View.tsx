import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { Fragment, ReactElement, useState } from 'react';
import { connect } from 'react-redux';
import ShowPackageViewModal from './ShowPackageViewModal'
import { IDataState } from '@/Interfaces/States';
import { IStkDrugsPackage } from '@/Views/StkDrugsSearch/Interfaces';

const useStyles=makeStyles((theme:Theme)=>createStyles({
  showBtn:{  
   marginLeft:1
  }
}));


interface IViewProps {
  selectedPackageData:IStkDrugsPackage|undefined
}

const View: React.FC<IViewProps> =props => {
  const classes=useStyles();
  const {selectedPackageData}=props;
  const [openDialog, setOpenDialog] = useState(false);
  const showPackages=()=>{
    setOpenDialog(true);
  }
  return (
    <Fragment>
        <ShowPackageViewModal openDialog={openDialog} 
                              setOpenDialog={setOpenDialog}/>
        <Button disabled={!selectedPackageData} variant="outlined" color="primary" 
                size="small"
                onClick={showPackages}
                className={classes.showBtn}>
          عرض الباكج 
        </Button>
    </Fragment>
  );
};

export default (connect((s:{data:IDataState})=>({
  selectedPackageData:s.data.packagesData.selectedPackageData.pack
}))(View)) as 
any as ()=>ReactElement;
