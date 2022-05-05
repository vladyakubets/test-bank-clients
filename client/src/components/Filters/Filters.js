import React from 'react'

import { useForm } from "react-hook-form";
import useStyles from './styles';
import { Box, Card, CardContent, Slider, TextField, Typography } from '@material-ui/core'

const Filters = ({ submit }) => {
    const classes = useStyles();
    const {
        register, handleSubmit
    } = useForm()
    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography color="textPrimary" component="h4">Balance: </Typography>
                <form onSubmit={handleSubmit(submit)}>
                    <div className={`${classes.inputBox} ${classes.balance}`}>
                        <TextField name="min" type="number" variant="outlined" label="Min" className={classes.input} {...register('min')} />
                        <TextField name="max" type="number" variant="outlined" label="Max" className={classes.input} {...register('max')} />
                    </div>
                    <div className={classes.inputBox}>
                        <Typography color="textPrimary" component="h4">Have mortgage: </Typography>
                        <TextField name="mortgage" variant="outlined" label="Yes or No" fullWidth  {...register('mortgage')} />

                    </div>
                    <div className={classes.inputBox}>
                        <Typography color="textPrimary" component="h4"># of credit cards: </Typography>
                        <TextField name="cards" type="number" variant="outlined" label="Number" fullWidth  {...register('cards')} />
                    </div>
                    <button type={"submit"}>Apply</button>
                </form>
            </CardContent>
        </Card>

    )
}

export default Filters