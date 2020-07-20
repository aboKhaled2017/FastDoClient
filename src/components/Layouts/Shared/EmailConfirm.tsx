import React, { ReactElement } from 'react'
import { Box, Button } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert/Alert'
import { connect } from 'react-redux'
import { IUserState } from '../../../Interfaces/States'
import { Link } from 'react-router-dom'

interface Props {
    userS:IUserState
}

function EmailConfirm({userS}: Props): ReactElement {
    const {userIdentity:{user:{email}}}=userS;
    return (
       <Box>
           <Alert severity="warning">
               <span>
               بريدك الالكترونى غير مفعل ,لقد تم ارسال كود الى <span className="notArabicFont">{email} </span>
               <br/>
               احصل على كود التفعيل وقم بالتفعيل من 
               </span>    
              <Box marginX={1} display="inline">
                 <Button color="primary" variant="outlined" component={Link} to='/account'>هنا</Button>
              </Box> 
            </Alert>
       </Box>
    )
}
export default connect((state:{user:IUserState})=>({
userS:state.user
}), {})(EmailConfirm as any)