import React, { Component, createRef, RefObject, PropsWithChildren } from 'react'
import { Theme, withStyles, Container, Box, createMuiTheme, ThemeProvider, PropTypes } from '@material-ui/core';
import { Link } from 'react-router-dom'
import Fab from '@material-ui/core/Fab';
import UserIcon from '@material-ui/icons/PersonAddOutlined'
import AsPharmacierView from './AsPharmacy';
import AsStoreOwnerView from './AsStore';
import {Reset_SignUp_Current_Step} from '../../Redux/Actions/UIActions'
import { connect } from 'react-redux';
enum JoinType{
  JoinAsPharmacier,
  JoinAsStoreOwner
}
interface IProps {
    classes:{[key:string]:any}
    Reset_SignUp_Current_Step:()=>void
}
interface IState {
    joinType:JoinType
}
const styles=(theme:Theme)=>{
  (theme as any).spreadCommonJoinView={
    pageTitle:{
     margin:'10px auto 10px auto'
   },
    image:{
      margin:'20px auto 20px auto',
      width:70
   },
   textField:{
     margin:'10px auto 10px auto',
     '& input,textarea':{
      background:'transparent !important'
     }
   },
   button:{
     margin:theme.spacing(3,'auto',1.5,'auto'),
     position:'relative'
   },
   customeErros:{
     marginTop:20,
     color:'red',
     fontSize:'0.8rem'
   },
   progress:{
     position:'absolute',
   },
   formControl:{
    marginTop:'8px', 
    background:'#fff',
    width:'100%',
    minWidth: 120,
    '& .MuiSelect-selectMenu':{
      background:'transparent !important'
     }
   }
  }
  return{
    JoinContainer:{
       
    },
    fab:{
      margin: theme.spacing(1),
      background:'#fff',
      color:theme.palette.primary.dark,
      "&.clicked":{
        background:theme.palette.primary.dark,
        color:'#fff',
      }
    },
    extendedIcon: {
      marginLeft: theme.spacing(1),
    },
    joinTopBar:{
      textAlign:'center'
    }
 }
}
const joinViewTheme=createMuiTheme({
  spreadIt:{
    form:{
      textAlign:'center'
    },
    pageTitle:{
     margin:'10px auto 10px auto'
   },
    image:{
      margin:'20px auto 20px auto',
   },
   textField:{
     margin:'10px auto 10px auto'
   },
   button:{
     marginTop:20,
     position:'relative'
   },
   customeErros:{
     marginTop:20,
     color:'red',
     fontSize:'0.8rem'
   },
   progress:{
     position:'absolute',
   }
  }
} as any)
const MainView= withStyles(styles as any)(class  extends Component<IProps, IState> {
    state = {joinType:JoinType.JoinAsPharmacier}
    asPharmacierBtnRef:RefObject<HTMLButtonElement>
    asStoreBtnRef:RefObject<HTMLButtonElement>
    focusedBgColorForBtn='#008394'
    unFocusedBgColorForBtn='#00bcd4'
    constructor(props:IProps){
      super(props);
       this.asPharmacierBtnRef=createRef();
       this.asStoreBtnRef=createRef();
    }
    componentDidMount(){
      (this.asPharmacierBtnRef.current as HTMLButtonElement).onclick=this.handleOnAsPharmacierBtnClicked;
      (this.asStoreBtnRef.current as HTMLButtonElement).onclick=this.handleOnAsStoreBtnClicked;
      let joinType=(this.props as any).match.params.type as JoinType;
      if(joinType==JoinType.JoinAsStoreOwner)
      (this.asStoreBtnRef.current as HTMLButtonElement).click()
      else 
      (this.asPharmacierBtnRef.current as HTMLButtonElement).click()     
    }
    handleOnAsPharmacierBtnClicked=(e:MouseEvent)=>{
      (this.asPharmacierBtnRef.current as HTMLButtonElement).classList.add('clicked');
      (this.asStoreBtnRef.current as HTMLButtonElement).classList.remove('clicked');
      this.setState({joinType:JoinType.JoinAsPharmacier});
      this.props.Reset_SignUp_Current_Step();
    }
    handleOnAsStoreBtnClicked=(e:Event)=>{
      (this.asPharmacierBtnRef.current as HTMLButtonElement).classList.remove('clicked');
      (this.asStoreBtnRef.current as HTMLButtonElement).classList.add('clicked');
      this.setState({joinType:JoinType.JoinAsStoreOwner});
      this.props.Reset_SignUp_Current_Step();
    }
    render() {
        const {classes}=this.props;
        return (
        <Container className={classes.JoinContainer}>          
          <Box className={classes.joinTopBar}>
             <Fab variant="extended"
                  size="medium"
                  
                  aria-label="add"
                  focusRipple
                  buttonRef={this.asPharmacierBtnRef}                  
                  className={classes.fab}>
                <UserIcon className={classes.extendedIcon} />
                    انضم كصيدلي
             </Fab>
             <Fab variant="extended"
                  size="medium"
                 
                  aria-label="add"
                  buttonRef={this.asStoreBtnRef}
                  className={classes.fab}>
                <UserIcon className={classes.extendedIcon} />
                    انضم كمالك مخزن
             </Fab>
           </Box>
           {this.state.joinType===JoinType.JoinAsPharmacier
           ?<AsPharmacierView/>
           :<AsStoreOwnerView/>}
        </Container>)
    }
})

export default connect(null,{Reset_SignUp_Current_Step})(MainView as any)