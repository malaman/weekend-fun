import http from '../helpers/http';

// Action creators

/**
 * get posts for the user
 * redux-promise-middleware automatically generates following action types
 * LOAD_USER_POSTS_PENDING - request is pending
 * LOAD_USER_POSTS_FULFILLED - request is resolved
 */
export const getPosts = (userId) => ({
  type: 'LOAD_USER_POSTS',
  payload: http({ uri: `/api/users/${userId}/posts?_embed=comments` })
});

/**
 * get user account information
 * redux-promise-middleware automatically generates following action types
 * LOAD_USER_INFO_PENDING - request is pending
 * LOAD_USER_INFO_FULFILLED - request is resolved
 */
export const getUserInfo = (userId) => ({
  type: 'LOAD_USER_INFO',
  payload: http({ uri: `/api/users/${userId}` })
});

/**
 * expand/collapse post in the posts list view to display post body and comments
 */
export const togglePost = (postId) => ({
  type: 'TOGGLE_POST_VIEW',
  payload: postId
});

/**
 * create post and add it to the post list
 * No real backend is used. Only UI logic is created
 * In order to avoid post id conflicts first possible id is 501 (mock api returns 500 posts)
 */
export const createPost = (payload) => (dispatch, getState) => {
  const { id } = getState().user.info;
  const posts = getState().user.posts;
  const post = {...payload, comments: [], userId: id, id: 501 + posts.length};
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
