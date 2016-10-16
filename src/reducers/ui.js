
const initialState = {
    isLoading: false,
};

export default function user(state = initialState, action) {
    switch (action.type) {
        case 'LOAD_USER_POSTS_PENDING':
        case 'LOAD_USER_INFO_PENDING':
            return {...state, isLoading: true};
        case 'LOAD_USER_POSTS_FULFILLED':
        case 'LOAD_USER_INFO_FULFILLED':
            return {...state, isLoading: false};
        default:
            return state;
    }
}
