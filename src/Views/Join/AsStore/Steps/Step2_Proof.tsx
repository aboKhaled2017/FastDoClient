import React, { Component, createRef } from "react";
import { Typography, Box, Button } from "@material-ui/core";
import { I_UI_Errors} from '../../../../Interfaces/AccountTypes';
import { I_DataOf_Signup_Stk_Steps } from "../../../../Interfaces/States";
import {displayError} from '../../../../Helpers/HelperJsxFunctions'
import { RegImageType } from "../../../../Interfaces/DataTypes";
import ImageUploadIcon from '@material-ui/icons/ImageRounded'

interface IStep_Props{
    classes:{[key:string]:string}
    errors:I_UI_Errors  
    stk_DataOfSteps:I_DataOf_Signup_Stk_Steps
    On_Stk_Signup_Input_change:(name:string,value:any,step:number,imgName?:string)=>void    
}
class STK_Proof_Step extends Component<IStep_Props>{
    private _upload_lincenseImg_btn:React.RefObject<HTMLInputElement>
    private _upload_commertialImg_btn:React.RefObject<HTMLInputElement>

    private licenseImgPreview:React.RefObject<HTMLImageElement>
    private commertialImgPreview:React.RefObject<HTMLImageElement>
    constructor(props:any){
       super(props)
       this._upload_lincenseImg_btn=createRef()
       this._upload_commertialImg_btn=createRef()
       this.licenseImgPreview=createRef()
       this.commertialImgPreview=createRef()
    }
    licenseRef=createRef<HTMLImageElement>()
    commertialRegImgRef=createRef<HTMLImageElement>()
    getImgUrlFromFile(file:File,onLoad:(src:string)=>void){
        var reader=new FileReader();
        reader.onload=(e)=>{
            onLoad(e.target?.result as string);
        }
        reader.readAsDataURL(file);
    }
    handleChange=(e:React.ChangeEvent<HTMLInputElement>,type:RegImageType)=>{
        var target=e.target as EventTarget&HTMLInputElement;
        if(!target || !target.files) return;
        var file=target.files[0];
        if(!file)return;
        var name="";
        this.getImgUrlFromFile(file,src=>{
            if(type==RegImageType.license){
                name="licenseImg";
              (this.licenseImgPreview.current as HTMLImageElement).src=src;
            }
            else{
                name="commerialRegImg";
                (this.commertialImgPreview.current as HTMLImageElement).src=src;
            }
            this.props.On_Stk_Signup_Input_change(name,file,1,file.name);
        })
        
        
    }
    handleSubmit=(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();       
    }
    handleImgUpload=(e:React.MouseEvent<HTMLButtonElement, MouseEvent>,type:RegImageType)=>{
        if(type==RegImageType.license)
        this._upload_lincenseImg_btn.current?.click()
        else 
        this._upload_commertialImg_btn.current?.click()
    }
    componentDidMount(){
        const {data}=this.props.stk_DataOfSteps.step2;
        if(data.get('licenseImg')){
            this.getImgUrlFromFile(data.get('licenseImg') as File,src=>{
                (this.licenseImgPreview.current as  HTMLImageElement).src=src;
            });
        }
        if(data.get('commerialRegImg')){
            this.getImgUrlFromFile(data.get('commerialRegImg') as File,src=>{
                (this.commertialImgPreview.current as HTMLImageElement).src=src;
            });
        }
    }
    render(){
        const {classes}=this.props;
        const errors=this.props.errors.signUp_Errors?.Stk_SignUp_Errors?.Step2_Errors;
        const {data}=this.props.stk_DataOfSteps.step2;
        
        return (
            <Box>         
                <Box mb={2}>
                    <Box>
                        <input accept="image/*" 
                               hidden type="file" 
                               ref={this._upload_lincenseImg_btn} 
                               onChange={e=>this.handleChange(e,RegImageType.license)}/>
                        <Button name="btn1" variant="contained" color="primary" 
                                onClick={e=>this.handleImgUpload(e,RegImageType.license)}
                                className={classes.afterWelocmGridButton}                               
                                endIcon={
                                    <ImageUploadIcon className={classes.ImgUploadIcon}/>
                                }>ارفع  ملف صورة الترخيص 
                        </Button>
                        {errors.LicenseImg && 
                        <Typography variant="body2" className={classes.customeErros}>{displayError(errors.LicenseImg)}</Typography>
                        } 
                    </Box>
                    <Box className={classes.imgBox}>
                        <div>                            
                            <img ref={this.licenseImgPreview} alt=" صورة الترخيص"/>
                        </div>                     
                    </Box> 
                </Box>
                <Box mb={2}>    
                    <Box>
                    <input accept="image/*" 
                           hidden type="file" 
                           ref={this._upload_commertialImg_btn} 
                           onChange={e=>this.handleChange(e,RegImageType.commercialReg)}/>
                        <Button variant="contained" color="primary" name="btn2" 
                                onClick={e=>this.handleImgUpload(e,RegImageType.commercialReg)}
                                className={classes.afterWelocmGridButton}                               
                                endIcon={
                                    <ImageUploadIcon className={classes.ImgUploadIcon}/>
                                }>ارفع ملف صورة السجيل التجارى
                        </Button>
                        {errors.CommerialRegImg && 
                        <Typography variant="body2" className={classes.customeErros}>{displayError(errors.CommerialRegImg)}</Typography>
                        }
                    </Box>
                    <Box className={classes.imgBox}>
                        <div>
                           <img ref={this.commertialImgPreview} alt=" صورة التسجيل التجارى"/>
                        </div>                        
                    </Box> 
                </Box>
                <Box>    
                {errors.G && 
                <Typography variant="body2" className={classes.customeErros}>{errors.G}</Typography>
                } 
                </Box>
            </Box>   
        )
    }
}
export default STK_Proof_Step;