import React from 'react'
import {mount} from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App /> when no user logged.', () => {
  let app;
  beforeEach(() => {
    window.localStorage.clear('BlogAppLoggedUser');
    app = mount(<App />);
  });

  it('Not logged, no blogs visible.', () => {
    let user = window.localStorage.getItem('BlogAppLoggedUser');
    expect(user).toEqual(undefined);
    app.update();
    const blogComponents = app.find(Blog);
    expect(blogComponents.length).toEqual(0);

  });

});
