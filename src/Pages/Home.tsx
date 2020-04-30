import React, { Component } from 'react'
import homeImage from '../Images/homeImage.jpg'
import { Container, Box, Theme, withStyles } from '@material-ui/core'
interface Props {
    classes:{[key:string]:string}
}
interface State {
    
}

const styles=((theme:Theme)=>({
    backWrapper:{
      margin:theme.spacing(-2.9,-4.4),
      backgroundImage:`url(${homeImage})`,
      backgroundSize:'cover',
      height:500
    }
  }))
export default withStyles(styles)( class Home extends Component<Props, State> {
    state = {}

    render() {
        const {classes}=this.props;
        return (
            <Box >
                <div className={classes.backWrapper}></div>
            </Box>
        )
    }
})
