import React, { createRef, useEffect } from 'react'
import MaterialTable ,{Options as ITableOptions,Components as ITableComponent 
,Column as ITableColumn} from 'material-table'
import { Box, Theme, makeStyles } from '@material-ui/core'
import { tableIcons } from '../TableIcons'
import {MainCardView} from '../Cards'
import { connect } from 'react-redux'
import { ISearchDataState } from '@/Interfaces/States'
import { I_Drgs_SearchModel, I_Drgs_SearchPaging_Parmas, I_Drgs_SearchPaging } from '@/Interfaces/SearchDrugsTypes'
import {GetSearchDrugs_Data_Page,Set_DrgsSearch_OrderBy} from '@Redux/Actions/searchDataActions'
import PagingView from '../Pagination'
import { FuncsService } from '../../Services'

const useStyles=makeStyles((theme:Theme)=>({

}))

interface IProps{
  tableData:I_Drgs_SearchModel[]
  GetSearchDrugs_Data_Page:(pageData?: I_Drgs_SearchPaging_Parmas)=>void
  Set_DrgsSearch_OrderBy:(orderByClause:string)=>void
  pagingData:I_Drgs_SearchPaging
  loading:boolean
}

const tableOptions:ITableOptions={
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
    
}
const tableStyle:React.CSSProperties={
    background:'transparent',
    boxShadow:'none',
    margin:'auto 5px'
}
const tableComponents:ITableComponent={    
    Row:(props:any)=>{
    let record=props.data as I_Drgs_SearchModel;
    return(
    <Box alignContent="center" m={'15px 15px'}>
        <MainCardView model={record}/>
    </Box>
    )
    }
}
const tableColumns:ITableColumn<I_Drgs_SearchModel>[]=[
    { title: 'الاسم', field: 'name',tooltip:'رتب حسب الاسم',filtering:false},
    { title: 'الكمية', field: 'quantity',tooltip:'راب حسب الكمية',filtering:false },
    {title:  "الخصم",field: 'discount',tooltip:'رتب حسب الخصم',filtering:false},
    {title:  "تاريخ الصلاحية",field: 'valideDate',tooltip:'رتب حسب تاريخ الصلاحية',filtering:false},
    {title:  "عدد الطلبات",field: 'requestsCount',tooltip:'رتب حسب عدد الاكثر طلبا',filtering:false},
]

const RightPartView= (props:IProps)=>{
  const tableRef=createRef(); 
  const classes=useStyles();
  const orderByTags=['name','quantity','price','discount','valideDate','requestsCount'];
  const {tableData,GetSearchDrugs_Data_Page,Set_DrgsSearch_OrderBy,loading}=props
  const title="ابحث عن راكدك هنا";
  const onchange=(orderBy: number, orderDirection: "desc" | "asc")=>{
     if(orderBy<0)return;
    Set_DrgsSearch_OrderBy(`${orderByTags[orderBy]} ${orderDirection}`)
  }
  useEffect(()=>{
    GetSearchDrugs_Data_Page()
  },[])
  return (
    <Box>
        <Box>
            <PagingView/>
        </Box>
        <MaterialTable
            title={title}
            icons={tableIcons}    
            tableRef={tableRef}
            isLoading={loading}           
            localization={FuncsService.getTableLocalization()}    
            onOrderChange={onchange}              
            style={tableStyle}
            components={tableComponents}
            options={tableOptions}   
            columns={tableColumns}
            data={tableData}
        />
    </Box>
  )
}
const mapStateToProps=(state:{searchData:ISearchDataState})=>({
  tableData:state.searchData.searchDataTable.rows,
  pagingData:state.searchData.searchDataTable.pagination,
  loading:state.searchData.loading
})
 
export default connect(mapStateToProps, 
    {GetSearchDrugs_Data_Page,Set_DrgsSearch_OrderBy})(RightPartView) as any;