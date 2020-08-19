import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Theme } from '@material-ui/core';
import notFoundImg from '../../Images/not_found.png'
const useStyles = makeStyles((theme:Theme) => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    textAlign: 'center'
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  }
}));

const NotFound = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
       <div className={classes.content}>
            <Typography color="secondary" variant="h5">
              ليس لديك الصلاحية للدخول لهذه الصفحة
            </Typography>           
            <img
              alt="Under development"
              className={classes.image}
              src={notFoundImg}
            />
          </div>
    </div>
  );
};

export default NotFound;
