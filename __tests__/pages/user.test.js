jest.mock('react/lib/ReactDefaultInjection');
import React from 'react';
import renderer from 'react-test-renderer';
import user, { initialState } from '../../src/reducers/user';

import postsData from '../fixtures/posts.json';
import userData from '../fixtures/user.json';

import { Posts } from '../../src/pages/User/Posts';
import { AccountData } from '../../src/pages/User/AccountData';

import { togglePost } from '../../src/actions/UserActions';

describe('check User page', () => {
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

  it('check Posts subpage', () => {
    const posts = renderer.create(<Posts posts={userState.posts}  togglePost={togglePost}/>);
    expect(posts.toJSON().children[1].children[1].children.length).toEqual(10);
  });

  it('check AccoundData subpage', () => {
    const accountData = renderer.create(<AccountData info={userState.info} />);
    expect(accountData.toJSON().children).toEqual(jasmine.any(Array));
  });

});
