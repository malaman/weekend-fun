
const initialState = {
    isLoading: false,
};

/**
 * reducer responsible for global application UI
 *
 * @param {Object} state current app state
 * @param {Object} action - action
 * @returns {Object} - new app state
 */
export default function user(state = initialState, action) {
    switch (action.type) {
        case 'LOAD_USER_POSTS_PENDING':
        case 'LOAD_USER_INFO_PENDING':
            return {...state, isLoading: true};
        case 'LOAD_USER_POSTS_FULFILLED':
        case 'LOAD_USER_POSTS_REJECTED':
        case 'LOAD_USER_INFO_FULFILLED':
        case 'LOAD_USER_INFO_REJECTED':
            return {...state, isLoading: false};
        default:
            return state;
    }
}
