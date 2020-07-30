import React, { ReactElement, useEffect } from 'react'
import { Theme, withStyles } from '@material-ui/core'
import Showing_Drugs_Table from './Components/CollapsibleTable';
import { connect } from 'react-redux';
import { IDataState } from '../../../Interfaces/States';
import {GetMyDrugs_Page} from '../../../Redux/Actions/DataActions'
import { I_Drug_DataModel } from '../../../Interfaces/DrugsTypes';
interface IProps {
    GetMyDrugs_Page:()=>void
    dataRows:I_Drug_DataModel[]
}
const styles=(theme:Theme)=>({

})
export default connect((state:{data:IDataState})=>({
    dataRows:state.data.myDrugs.rows
    }), {GetMyDrugs_Page}) (withStyles(styles)((props: IProps): ReactElement=> {
    useEffect(()=>{
        if(props.dataRows && props.dataRows.length==0)
        props.GetMyDrugs_Page();
    },[])
    return (
           <Showing_Drugs_Table/>
    )
}))
