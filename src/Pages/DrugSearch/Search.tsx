import React, { ReactElement, Component, createRef } from 'react'
import MaterialTable, { Localization, MaterialTableProps } from 'material-table'
import { Box, Theme, makeStyles, createStyles, Typography, Grid } from '@material-ui/core'
import { tableIcons } from './TableIcons'
import TableData from './TableData'
import "./index.scss"
import { ILazDrugShowModel } from '../../Interfaces/ModelsTypes'
import DrugModelCard from '../../components/Cards/DrugModelCard'
const useStyles=makeStyles((theme:Theme)=>({
  burningDrugsTable:{
    '& table':{
      display:'block',
      '& tbody':{
        display:'block'
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

  const TableWrapper=(props:{id:string,children:any})=><div id={props.id}>
    {props.children}
  </div>
  return (
    <div className={classes.burningDrugsTable}>
      <MaterialTable
      title="ابحث عن المنتج الذى تريده هنا"
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
         <Grid container>
           <Grid item md xs={12}>
              <DrugModelCard model={record}/>
           </Grid>
           <Grid item md xs={12}>
              <DrugModelCard model={record}/>
           </Grid>
         </Grid>
        </Box>
        )
        }
      }}
      options={{
        header:true,
        headerStyle:{
          marginBottom:15
        },
         searchFieldVariant:'outlined',
         searchFieldAlignment:'right',
         searchFieldStyle:{
           background:'#fff'
         },
         
      }}
      
      columns={[
        { title: 'الاسم', field: 'name',cellStyle:{textAlign:'right'},},
        { title: 'الكمية', field: 'quantity',type: 'numeric' ,cellStyle:{textAlign:'right'}},
        { title: 'السعر', field: 'price', type: 'numeric' ,cellStyle:{textAlign:'right'}},
        {title:  "الخصم",field: 'discount', type: 'numeric',cellStyle:{textAlign:'right'}},
        
      ]}
      data={TableData}
    />
    </div>
  )
}