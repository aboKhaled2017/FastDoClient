
import { InputFieldProcessor } from '@/Commons/Services';
import { Box, Button, TextField, Typography, IconButton, makeStyles, Theme, createStyles } from '@material-ui/core';
import React, { useContext } from 'react';
import { AutocompleteCompForStocks } from '../..';
import RefreshIcon from '@material-ui/icons/RefreshRounded'
import  RemoveIcon  from '@material-ui/icons/CloseOutlined';
import { IStockGData } from '@/Interfaces/ModelsTypes';
import SelectButtonList from '@/Views/StkDrugsSearch/SubView/Components/SelectButtonList';
import context from '../../../SearchDrugsContext';

const useStyles=makeStyles((theme:Theme)=>createStyles({
    searchInp: {   
        '& .MuiOutlinedInput-root input':{
            padding: 10
        }
    },
}));


interface ISecondPgComponentProps {}

const SecondPgComponent: React.FC<ISecondPgComponentProps> = props => {
   
  const {
      onSetPageSize:setPageSize,
      handleRefresh,
      onSearchText:onSearchByNameChange,
      onSelectedStock:onSelectStockName,
      selectedStock}=useContext(context);
  const selectedStkName=(selectedStock && selectedStock.name)
    ?selectedStock.name
    :undefined;
  const classes=useStyles();
  return (
    <Box display="flex">
        <Box>
            <Box>
                <Box display="inline-block">
                    <Button size="small" variant="contained" color="primary"
                        endIcon={<RefreshIcon/>}
                        onClick={handleRefresh}
                    >
                            <Box px={1}>
                            تحديث
                            </Box>
                    </Button>
                </Box>
                <Box display="inline-block" ml={1}>
                    <SelectButtonList<number>
                            setSelectedVal={setPageSize}
                            btnText={"حجم الصفحة"}
                            listItems={[2,4,6,8,10]}/>
                </Box>
            </Box>
            
            <Box mt={1} alignItems="center" alignContent="center">
                <TextField
                    placeholder="ابحث باسم الدواء"
                    type="text"
                    variant="outlined"
                    fullWidth
                    className={classes.searchInp}
                    onChange={InputFieldProcessor.delay(function (this:HTMLInputElement,e: any) {
                        if(onSearchByNameChange) onSearchByNameChange(e.target.value);
                    }, 700)}
                />
            </Box>
        </Box>
        <Box ml={2} alignSelf="center">
                {onSelectStockName &&
                <Box>
                    {selectedStkName &&
                    <Box display="flex">
                        <Typography align="center" variant="h6" color="primary">
                        مخزن {selectedStkName}
                        </Typography>
                        <IconButton size="small" onClick={e=>{onSelectStockName(undefined as any)}}>
                            <RemoveIcon color="secondary"/>
                        </IconButton>
                    </Box>
                    }
                    <AutocompleteCompForStocks  OnSelectedStock={onSelectStockName}/>                                    
                </Box>
                }
            </Box>
    </Box>
  );
};

export default SecondPgComponent;
