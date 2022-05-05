import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';
import Filters from '../Filters/Filters';

const Posts = ({ setCurrentId, handleSubmit }) => {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();

  return (
    (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        <Grid container>
          <Filters submit={handleSubmit} />
        </Grid>
        {!posts.length ? <CircularProgress /> : posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={6}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
