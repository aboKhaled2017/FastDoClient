import React,{Component, Fragment} from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import './App.css';
import themeConfig from './Utils/theme'
import {Header,Footer} from './components/Layouts'
import { createMuiTheme, ThemeProvider, Container, Theme, withStyles } from '@material-ui/core';
import {AboutUs,ContactUs,DrugSearch,Home,Login,MyLazDrugs,Profile,Join,Account} from './Pages'
const styles=((theme:Theme)=>({
  mainContainer:{
    marginTop:theme.spacing(3)
  }
}))
export default withStyles(styles) (class App extends Component<{classes:{[key:string]:any}}>{
  render() {
    return (
    <Fragment>
      <ThemeProvider theme={createMuiTheme(themeConfig)}>
           <BrowserRouter>
             <Header/>
             <Container disableGutters className={this.props.classes.mainContainer}>
              <Switch>            
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/join" component={Join}/>
                    <Route exact path="/join/:type" component={Join}/>
                    <Route exact path="/profile" component={Profile}/>
                    <Route exact path="/account" component={Account}/>
                    <Route exact path="/aboutUs" component={AboutUs}/>
                    <Route exact path="/contactUs" component={ContactUs}/>
                    <Route exact path="/myLazDrugs" component={MyLazDrugs}/>
                    <Route exact path="/searchDrugs" component={DrugSearch}/>              
              </Switch>
             </Container>
             <Footer/>
           </BrowserRouter>        
      </ThemeProvider>
    </Fragment>)
  }
})

