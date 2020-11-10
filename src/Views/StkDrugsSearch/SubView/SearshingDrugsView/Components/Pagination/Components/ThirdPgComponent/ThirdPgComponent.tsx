import { Box, Button, CircularProgress, createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import SelectButtonList from '@/Views/StkDrugsSearch/SubView/Components/SelectButtonList';
import context from '@/Views/StkDrugsSearch/GViewContext';
import { IStkDrugsPackage } from '@/Views/StkDrugsSearch/Interfaces';

const useStyles=makeStyles((theme:Theme)=>createStyles({
  saveBtn: {
    
  },
  showBtn:{
   
   marginLeft:1
  }
}));

interface IThirdPgComponentProps {}

const ThirdPgComponent: React.FC<IThirdPgComponentProps> = () => {
  const classes=useStyles();
  const contextObj=useContext(context);
  const [load,setLoad]=useState(contextObj.loading);
  const [selectedPackage,setSelectedPackage]=useState<IStkDrugsPackage|undefined>(contextObj.packagesSettings.selectedPackage);

  var check=setInterval(()=>{
    if(!contextObj.loading){
      clearInterval(check);
      setLoad(false);
    }
  },1000);

  const showPackages=()=>{
   
  }
  return (
    
    <Box ml={1} >
       {load && <CircularProgress color="inherit"/>}
       {!load &&
         <SelectButtonList<IStkDrugsPackage> 
                    style={{minWidth:'100%'}}
                    setSelectedVal={pack=>{
                      contextObj.packagesSettings.selectedPackage=pack;
                      contextObj.packagesSettings.hasEdit=false;
                      setSelectedPackage(pack);
                    }}
                    btnText={"الطلبية الحالية"}
                    listItemsMap={p=>p.name}
                    listItems={contextObj.packagesSettings.packages}/>
        }
        <Box mt={.5} display="flex">
          <Button disabled={!contextObj.packagesSettings.hasEdit} variant="contained" color="primary" 
                  size="small"
                  className={classes.saveBtn}>
            حفظ التغييرات
          </Button>
          <Button disabled={!selectedPackage} variant="outlined" color="primary" 
                  size="small"
                  onClick={showPackages}
                  className={classes.showBtn}>
             عرض الباكج 
          </Button>
        </Box>
    </Box>
  );
};

export default ThirdPgComponent;
