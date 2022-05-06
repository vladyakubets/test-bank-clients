import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import { getPosts } from './actions/posts';
import useStyles from './styles';
import { FETCH_ALL } from './constants/actionTypes';
import { getCities } from './actions/cities';


const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleSubmit = (value) => {
    const { balanceMin, balanceMax, cardsMin,cardsMax, mortgage, city } = value
    let filters = {}
    if (balanceMin) {
      filters.balanceMin = balanceMin
    }
    if (balanceMax) {
      filters.balanceMax = balanceMax
    }
    if (cardsMin) {
      filters.cardsMin = cardsMin
    }
    if (cardsMax) {
      filters.cardsMax = cardsMax
    }
    if (mortgage) {
      filters.mortgage = mortgage.charAt(0).toUpperCase() + mortgage.slice(1)
    }
    if (city){
      filters.city = city
    }
    if (Object.keys(filters).length) {
      dispatch({ type: FETCH_ALL, payload: [] });
      dispatch(getPosts(filters))
      return
    } 
    dispatch({ type: FETCH_ALL, payload: [] });
    dispatch(getPosts())
  }

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getCities())
  }, [currentId, dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">Bank Clients</Typography>
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} handleSubmit={handleSubmit} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
