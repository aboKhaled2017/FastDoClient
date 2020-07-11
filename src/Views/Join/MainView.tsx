import React, { Component, createRef, RefObject, PropsWithChildren } from 'react'
import { Theme, withStyles, Container, Box, createMuiTheme, ThemeProvider, PropTypes } from '@material-ui/core';
import { Link } from 'react-router-dom'
import Fab from '@material-ui/core/Fab';
import UserIcon from '@material-ui/icons/PersonAddOutlined'
import AsPharmacierView from './AsPharmacy/AsPharmacierView';
import AsStoreOwnerView from './AsStore/AsStoreOwnerView';
enum JoinType{
  JoinAsPharmacier,
  JoinAsStoreOwner
}
interface IProps {
    classes:{[key:string]:any}
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
     margin:'10px auto 10px auto'
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
   }
  }
  return{
    JoinContainer:{
        background:'rgb(245, 245, 245)'
    },
    fab:{
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginLeft: theme.spacing(1),
    },
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
export default withStyles(styles as any)(class  extends Component<IProps, IState> {
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
      (this.asPharmacierBtnRef.current as HTMLButtonElement).style.background=this.focusedBgColorForBtn;
      (this.asStoreBtnRef.current as HTMLButtonElement).style.background=this.unFocusedBgColorForBtn;
      this.setState({joinType:JoinType.JoinAsPharmacier})
    }
    handleOnAsStoreBtnClicked=(e:Event)=>{
      (this.asPharmacierBtnRef.current as HTMLButtonElement).style.background=this.unFocusedBgColorForBtn;
      (this.asStoreBtnRef.current as HTMLButtonElement).style.background=this.focusedBgColorForBtn;
      this.setState({joinType:JoinType.JoinAsStoreOwner})
    }
    render() {
        const {classes}=this.props;
        return (
        <Container className={classes.JoinContainer}>          
          <Box>
             <Fab variant="extended"
                  size="small"
                  color="primary"
                  aria-label="add"
                  focusRipple
                  buttonRef={this.asPharmacierBtnRef}                  
                  className={classes.fab}>
                <UserIcon className={classes.extendedIcon} />
                    انضم كصيدلي
             </Fab>
             <Fab variant="extended"
                  size="small"
                  color="primary"
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
