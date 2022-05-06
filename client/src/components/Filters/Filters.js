import React from 'react'
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { Box, Card, CardContent, Slider, TextField, Typography } from '@material-ui/core'
import Autocomplete from '@mui/material/Autocomplete';

import useStyles from './styles';

const Filters = ({ submit }) => {
    const classes = useStyles();
    const cities = useSelector((state) => state.cities);
    const {
        register, handleSubmit
    } = useForm()
    return (
        <Card className={classes.card}>
            <CardContent>
                <form onSubmit={handleSubmit(submit)}>
                    <Typography color="textPrimary" component="h4">Balance: </Typography>
                    <div className={`${classes.inputBox} ${classes.balance}`}>
                        <TextField name="min" type="number" variant="outlined" label="Min" className={classes.input} {...register('balanceMin')} />
                        <TextField name="max" type="number" variant="outlined" label="Max" className={classes.input} {...register('balanceMax')} />
                    </div>
                    <div className={classes.inputBox}>
                        <Typography color="textPrimary" component="h4">Have mortgage: </Typography>
                        <TextField name="mortgage" variant="outlined" label="Yes or No" fullWidth  {...register('mortgage')} />
                    </div>
                    <Typography color="textPrimary" component="h4"># of credit cards: </Typography>
                    <div className={`${classes.inputBox} ${classes.balance}`}>
                        <TextField name="cards" type="number" variant="outlined" label="Number" className={classes.input}  {...register('cardsMin')} />
                        <TextField name="cards" type="number" variant="outlined" label="Number" className={classes.input}  {...register('cardsMax')} />
                    </div>
                    <div className={`${classes.inputBox}`}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={cities}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="City" {...register('city')} />}
                        />
                    </div>
                    <button type={"submit"}>Apply</button>
                </form>
            </CardContent>
        </Card>

    )
}

export default Filters