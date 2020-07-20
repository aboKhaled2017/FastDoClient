import React, { ReactElement } from 'react'
import { Theme, withStyles } from '@material-ui/core'
import Showing_Drugs_Table from './Components/CollapsibleTable';

interface IProps {
    
}
const styles=(theme:Theme)=>({

})
export default withStyles(styles)(({}: IProps): ReactElement=> {
    return (
           <Showing_Drugs_Table/>
    )
})
