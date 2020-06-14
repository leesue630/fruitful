import React from "react";
import Grid from "@material-ui/core/Grid";
import Post from "../components/Post";

export default function PostView(props) {
  const recentPostsMarkup = props.posts ? (
    props.posts.map((post) => (
      <Grid item key={post.postId} xs={3}>
        <Post
          key={post.postId}
          userHandle={post.userHandle}
          fruit={post.fruit}
          createdAt={post.createdAt}
        />
      </Grid>
    ))
  ) : (
    <p>Loading...</p>
  );
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
    >
      {recentPostsMarkup}
    </Grid>
  );
}
