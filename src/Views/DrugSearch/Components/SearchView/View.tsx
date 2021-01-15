import React, { createRef, useEffect } from 'react'
import { Theme, makeStyles, Grid } from '@material-ui/core'

import LeftPartView from './LeftPartView'
import RightPartView from './RightPartView'
const useStyles=makeStyles((theme:Theme)=>({
  burningDrugsTable:{
    '& table':{
      display:'block',
      '& tbody':{
        display:'block',
        '& >tr:first-child':{
          display:'none'
        }
      },
      '& thead':{
        '& th':{
          border:0,
          '& .MuiButtonBase-root':{
            background:theme.palette.secondary.dark,
            padding:' 3px 10px',
            borderRadius:5,
            color: '#fff'
          }
        }
      }
    }
  }
  
}))

interface IProps{
}
export default  (props:IProps)=>{
  const classes=useStyles();
  return (
    <div className={classes.burningDrugsTable}>
      <Grid container>
         <Grid item md={4} xs={12}>
            <LeftPartView/>
         </Grid>
         <Grid item md={8} xs={12}>
          <RightPartView/>
         </Grid>
      </Grid>
    </div>
  )
}
