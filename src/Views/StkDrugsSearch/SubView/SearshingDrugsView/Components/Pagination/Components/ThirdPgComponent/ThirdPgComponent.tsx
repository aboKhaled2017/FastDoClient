import { Box, Button, CircularProgress, createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { Fragment, ReactElement, useContext, useState } from 'react';
import SelectButtonList from '@/Views/StkDrugsSearch/SubView/Components/SelectButtonList';
import { IStkDrugsPackage } from '@/Views/StkDrugsSearch/Interfaces';
import ShowPackageViewModal from './ShowPackageBtn/ShowPackageViewModal';
import { connect } from 'react-redux';
import { IDataState, IPackagesDataStatus } from '@/Interfaces/States';
import {Set_Pharma_SelectedPackage,Update_Pharma_Package} from '@Redux/Actions/DataActions'


import {SelectPackageBtn,SaveChangeBtn,ShowPackageBtn} from '.'

const useStyles=makeStyles((theme:Theme)=>createStyles({
 
}));

interface IThirdPgComponentProps {

}

const ThirdPgComponent: React.FC<IThirdPgComponentProps> =props => {
  return (
    <Fragment>
       <Box ml={1} >
       <SelectPackageBtn/>
       <Box mt={.5} display="flex">
          <SaveChangeBtn/>
          <ShowPackageBtn/>
       </Box>
    </Box>
    </Fragment>
  );
};

export default ThirdPgComponent;
