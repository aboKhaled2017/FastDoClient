import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Theme } from '@material-ui/core';
import notFoundImg from '../../Images/not_found.png'
const useStyles = makeStyles((theme:Theme) => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    paddingTop: 150,
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
      <Grid
        container
        justify="center"
        spacing={4}
      >
        <Grid
          item
          lg={6}
          xs={12}
        >
          <div className={classes.content}>
            <Typography variant="h1">
              404: الصفحة التى تبحث عنها ,غير موجودة هنا
            </Typography>
            <Typography variant="subtitle2">
              You either tried some shady route or you came here by mistake.
              Whichever it is, try using the navigation
              اما انك حاولت اختراق رابط غير مسموح لك, او جئت هنا بالخطأ,
              اينا يكن , من فضلك حاول استخدام روابط التوجيه
            </Typography>
            <img
              alt="Under development"
              className={classes.image}
              src={notFoundImg}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default NotFound;
