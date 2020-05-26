import React, { ReactElement, Component } from 'react'
import {
  SearchBox,
  Hits,
  HitsStats,
  RefinementListFilter,
  Pagination,
  ResetFilters,
  MenuFilter,
  SelectedFilters,
  HierarchicalMenuFilter,
  NumericRefinementListFilter,
  SortingSelector,
  SearchkitComponent,
  SearchkitProvider,
  SearchkitManager,
  NoHits,
  RangeFilter,
  InitialLoader,
  ViewSwitcherToggle,
  ViewSwitcherHits,
  Layout, LayoutBody, LayoutResults,
  SideBar, TopBar,
  ActionBar, ActionBarRow
} from "searchkit";

import "searchkit/theming/theme.scss";
import "./EsSearch.scss"

import {MovieHitsGridItem, MovieHitsListItem} from "./ResultComponents"
import { Box, Theme, Typography, Button } from '@material-ui/core';

interface Props {
    
}
export default ({}: Props)=> {
    const host = "http://demo.searchkit.co/api/movies"
    const searchkit = new SearchkitManager(host,{})
    searchkit.translateFunction = (key:string)=> {
      return ({"pagination.next":"Next Page", "pagination.previous":"Previous Page"} as {[key:string]:string})[key]
    }
    return (
      <SearchkitProvider searchkit={searchkit}>
      <Layout>
          <Box m={'3px 10px'} width={'50%'}>
          <SearchBox
              translations={{"searchbox.placeholder":"اكتب اسم العقار"}}
              queryOptions={{"minimum_should_match":"70%"}}
              autofocus={true}
              searchOnChange={true}
              queryFields={["actors^1","type^2","languages","title^5", "genres^2", "plot"]}/>
          </Box>
          <LayoutBody>
            <SideBar>
                <HierarchicalMenuFilter fields={["type.raw", "genres.raw"]} title="Categories" id="categories"/>
                <RangeFilter min={0} max={100} field="discount" id="discount" title="نسبة الخصم" showHistogram={true}/>
                <RefinementListFilter id="actors" title="Actors" field="actors.raw" operator="OR" size={10}/>
                <RefinementListFilter translations={{"facets.view_more":"View more writers"}} id="writers" title="Writers" field="writers.raw" operator="OR" size={10}/>
                <RefinementListFilter id="countries" title="Countries" field="countries.raw" operator="OR" size={10}/>
                <NumericRefinementListFilter id="runtimeMinutes" title="Length" field="runtimeMinutes" options={[
                  {title:"All"},
                  {title:"up to 20", from:0, to:20},
                  {title:"21 to 60", from:21, to:60},
                  {title:"60 or more", from:61, to:1000}
                ]}/>
              </SideBar>
            <LayoutResults>
              <ActionBar>
                <ActionBarRow>
          		  <HitsStats translations={{
                    "hitstats.results_found":"{hitCount} نتيجة بحث موجودة"
                  }}/>                  
          		  <SortingSelector options={[
          					{label:"الاسم", field:"_score", order:"desc",defaultOption:true},
          					{label:"الكمية", field:"quantity", order:"desc"},
                            {label:"نسبة الخصم", field:"discount", order:"asc"},
                            {label:"السعر", field:"price", order:"asc"}
          		   ]}/>
                </ActionBarRow>
                <ActionBarRow>
                  <SelectedFilters/>
                  <ResetFilters translations={{'reset.clear_all':'ازالة كل الفلترات'}}/>
                </ActionBarRow>
              </ActionBar>
              <ViewSwitcherHits
      			      hitsPerPage={12} highlightFields={["title","plot"]}
                  sourceFilter={["plot", "title", "poster", "imdbId", "imdbRating", "year"]}
                  hitComponents = {[
                    {key:"grid", title:"Grid", itemComponent:MovieHitsGridItem},
                    {key:"list", title:"List", itemComponent:MovieHitsListItem,defaultOption:true}
                  ]}
                  mod="list"
                  itemc
                  scrollTo="body"
              />
              <NoHits 
                  translations={{
                    "NoHits.NoResultsFound":"لايوجد اى رواكد ل  {query}",
                    "NoHits.DidYouMean":"هل انت تقصد  {suggestion}",
                    "NoHits.SearchWithoutFilters":"البحث عن {query} بدون اى فلترة",
                    "NoHits.NoResultsFoundDidYouMean":"لا يوجد نتائج ل  {query}. هل انت تقصد {suggestion}?"
                  }} 
                  errorComponent ={
                  (props:any)=> {      
                    return (
                      <Box textAlign="center">
                        <Typography color="secondary" variant="body2">
                         نحن نتأسف لك ,لقد حدثت مشكلة ما اثناء الحصول على البيانات من الخادم
                        </Typography>
                        <Box mt={2}>
                          <Button variant="outlined" color="primary">
                            عودة الى البحث الافتراضى
                          </Button>
                        </Box>
                      </Box>
                    )
                  }
                  }
                  suggestionsField={"title"}/>
              <InitialLoader/>
      		  <Pagination showNumbers={true}/>
      		  </LayoutResults>
          </LayoutBody>
    		<a className="view-src-link" href="https://github.com/searchkit/searchkit-demo/blob/master/src/app/src/App.tsx">View source »</a>
    	</Layout>
      </SearchkitProvider>
    )
}
