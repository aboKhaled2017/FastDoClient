import React,{Component, Fragment} from 'react';
import {BrowserRouter,Route,Switch, Redirect, Router} from 'react-router-dom'
import './App.css';
import themeConfig from './Utils/theme'
import {Header,Footer, SharedSection} from './components/Layouts'
import { createMuiTheme, ThemeProvider, Theme, withStyles } from '@material-ui/core';
import {AboutUs,ContactUs,DrugSearch,Home,Login,MyLazDrugs,Profile,Join,Account,NotFound,ForgotPassword} from './Views'
import {Provider} from 'react-redux'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import store from './Redux/store';
import {Base_URLs} from './config'
import { AnyAction } from 'redux';
import {createBrowserHistory} from 'history'
import { IUserIdentity } from './Interfaces/AccountTypes';
import { logoutUser, setUserIdentity } from './Redux/Actions/userActions';
import { GetAreas } from './Redux/Actions/DataActions';
import { IHistory } from './Interfaces/DataTypes';

interface IProps{
  classes:{[key:string]:any}
  history:IHistory
}
const styles=((theme:Theme)=>({
  mainContainer:{
    marginTop:theme.spacing(3),
  }
}));
const InitialWorkBeforMountHome=()=>{
  axios.defaults.baseURL=Base_URLs.BaseUrl;
  store.dispatch(GetAreas() as any);
  const UserIdentityStr=localStorage.getItem("UserIdentifier");
  if(UserIdentityStr){
   var userIdentity=JSON.parse(UserIdentityStr) as IUserIdentity;
   var AccessToken=userIdentity.accessToken.token;
   if(AccessToken){
      const decodedToken=jwtDecode(AccessToken) as any; 
      //expired token ,so logout user
      if(decodedToken.exp*1000 < Date.now()){
        store.dispatch(logoutUser(null as any as IHistory) as any);
        window.location.href="/join"
      }
      //token is not expired
      else{
        axios.defaults.headers.common['Authorization']=userIdentity.accessToken.token;
        store.dispatch(setUserIdentity(userIdentity) as any as AnyAction)
      }
    }
  }
}
const browserHistory = createBrowserHistory();
export default withStyles(styles) (class App extends Component<IProps>{
  componentWillMount(){
    InitialWorkBeforMountHome();    
  }
  render() {
    return (
    <Fragment>
      <ThemeProvider theme={createMuiTheme(themeConfig)}>
         <Provider store={store}>
         <Router history={browserHistory}>
             <Header/>
             <SharedSection/>
             <div  className={this.props.classes.mainContainer}>
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
                    <Route exact path="/forgotpassword" component={ForgotPassword}/> 
                    <Route exact path="/not-found" component={NotFound}/>
                    <Redirect to="/not-found" />             
              </Switch>
             </div>
             <Footer/>
           </Router>
         </Provider>     
      </ThemeProvider>
    </Fragment>)
  }
}) as any

