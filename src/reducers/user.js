import deepClone from '../helpers/deepClone';
const initialState = {
  posts: [],
  info: {
    address: {},
    company: {}
  },
  comments: {}
};

export default function user(state = initialState, action) {
    switch (action.type) {
      case 'LOAD_USER_POSTS_FULFILLED':
        return {...state, posts: action.payload};
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
        newPosts[id].expanded = !Boolean(newPosts[id].expanded);
        return {...state, posts: newPosts};
      default:
        return state;
    }
}
