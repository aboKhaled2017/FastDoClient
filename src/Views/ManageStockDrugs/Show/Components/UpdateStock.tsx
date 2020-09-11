import React, { Component, createRef, useState } from 'react'
import { connect } from 'react-redux'
import {GetMyStockProdsData_Page} from '../../../../Redux/Actions/StockDataActions'
import ImageUploadIcon from '@material-ui/icons/ImageRounded'
import { makeStyles, Theme, createStyles, Box, TextField, Backdrop, CircularProgress } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import {IStocksDataState } from '../../../../Interfaces/States';
import axios from 'axios';
import {DialogActions,DialogContent,DialogTitle} from './Modal/ModalMainComponents'
import { Label } from '@material-ui/icons'
import { Alert } from '@material-ui/lab'
import UploadIcon from '@material-ui/icons/CloudUpload'
import { displayError } from '../../../../Helpers/HelperJsxFunctions'
import { Base_URLs } from '../../../../config'
interface IStkProductData{
 colNameOrder:number 
 colPriceOrder:number 
 colDiscountOrder:number 
 forClass:string
 sheet:File
}
interface IStkProductError{
    ColNameOrder?:string[] 
    ColPriceOrder?:string[]  
    ColDiscountOrder?:string[]  
    ForClass?:string[] 
    Sheet?:string[] 
    G?:string
}
interface IProps {
    GetMyStockProdsData_Page:()=>void
}

