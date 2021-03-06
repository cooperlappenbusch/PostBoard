import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition } from 'semantic-ui-react';


import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Home() {
    const { user } = useContext(AuthContext);
    const { loading, data: { getPosts: posts } = {} } = useQuery(FETCH_POSTS_QUERY);

    return(
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1> Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {user && ( //if we have a user
                    <Grid.Column>
                        <PostForm></PostForm>
                    </Grid.Column>
                )}
                {loading ? (
                    <h1>Loading posts...</h1>
                ) : (
                    <Transition.Group duration={200}>
                        {
                            posts && posts.map((post) => (
                                <Grid.Column key={post.id} style={{marginBottom: '20px'}}>
                                    <PostCard post={post} />
                                </Grid.Column>
                            ))
                        }
                    </Transition.Group>
                    
                )}
            </Grid.Row>
        </Grid>
    );
}



export default Home;