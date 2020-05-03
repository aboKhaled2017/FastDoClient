import React, { Component } from 'react'
import { Theme, withStyles, Container, Typography, TextField, Button } from '@material-ui/core'
import SendIcon from '@material-ui/icons/SendOutlined'
interface Props {
    classes:{[key:string]:any}
}
interface State {
    
}

const styles=(theme:Theme)=>({
    contactUsContainer:{
        background: '#e8e0e04d',
        padding: theme.spacing(5),
        borderRadius: 14,
        '& .contactForm':{
            margin:theme.spacing(3,'auto',0,'auto'),
            width:'50%',
            [`${theme.breakpoints.down('sm')}`]:{
                width:'100%'
            }
        }
    },
    textField:{
        background:'#fff',
        '& .MuiFormLabel-root':{
            fontSize:'1.2rem'
        },
        '& label':{
            color:'#666'
        }
    },
    formButton:{
     marginTop:theme.spacing(2)
    },
    formButtonIcon:{
        marginLeft:theme.spacing(1.5)
    }
})

export default withStyles(styles)(class ContactUs extends Component<Props, State> {
    state = {}

    render() {
        const {classes}=this.props;
        return (
        <Container className={classes.contactUsContainer}>
            <Typography variant="h4" color="primary" align="center">اترك لنا رسالتك</Typography>
            <form className="contactForm">
               <TextField 
                   id="name"
                   label="الاسم"
                   type="text"
                   variant="outlined"
                   fullWidth                  
                   className={classes.textField}
                   margin="dense"
                   size="medium"
               />
               <TextField 
                   id="email"
                   label="البريد الالكترونى"
                   type="email"
                   variant="outlined"
                   fullWidth
                   className={classes.textField}
                   margin="dense"
                   size="medium"
               />
               <TextField 
                   id="subject"
                   label="الموضوع"
                   type="text"
                   variant="outlined"
                   fullWidth
                   className={classes.textField}
                   margin="dense"
                   size="medium"
               />
               <TextField 
                   id="message"
                   label="الرسالة"
                   type="text"
                   rows={6}
                   rowsMax={8}
                   multiline
                   variant="outlined"
                   fullWidth
                   className={classes.textField}
                   margin="dense"
                   size="medium"
               />
               <Button 
                        variant="contained" color="primary" 
                        className={classes.formButton} 
                        type="submit"                               
                        startIcon={
                            <SendIcon className={classes.formButtonIcon}/>
                        }> 
                         ارسال
               </Button>
            </form>
        </Container>)
    }
})
