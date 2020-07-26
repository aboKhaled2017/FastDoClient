import React, { Component, Fragment } from 'react'
import { Box, Typography, Grid } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import SearchView from './Search_View'

interface Props {
    
}
interface State {
    
}

export default class DrugSearch extends Component<Props, State> {
    state = {}

    render() {
        return (
           <Fragment>
               <Box>
                    <Typography align="center" color="primary" variant="h4">
                    صفحة البحث عن الرواكد 
                    </Typography>
                    <Box m={'5px 10px'} display="none">
                        <Alert variant="standard" severity="info" >
                        <p>نتائج البحث قد تكون عبارة عن رواكد مفردة او باقات/باكجز تحتوى على هذا الراكد</p>
                        <p>الرواكد المفردة  يمكنك استهلاكها فقط عن  طريق الشراء مباشرة</p>
                        <p>الباقات/الباكجز يمكنك الاستهلاك فقط عن طريق استبدالها ب باكج/باقة لديك</p>
                        <p>يمكنك فلترة عملية البحث -رواكد/باقات</p>
                        </Alert>
                    </Box>
                    <Box mt={2}>
                      <SearchView/>
                    </Box>
               </Box>
           </Fragment>
        )
    }
}
