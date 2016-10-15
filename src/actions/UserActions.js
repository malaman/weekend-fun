import http from '../helpers/http';


// Actions
export const getPosts = (userId) => ({
  type: 'LOAD_USER_POSTS',
  payload: http({ uri: `/api/users/${userId}/posts?_embed=comments` })
});


export const getUserIfo = (userId) => ({
  type: 'LOAD_USER_INFO',
  payload: http({ uri: `/api/users/${userId}` })
});

export const togglePostView = (postId) => ({
  type: 'TOGGLE_POST_VIEW',
  payload: postId
});


// export const getCommentsByPostId = (userId) => ({
//   type: 'LOAD_USER_INFO',
//   payload: http({ uri: `/users/${userId}` })
// });
//
//
// export const togglePostViewAndLoadComment = (postId) => (dispatch, getState) => {
//   if (!getState().user.comments[postId]) {
//
//
//   }
//   dispatch(togglePostView(postId));
// };
//
// export const loadNavTreeAndExpandNode = (categoryId) => (dispatch, getState) => {
//   dispatch(loadNavigationTree()).payload.promise.then(() => {
//     const node = getState().virtualCategories.get('navigation')
//       .find(item => item.getIn(['attributes', 'category_id']) === categoryId);
//     if (node) {
//       dispatch(showParents(node));
//     }
//   });
// };
