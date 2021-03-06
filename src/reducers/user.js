import deepClone from '../helpers/deepClone';

const initialState = {
  posts: [],
  info: {
    id: -1,
    address: {},
    company: {}
  },
  comments: {},
  saveStatus: {isSaved: false, isFailed: false}
};

/**
 * posts object of app state is enchanged with totalComments {Number} property
 *
 * @param {Object} state current app state
 * @param {Array} payload - array of post from api endpoint
 * @returns {Object} new app state
 */
function getPosts(state, payload) {
  const posts = payload.map(post => ({...post, totalComments: post.comments.length}));
  return {...state, posts};

}
/**
 *
 * reducer for user page
 *
 * @param {Object} state current app state
 * @param {Object} action - action
 * @returns {Object} - new app state
 */
export default function user(state = initialState, action) {
    switch (action.type) {
      case 'LOAD_USER_POSTS_FULFILLED':
        return getPosts(state, action.payload);
      case 'LOAD_USER_INFO_FULFILLED':
        const {address, company} = action.payload;
        return  {...state,
          info: {
            ...action.payload,
            address: address || {},
            company: company || {}
          }
        };
      case 'TOGGLE_POST_VIEW':
        const id = action.payload;
        const newPosts = deepClone(state.posts);
        const post = newPosts.find(post => post.id === id);
        if (post) {
          post.expanded = !Boolean(post.expanded);
        }
        return {...state, posts: newPosts};
      case 'SET_SAVE_STATUS':
        return {...state, saveStatus: {isSaved: true, isFailed: false}};
      case 'CLEAR_SAVE_STATUS':
        return {...state, saveStatus: {isSaved: false, isFailed: false}};
      default:
        return state;
    }
}
