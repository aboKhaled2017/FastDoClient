import React,{Component, Fragment} from 'react';
import {BrowserRouter,Route,Switch, Redirect, Router} from 'react-router-dom'
import './App.css';
import themeConfig from './Utils/theme'
import {Header,Footer, SharedSection} from './components/Layouts'
import { createMuiTheme, ThemeProvider, Theme, withStyles } from '@material-ui/core';
import {AboutUs,ContactUs,DrugSearch,Home,Login,ManageMyDrugs,Profile,Join,
  Account,NotFound,ForgotPassword, UnAuthorized,ManageStockDrugs,SearchStocksPage,
SearchAndManageStockDrugs,StockDrugsRequests} from './Views'
import {Provider} from 'react-redux'
import jwtDecode from 'jwt-decode'
import store from './Redux/store';
import {setDefaultConfig} from './config'
import { AnyAction } from 'redux';
import {createBrowserHistory} from 'history'
import { IUserIdentity } from './Interfaces/AccountTypes';
import { logoutUser, setUserIdentity } from './Redux/Actions/userActions';
import { GetAreas } from './Redux/Actions/DataActions';
import { IHistory } from './Interfaces/DataTypes';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import ProtectedRoute from './components/ProtectedRoute';
import UnAuthentictedRoute from './components/UnAuthentictedRoute';
import { UserRoles } from './Interfaces/UserTypes';

interface IProps{
  classes:{[key:string]:any}
  history:IHistory
}
const styles=((theme:Theme)=>({
  mainContainer:{
    marginTop:theme.spacing(3),
  }
}));
const browserHistory = createBrowserHistory();
const InitialWorkBeforMountHome=()=>{  
  setDefaultConfig();
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
        browserHistory.push("/login");        
      }
      //token is not expired
      else{
        userIdentity.user.role=decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        store.dispatch(setUserIdentity(userIdentity) as any as AnyAction);      
      }
    }
  }
}
export default withStyles(styles) (class App extends Component<IProps>{
  componentWillMount(){
    InitialWorkBeforMountHome();    
  }
  render() {
    const mainComponent=
    (<Fragment>
      <ThemeProvider theme={createMuiTheme(themeConfig as any)}>
         <Provider store={store}>
         <Router history={browserHistory}>
             <Header/>
             <SharedSection/>
             <div  className={this.props.classes.mainContainer}>
              <Switch>            
                    <Route exact path="/" component={Home}/>
                    <UnAuthentictedRoute  exact path="/login" component={Login}/>
                    <UnAuthentictedRoute exact path="/join" component={Join}/>
                    <UnAuthentictedRoute exact path="/join/:type" component={Join}/>
                    <UnAuthentictedRoute exact path="/forgotpassword" component={ForgotPassword}/>

                    <Route exact path="/aboutUs" component={AboutUs}/>
                    <Route exact path="/contactUs" component={ContactUs}/>

                    <ProtectedRoute  exact path="/profile" component={Profile}/>
                    <ProtectedRoute  exact path="/account" component={Account}/>
                    
                    <ProtectedRoute  exact path="/myLazDrugs" component={ManageMyDrugs} targetRole={UserRoles.pharmacier}/>
                    <ProtectedRoute  exact path="/searchDrugs" component={DrugSearch} targetRole={UserRoles.pharmacier}/>
                    <ProtectedRoute  exact path="/searchStocks" component={SearchStocksPage} targetRole={UserRoles.pharmacier}/>
                    <ProtectedRoute  exact path="/requestStkDrugs" component={SearchAndManageStockDrugs} targetRole={UserRoles.pharmacier}/>
                    
                    <ProtectedRoute  exact path="/myprods" component={ManageStockDrugs} targetRole={UserRoles.stocker}/>
                    <ProtectedRoute  exact path="/stock/drgs/requests" component={StockDrugsRequests} targetRole={UserRoles.stocker}/>

                    <Route exact path="/not-found" component={NotFound}/>
                    <Route exact path="/unAuthorized" component={UnAuthorized}/>
                    <Redirect to="/not-found" />             
              </Switch>
             </div>
             <Footer/>
           </Router>
         </Provider>     
      </ThemeProvider>
    </Fragment>);
    const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
    return (
        <StylesProvider jss={jss}>
          {mainComponent}
        </StylesProvider>
    )
  }
}) as any

