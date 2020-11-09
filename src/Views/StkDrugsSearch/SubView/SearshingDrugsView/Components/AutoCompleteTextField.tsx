// *https://www.registers.service.gov.uk/registers/country/use-the-api*

import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { IDataState } from '../../../../../Interfaces/States';
import { GetAllStocksNames } from '../../../../../Redux/Actions/DataActions';
import { IStockGData } from '../../../../../Interfaces/ModelsTypes';

interface IOption{
    name:string 
    id:string
}
interface IAutoTextBoxProps{
  stocksData:IStockGData[]
  loading:boolean
  GetAllStocksNames:()=>void
  OnSelectedStock:(s:IStockGData)=>void
}

const AutoTextBox:React.FC<IAutoTextBoxProps>=props=>{
  let {stocksData,loading,GetAllStocksNames,OnSelectedStock}=props;
  const [open, setOpen] = React.useState(false);
  loading=stocksData.length===0?true:loading;
  React.useEffect(() => {
    let active = true;

    (async () => {
      GetAllStocksNames();
    })();

    return () => {
      active = false;
    };
  }, []);
  
  const onChange=(e: React.ChangeEvent<{}>, value: IStockGData | null)=>{
    OnSelectedStock(value as any);
  }
  return (
    <Autocomplete
      id="fetchStocks"
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={stocksData}
      onChange={onChange}      
      loading={loading}
      loadingText="جارى التحميل"
      noOptionsText="لا يوجد هذا الاسم"
      renderInput={(params) => (
        <TextField
          {...params}
          label="ابحث فى مخزن"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}


export default connect((state:{data:IDataState})=>({
 stocksData:state.data.stocksGData,
 loading:state.data.loading
}),{GetAllStocksNames})(AutoTextBox as React.FC<{
  OnSelectedStock:(s:IStockGData)=>void
}>);
