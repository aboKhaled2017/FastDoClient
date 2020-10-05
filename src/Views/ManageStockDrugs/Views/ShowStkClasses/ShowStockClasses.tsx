import React, { useEffect } from 'react'
import {  IUserState } from '../../../../Interfaces/States'
import { connect } from 'react-redux'

import { makeStyles, Theme, createStyles, Box, Backdrop, CircularProgress } from '@material-ui/core'

import ClassTable from './Components/ClassTable'
import { IPharmasStockClass } from '@/Interfaces/AccountTypes'

const useStyles=makeStyles((theme:Theme)=>createStyles({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));
interface IProps {
    PharmasClasses:IPharmasStockClass[]
    loading:boolean
}

const View = (props: IProps) => {
    const classes=useStyles();
    const {PharmasClasses,loading}=props;

    return (
    <Box>
      <Backdrop className={classes.backdrop}
                  open={loading}>
              <Box mx={2}>
                جارى تحميل البيانات
              </Box>
              <CircularProgress color="inherit" />
      </Backdrop>
      <Box>
          <ClassTable PharmasClasses={PharmasClasses}/>
      </Box>
    </Box>)
}

export default connect((state:{user:IUserState})=>({
    PharmasClasses:(state.user.userIdentity.user as any)['pharmasClasses'],
    loading:state.user.loading
}), {})(View) as any
