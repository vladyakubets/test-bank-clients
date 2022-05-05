import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import { getPosts } from './actions/posts';
import useStyles from './styles';
import { FETCH_ALL } from './constants/actionTypes';


const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleSubmit = (value) => {
    const { min, max, cards, mortgage } = value
    let filters = {}
    if (max && min) {
      filters.min = min
      filters.max = max
    }
    if (cards) {
      filters.cards = cards
    }
    if (mortgage) {
      filters.mortgage = mortgage.charAt(0).toUpperCase() + mortgage.slice(1)
    }
    if (Object.keys(filters).length) {
      dispatch({ type: FETCH_ALL, payload: [] });
      dispatch(getPosts(filters))
    }
  }

  useEffect(() => {
    dispatch(getPosts());
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
