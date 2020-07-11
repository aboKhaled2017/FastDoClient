import React, { Component, FormEvent, Fragment } from 'react'
import { TextField, Button, CircularProgress, Theme, withStyles, Typography, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/SendRounded'
interface IProps {
    classes:{[key:string]:any}
}
interface IState{
    desId:number
    addressDetails:string
    errors:{}
}
const styles=(theme:Theme)=>({
     form:{
         margin:theme.spacing(3),
         [`${theme.breakpoints.down('xs')}`]:{
            margin:theme.spacing(0)
        }
     },
     textField:{
       margin:'10px auto 10px auto',     
       background:'#fff',
     },
     button:{
       margin:theme.spacing(3,'auto',1.5,'auto'),
       position:'relative'
     },
     buttonIcon:{
         marginLeft:12
     },
     customeErros:{
       marginTop:20,
       color:'red',
       fontSize:'0.8rem'
     },
     progress:{
       position:'absolute',
     },
     formControl: {
        margin:'10px 5px 10px 2px',     
        //background:'#fff',
        width:'40%',
        minWidth: 120,
        [`${theme.breakpoints.down('xs')}`]:{
            width:'100%'
        },
        [`${theme.breakpoints.only('sm')}`]:{
            width:'48%'
        }
    },
    selectEmpty: {
    marginTop: theme.spacing(2),
    },
    inputLabel:{
         
    }
})
export default withStyles(styles as any)(class extends Component<IProps, IState> {
    state = {addressDetails:'',desId:0,errors:{} as any}
    handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
    }
    handleSelectCityChange=()=>{

    }
    render() {
        const {classes}=this.props;
        const {errors}=this.state;
        const loading=false;
        return (          
            <form noValidate onSubmit={this.handleSubmit} className={classes.form}> 
            <FormControl className={classes.formControl}>
                <InputLabel id="citySelect" className={classes.inputLabel}>المحافظة</InputLabel>       
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        //open={open}
                        //onClose={handleClose}
                        //onOpen={handleOpen}
                        value={0}
                        onChange={this.handleSelectCityChange}
                        >
                        <MenuItem value={0}>
                        <em>اختر المحافظة</em>
                        </MenuItem>
                        <MenuItem value={10}>سوهاج</MenuItem>
                        <MenuItem value={20}>اسيوط</MenuItem>
                        <MenuItem value={30}>قنا</MenuItem>
                        <MenuItem value={10}>القاهرة</MenuItem>
                        <MenuItem value={20}>المنصورة</MenuItem>
                        <MenuItem value={30}>المنيا</MenuItem>
                    </Select>
                    {/**<FormHelperText>Required</FormHelperText> */}
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id="destrictSelect" className={classes.inputLabel}>المركز التابع لها</InputLabel>       
                    <Select
                        id="selectOfDestrict"
                        //open={open}
                        //onClose={handleClose}
                        //onOpen={handleOpen}
                        value={0}
                        onChange={this.handleSelectCityChange}
                        >
                        <MenuItem value={0}>
                        <em>اختر المركز</em>
                        </MenuItem>
                        <MenuItem value={10}>سوهاج</MenuItem>
                        <MenuItem value={20}>اسيوط</MenuItem>
                        <MenuItem value={30}>قنا</MenuItem>
                        <MenuItem value={10}>القاهرة</MenuItem>
                        <MenuItem value={20}>المنصورة</MenuItem>
                        <MenuItem value={30}>المنيا</MenuItem>
                    </Select>
                    {/**<FormHelperText>Required</FormHelperText> */}
            </FormControl>
            <TextField 
                    name="addressDetails" type="text" 
                    variant="outlined"
                    id="addressDetails" label="العنوان التفصيلى" 
                    value={this.state.addressDetails}
                    multiline
                    rows={3}
                    /*helperText={errors?.confirmPassword}
                    error={errors?.confirmPassword?true:false}                       
                    onChange={this.handleChange}*/
                    fullWidth
                    className={classes.textField}/>           
            <Button 
                    type="submit" variant="contained" 
                    disabled={loading}
                    className={classes.button} color="primary"
                    startIcon={<SaveIcon className={classes.buttonIcon}/>}>
                حفظ  
                {
                loading&&(
                    <CircularProgress size={30} color="secondary" className={classes.progress}/>
                )
                }
            </Button>           
                    </form>
        )
    }
})
