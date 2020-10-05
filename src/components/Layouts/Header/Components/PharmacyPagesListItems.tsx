import React, { Fragment } from 'react';
import { ListItem, ListItemText, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default ()=>{
    return (
        <Fragment>
            <ListItem>
                <ListItemText>
                    <Button component={Link} to="/searchStocks" color="primary">مخازنى</Button>
                </ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText>
                    <Button component={Link} to="/requestStkDrugs" color="primary">طلب ادوية من مخزن</Button>
                </ListItemText>
            </ListItem>
        </Fragment>
    )
}