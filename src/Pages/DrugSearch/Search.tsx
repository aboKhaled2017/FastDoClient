import React, { ReactElement, Component, createRef, useState } from 'react'
import MaterialTable, { Localization, MaterialTableProps, MTableBody, MTableHeader} from 'material-table'
import { Box, Theme, makeStyles, createStyles, Typography, Grid } from '@material-ui/core'
import { tableIcons } from './TableIcons'
import dataRecords from './TableData'
import "./index.scss"
import { ILazDrugShowModel } from '../../Interfaces/ModelsTypes'
import DrugModelCard from '../../components/Cards/DrugModelCard'

import SearchInput from './SearchInput'
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

const tbLocalization:Localization={
toolbar:{
  searchPlaceholder:'ابحث باسم المنتج',
  searchTooltip:'ابحث',
  nRowsSelected: 'تم اختيار {0}  من الصفوف'
},
pagination:{
  firstTooltip:"الاول",
  lastTooltip:"الاخير",
  nextTooltip:'التالى',
  previousTooltip:"السابق",
  labelRowsSelect:"الحقول",
  labelDisplayedRows: '{to}-{from} من {count}'
},
header: {
  actions: 'العمليات'
},
body: {
  emptyDataSourceMessage: 'لا يوجد بيانات للعرض',
  filterRow: {
      filterTooltip: 'التصفية/التصفية'
  }
}
}

export default ()=>{
  const tableRef=createRef(); 
  const classes=useStyles();
  const [tableData,setTableData]=useState(dataRecords)

  const handleInpChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    let q=e.target.value.trim();
    if(!q) setTableData(dataRecords);
    let data=dataRecords.filter(record=>record.name.includes(q))
     setTableData(data)
  }
  return (
    <div className={classes.burningDrugsTable}>
      <Grid container>
         <Grid item md={4} xs={12}>
            <Box p={'1px 5px'}>
              <SearchInput onChange={handleInpChange}/>
            </Box>
         </Grid>
         <Grid item md={8} xs={12}>
         <MaterialTable
      title="ابحث عن راكدك هنا"
      icons={tableIcons}    
      tableRef={tableRef}
      localization={tbLocalization}
      style={{
        background:'transparent',
        boxShadow:'none'
      }}
      components={{    

        Row:(props:any)=>{
        let record=props.data as ILazDrugShowModel;
        return(
        <Box alignContent="center" m={'15px 15px'}>
          <DrugModelCard model={record}/>
        </Box>
        )
        }
      }}
      options={{
        filtering:true,
        header:true,
        toolbar:false,
        headerStyle:{
          marginBottom:15,
          background:'transparent'
        },
         showTitle:false,
         hideFilterIcons:false,
         searchFieldVariant:'outlined',
         searchFieldAlignment:'right',
         searchFieldStyle:{
           background:'#fff'
         },
         
      }}
      
      columns={[
        { title: 'الاسم', field: 'name',tooltip:'رتب حسب الاسم',filtering:false},
        { title: 'الكمية', field: 'quantity',tooltip:'راب حسب الكمية',filtering:false },
        { title: 'السعر', field: 'price',tooltip:'رتب حسب السعر',filtering:false},
        {title:  "الخصم",field: 'discount',tooltip:'رتب حسب الخصم',filtering:false},
        
      ]}
      data={tableData}
    />
         </Grid>
      </Grid>
    </div>
  )
}