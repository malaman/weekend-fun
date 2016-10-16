import user, {initialState} from '../../src/reducers/user';
import postsData from '../fixtures/posts.json';
import userData from '../fixtures/user.json';

describe('check store reducers functions', () => {
  let userState;

  beforeEach(() => {
    userState = user(initialState, {
      type: 'LOAD_USER_POSTS_FULFILLED',
      payload: postsData
    });
    userState = user({...userState}, {
      type: 'LOAD_USER_INFO_FULFILLED',
      payload: userData
    });

  });

  it('check LOAD_USER_POSTS_FULFILLED action', () => {
    expect(postsData.length).toEqual(userState.posts.length);
    expect(userState.posts.reduce((prev, next) => next.totalComments ? prev = prev + 1 : prev, 0)).toEqual(userState.posts.length);
    expect(userState.posts.reduce((prev, next) => next.totalComments ? prev = prev + next.totalComments : prev, 0)).toEqual(50);
  });

  it('check LOAD_USER_INFO_FULFILLED action', () => {
    expect(userState.info.company).toEqual(jasmine.any(Object));
    expect(userState.info.address).toEqual(jasmine.any(Object));
  });
});
