import React, { ReactElement, Component, createRef, useEffect } from 'react'
import MaterialTable, { Localization} from 'material-table'
import { Box, Theme, makeStyles, Grid } from '@material-ui/core'
import { tableIcons } from './Components/TableIcons'
import "./index.scss"
import SearchCard_View from './Components/SearchCard_View'

import SearchInput from './FiltersControls/SearchInput'
import AddressFilter from './FiltersControls/AddressFilter'
import { connect } from 'react-redux'
import { ISearchDataState } from '../../Interfaces/States'
import DateFilter from './FiltersControls/DateFilter'
import { I_Drgs_SearchModel, I_Drgs_SearchPaging_Parmas, I_Drgs_SearchPaging } from '../../Interfaces/SearchDrugsTypes'
import {GetSearchDrugs_Data_Page,Set_DrgsSearch_OrderBy} from '../../Redux/Actions/searchDataActions'
import PagingView from './Components/PagingView'
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
interface IProps{
  tableData:I_Drgs_SearchModel[]
  GetSearchDrugs_Data_Page:(pageData?: I_Drgs_SearchPaging_Parmas)=>void
  Set_DrgsSearch_OrderBy:(orderByClause:string)=>void
  pagingData:I_Drgs_SearchPaging
  loading:boolean
}
const Search_ViewPage= (props:IProps)=>{
  const tableRef=createRef(); 
  const classes=useStyles();
  const orderByTags=['name','quantity','price','discount','valideDate'];
  const {tableData,GetSearchDrugs_Data_Page,Set_DrgsSearch_OrderBy,pagingData,loading}=props
  useEffect(()=>{
    GetSearchDrugs_Data_Page()
  },[])
  return (
    <div className={classes.burningDrugsTable}>
      <Grid container>
         <Grid item md={4} xs={12}>
            <Box m={'2px 8px'}>
              <Box>
                <SearchInput/>
              </Box>
              <Box mt={3}>
                <AddressFilter/>
              </Box>
              <Box mt={5} display="none">
                <DateFilter/>
              </Box>
            </Box>
         </Grid>
         <Grid item md={8} xs={12}>
          <Box>
            <PagingView/>
          </Box>
         <MaterialTable
            title="ابحث عن راكدك هنا"
            icons={tableIcons}    
            tableRef={tableRef}
            isLoading={loading}           
            localization={tbLocalization}    
            onOrderChange={(orderBy: number, orderDirection: "desc" | "asc")=>{
                  Set_DrgsSearch_OrderBy(`${orderByTags[orderBy]} ${orderDirection}`)
            }}       
            
            style={{
              background:'transparent',
              boxShadow:'none',
              margin:'auto 5px'
            }}
            components={{    
              Row:(props:any)=>{
              let record=props.data as I_Drgs_SearchModel;
              return(
              <Box alignContent="center" m={'15px 15px'}>
                <SearchCard_View model={record}/>
              </Box>
              )
              }
            }}
            options={{
              paging:false,
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
              {title:  "تاريخ الصلاحية",field: 'valideDate',tooltip:'رتب حسب تاريخ الصلاحية',filtering:false},
              
            ]}
            data={tableData}
        />
         </Grid>
      </Grid>
    </div>
  )
}
const mapStateToProps=(state:{searchData:ISearchDataState})=>({
  tableData:state.searchData.searchDataTable.rows,
  pagingData:state.searchData.searchDataTable.pagination,
  loading:state.searchData.loading
})
 
export default connect(mapStateToProps, {GetSearchDrugs_Data_Page,Set_DrgsSearch_OrderBy})(Search_ViewPage) as any;