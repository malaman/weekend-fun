import http from '../helpers/http';


// Actions
export const getPosts = (userId) => ({
  type: 'LOAD_USER_POSTS',
  payload: http({ uri: `/api/users/${userId}/posts?_embed=comments` })
});


export const getUserInfo = (userId) => ({
  type: 'LOAD_USER_INFO',
  payload: http({ uri: `/api/users/${userId}` })
});

export const togglePost = (postId) => ({
  type: 'TOGGLE_POST_VIEW',
  payload: postId
});

export const createPost = (payload) => (dispatch, getState) => {
  const { id } = getState().user.info;
  const posts = getState().user.posts;
  const post = {...payload, comments: [], userId: id, id: 500 + posts.length};
  posts.unshift(post);
  dispatch(setSaveStatus());
  dispatch({
    type: 'LOAD_USER_POSTS_FULFILLED',
    payload: posts
  });
};

export const setSaveStatus = () => ({
  type: 'SET_SAVE_STATUS',
  payload: {isSaved: true, isFailed: false}
});

export const clearSaveStatus = () => ({
  type: 'CLEAR_SAVE_STATUS',
  payload: {isSaved: false, isFailed: false}
});
