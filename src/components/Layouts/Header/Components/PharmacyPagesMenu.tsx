import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowIcon from '@material-ui/icons/ArrowDropDown'

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Box, Button } from '@material-ui/core';
import {createBrowserHistory} from 'history'
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBarButton:{
        fontSize:15,
        margin:'auto',
        '& .buttonText':{
          marginRight:theme.spacing(1),
          textAlign:'center',
          width:70
        }
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export default ()=>{
    const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);


  const browserHistory = createBrowserHistory();
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
    return (
        <>
            <Button variant="text"  color="inherit" 
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    endIcon={
                      <ArrowIcon/>
                    }
                    className={classes.appBarButton}>صفحات اخرى</Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem  onClick={handleClose} component={Link} to={"/searchStocks"}>مخازنى</MenuItem>
                <MenuItem onClick={handleClose}  component={Link} to={"/requestStkDrugs"}>طلب ادوية من مخزن</MenuItem>
              </Menu>
            </>
    )
} ;