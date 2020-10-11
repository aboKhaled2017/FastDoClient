import store from '@/Redux/store';
import { Box, Snackbar, Typography } from '@material-ui/core';
import { Alert, AlertProps} from '@material-ui/lab';

import React, { Fragment } from 'react';
import MainView from './MainView';
import { localSettings } from './Services';

const AlertSettings=localSettings.VisitSearchStkDrugsView_Settings;
interface IProps{

}
function MyAlert(props:AlertProps) {
  return <Alert elevation={6} variant="filled" {...props} />;
}
 
const View :React.FC<IProps>=props=>{
    const [openAlert,setOpenAlert]=React.useState(AlertSettings.isMainAlertWillBeOpened());
    const handleAlertClose = (e:any, reason:any) => {
      AlertSettings.setMainAlertOpenedNow();
      if (reason === 'clickaway') {
        return;
      }
      setOpenAlert(false);
    };
    return (
        <Fragment>
            <Box>
                <Typography align="center" color="primary" variant="h5">
                صفحة البحث وطلب ادوية من المخازن 
                </Typography>
                <Box m={'5px 10px'}>
                  <Snackbar open={openAlert} autoHideDuration={6000}
                                        anchorOrigin={{horizontal:"left",vertical:"bottom"}}
                                        onClose={handleAlertClose}>
                        <MyAlert variant="filled" severity="info" onClose={handleAlertClose as any}>
                          <p>مرحبا بك {store.getState().user.userIdentity.user.name}</p>
                          <p>يمكنك تصفح كل منتجات الادوية عن طريق المخزن الافتراضى وهى منتجات ادوية مجمعة من كل المخازن</p>
                          <p>او يمكنك تصفح منتجات مخزن معين</p>
                        </MyAlert>
                  </Snackbar>                    
                </Box>
                <Box mt={2}>
                  <MainView/>
                </Box>
            </Box>
    </Fragment>
    )
}

export default View;