import store from '@/Redux/store';
import { Box, Snackbar, Typography } from '@material-ui/core';
import { Alert, AlertProps} from '@material-ui/lab';

import React, { ReactElement, useEffect } from 'react';

import MainView from './MainView';
import { localSettings,PackageFromHttpService} from '@Views/StkDrugsSearch/Services/PackageServices';

import {Set_Pharma_Packages,Set_Loading_Data} from '@/Redux/Actions/DataActions'
import { connect } from 'react-redux';

const AlertSettings=localSettings.VisitSearchStkDrugsView_Settings;

interface IProps{
  Set_Pharma_Packages:(packages:any)=>void
  Set_Loading_Data:()=>void
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

    useEffect(()=>{
      var service=PackageFromHttpService.Create();
      props.Set_Loading_Data();
      service.Subscibe({
        OnSuccess:(res=>{         
          props.Set_Pharma_Packages(res.data);   
        })
      },false);
    },[])
    return (
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
    )
}

export default (connect(null,{Set_Pharma_Packages,Set_Loading_Data})(View)) as
any as ()=>ReactElement;