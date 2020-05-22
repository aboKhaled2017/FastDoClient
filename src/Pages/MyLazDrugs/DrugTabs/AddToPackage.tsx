import React, { ReactElement, useState } from 'react'
import { ILazDrugModel } from '../../../Interfaces/ModelsTypes'
import { getLzDrugStateFormate, getDrugValidDate, getDrugPriceType, getDrugConsumeType, getDrugDesc, DrugsPackges } from '../../../Commons/Services'
import { makeStyles, Typography, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/EditRounded'
const useStyles = makeStyles((theme) => ({
     
}));
interface IProps {
    model:ILazDrugModel
}

export default ({model}: IProps)=> {
    const classes=useStyles();
    const [connectdPack,setConnectdPack]=useState(DrugsPackges.associatedPackage(model.id))
    return (
    <div>
        {connectdPack&& 
         <p>your package is {connectdPack.name}</p>
        }
    </div>
    )
}