const useStyles=makeStyles((theme:Theme)=>createStyles({
    dialog:{
        minWidth:'30%'
    },
    textField:{   
        marginTop:'8px',     
        background:'#fff',
        '& .MuiFormLabel-root':{
            fontSize:'1.2rem'
        },
        '& label':{
            color:'#666'
        }
    },
    formControl: {   
        marginTop:'8px', 
        background:'#fff',
        width:'100%',
        minWidth: 120,
    },
    formControl_withError: {   
        marginTop:'8px', 
        background:'#fff',
        width:'100%',
        minWidth: 120,   
        '& .MuiSelect-select.MuiSelect-selectMenu':{
            border:'1px solid red',
        }
    },
    formButton:{
     marginTop:theme.spacing(2)
    },
    formButtonIcon:{
        marginLeft:theme.spacing(1.5)
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    customeErros:{
        color:'red',
        fontSize:'0.8rem'
    },
}));
const api_formData = axios.create({
    baseURL: Base_URLs.BaseUrl,
    headers: {
      common: {
        Accept: 'application/json',
      }
    }
})
const UpdateStockView =(props:IProps)=>{
    const InitStkDataState={
        colNameOrder:1,
        colPriceOrder:2,
        colDiscountOrder:3,
        forClass:'A',
        sheet:null as any
    }
    const InitStkErrorState={
        ColDiscountOrder:undefined,
        ColNameOrder:undefined,
        ColPriceOrder:undefined,
        ForClass:undefined,
        G:undefined,
        Sheet:undefined
    }
    const classes = useStyles();
    const [openModal, setOpenModal] = React.useState(false);
    const uploadFileInp=createRef<HTMLInputElement>();
    const [stkProdData,setStkProdData]=useState<IStkProductData>({...InitStkDataState});
    const [stkProdError,setStkProdError]=useState<IStkProductError>({...InitStkErrorState});
    const [uploading,setUploading]=useState(false);
    const [fileName,setFileName]=useState('');
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        var target=e.target as EventTarget&HTMLInputElement;
        if(!target || !target.files) return;
        var file=target.files[0];
        if(!file)return;
        var name="";
        /*this.getImgUrlFromFile(file,src=>{
            
            this.props.On_Ph_Signup_Input_change(name,file,1,file.name);
        });*/   
    }
    const {GetMyStockProdsData_Page}=props;
    const handleModalClose = () => {
        setOpenModal(false);
    };
    const handleModalToggle = () => {
        setOpenModal(!openModal);
    };
    const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        e.persist();
        setStkProdData(prev=>({...prev,[e.target.name as string]:e.target.value as string}))
    }
    const handleFileInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setFileName('');
        setStkProdData(prev=>({...prev,sheet:undefined as any as File}))
        var target=e.target as EventTarget&HTMLInputElement;
        if(!target || !target.files) return;
        var file=target.files[0];
        if(!file)return;
        setStkProdError(p=>({...p,Sheet:undefined}));
        setFileName(file.name);
        setStkProdData(prev=>({...prev,sheet:file}))
    }
    const handleSubmit=()=>{
        if(!stkProdData.sheet){
            setStkProdError(prev=>({...prev,Sheet:["من فضلك اختر الملف"]}));
            return;
        }
        var formData=new FormData();
        formData.append("colNameOrder",(stkProdData.colNameOrder-1).toString());
        formData.append("colPriceOrder",(stkProdData.colPriceOrder-1).toString());
        formData.append("colDiscountOrder",(stkProdData.colDiscountOrder-1).toString());
        formData.append("forClass",stkProdData.forClass);
        formData.append("sheet",stkProdData.sheet);
        setUploading(true);
        api_formData.put(`/stk/prods`,formData)
        .then(res=>{
            GetMyStockProdsData_Page();
            setStkProdData({...InitStkDataState});
            setStkProdError({...InitStkErrorState});
            setOpenModal(false);
        })
        .catch(err=>{
            (window as any).a=err;
        if(!err.response)return;
        if(err.response.status==404){
           setStkProdError({...stkProdError,G:'خطأ فى الاتصال بالسيرفر'}); 
            return;
        }
        if(!err.response) 
        {
            alert("خطأ فى الاتصال بالسيرفر");
            return;
        }
        setStkProdError({...err.response.data.errors}); 
       })
       .finally(()=>{
        setUploading(false);
       })
    }
      
      return (
        <div>
            <Button variant="contained" color="primary" onClick={handleModalToggle}>
                رفع تقرير جديد لمنتجات المخزن
            </Button>

            <Dialog className={classes.dialog} onClose={handleModalClose} aria-labelledby="customized-dialog-title" open={openModal}>               
                <DialogTitle id="customized-dialog-title" onClose={handleModalClose}>
                  رفع تقرير المنتجات
                </DialogTitle>
                <DialogContent dividers>
                    <Backdrop className={classes.backdrop}
                                open={uploading}>
                            <CircularProgress color="inherit" />
                    </Backdrop>
                    <Alert severity="info">
                        <Typography gutterBottom color="primary">
                            من فضلك حاول ان تضع ارقام ترتيب الاعمدة الموجودة بالملف اذا كانت مختلفة عن الافتراضية (الاسم-السعر-نسبة الخصم)
                        </Typography>
                    </Alert>
                    <Box my={1}>
                        {stkProdError.G &&
                            <Alert severity="error">
                            {displayError(stkProdError.G)}
                            </Alert>
                        }
                    </Box>                   
                    <Box>
                        <Box>
                            <TextField 
                                id="colNameOrder"
                                name="colNameOrder"
                                label="ترتيب العمود الذى يحتوى على اسم الادوية"
                                type="number"
                                variant="outlined"                                    
                                className={classes.textField}
                                margin="dense"
                                size="small"
                                fullWidth
                                helperText={displayError(stkProdError.ColNameOrder)}
                                error={stkProdError.ColNameOrder?true:false}  
                                value={stkProdData.colNameOrder}                     
                                onChange={handleInputChange}
                            />
                        </Box>
                        <Box>
                            <TextField 
                                id="colPriceOrder"
                                name="colPriceOrder"
                                label="ترتيب العمود الذىيحتوى على سعر الادوية"
                                type="number"
                                variant="outlined"                                    
                                className={classes.textField}
                                margin="dense"
                                size="small"
                                fullWidth
                                helperText={displayError(stkProdError.ColPriceOrder)}
                                error={stkProdError.ColPriceOrder?true:false}  
                                value={stkProdData.colPriceOrder}                     
                                onChange={handleInputChange}
                            />
                        </Box>
                        <Box>
                            <TextField 
                                id="colDiscountOrder"
                                name="colDiscountOrder"
                                label="ترتيب العمود الذى يحتوى على الخصم"
                                type="number"
                                variant="outlined"                                    
                                className={classes.textField}
                                margin="dense"
                                size="small"
                                fullWidth
                                helperText={displayError(stkProdError.ColDiscountOrder)}
                                error={stkProdError.ColDiscountOrder?true:false}  
                                value={stkProdData.colDiscountOrder}                     
                                onChange={handleInputChange}
                            />
                        </Box>
                        <Box my={1}>
                            <Typography color="secondary">
                                    {displayError(stkProdError.Sheet)}
                            </Typography>
                            <Typography variant="body2">{fileName}</Typography>
                            <Button 
                            variant="contained" color="primary" 
                            onClick={()=>{uploadFileInp.current?.click();}}
                            startIcon={<UploadIcon className={classes.formButtonIcon}/>}>قم برفع اكسل فايل</Button>
                            <input hidden type="file"       
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                ref={uploadFileInp} 
                                onChange={handleFileInputChange}
                            />
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleSubmit} color="primary">
                        ارسال
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
      );
}

const mapStateToProps = (state:{data:IStocksDataState}) => ({
    
})

export default connect((state:{stockData:IStocksDataState})=>({
pagingData:state.stockData.DataStore.pagination
}),{GetMyStockProdsData_Page})(UpdateStockView) as any;
