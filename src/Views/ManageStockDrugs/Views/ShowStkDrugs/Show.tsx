import React, { ReactElement, useEffect } from 'react'
import { Theme, withStyles } from '@material-ui/core'
import Showing_StockProdsData_Table from './Components/CollapsibleTable';
import { connect } from 'react-redux';
import {GetMyStockProdsData_Page} from '../../../../Redux/Actions/StockDataActions'

interface IProps {
    GetMyStockProdsData_Page:()=>void
}
const styles=(theme:Theme)=>({

})
export default connect(null,{GetMyStockProdsData_Page}) (withStyles(styles)((props: IProps): ReactElement=> {
    useEffect(()=>{
        props.GetMyStockProdsData_Page();
    },[])
    return (
           <Showing_StockProdsData_Table/>
    )
}))
