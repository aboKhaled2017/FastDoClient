import React, { ReactElement } from 'react'
import { Theme, withStyles, Grid, Box, CardActionArea, makeStyles, Card, CardMedia, CardContent, Typography, CardActions, Button, IconButton } from '@material-ui/core'
import { DrugsPackges } from '../../Commons/Services'
import defaultImageSrc from '../../Images/Packages/default.jpg'
import { IDrugPackage } from '../../Interfaces/DataTypes'
import ImgIcon from '@material-ui/icons/ImageOutlined'
interface Props {
    
}
const styles=(theme:Theme)=>({

})
const useCardStyles =  makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexGrow:1,
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',

    },
    cover: {
      width: 350,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
}));
const PackageCard=(props:{model:IDrugPackage})=>{
    const classes = useCardStyles();
    const {model}=props;
    return (
        <Card className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {model.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              باقة بقيمة {model.value} جنية
            </Typography>
          </CardContent>
          <div className={classes.controls}>
          <Button size="small" color="primary">
            التفاصيل
          </Button>
          <Button size="small" color="secondary">
            حذف الباقة
          </Button>
          <IconButton title="تعديل الصورة" size="small" onClick={() => {}}>
            <ImgIcon  color="primary"/>
          </IconButton>
          </div>
        </div>
        <CardMedia
          className={classes.cover}
          image={defaultImageSrc}
          title="تعديل صورة الباكج"
        />
      </Card>
    );
  }
export default withStyles(styles)(({}: Props): ReactElement=> {
    const AllPackages=DrugsPackges.get();
    return (
        <Grid container>
            {AllPackages.map((packg,i)=>{
                return (
                    <Grid item xs={12} md={8}>
                        <Box my={2}>
                            <PackageCard key={i} model={packg}/>
                        </Box>
                    </Grid>
                )
            })}
        </Grid>
    )
})
