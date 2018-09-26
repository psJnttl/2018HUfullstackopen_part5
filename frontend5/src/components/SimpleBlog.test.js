import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

const newBlog = {
  title: 'No Silver Bullet',
  author: 'Frederick P. Brooks',
  likes: 11
};

describe('<SimpleBlog />', () => {
  let blogComponent;

  beforeEach(() => {
    blogComponent = shallow(
      <SimpleBlog
        blog={newBlog}
      />
    );
  });

  it('renders title, author and likes', () => {
    const titleauthor = blogComponent.find('.titleauthor');
    console.log(titleauthor.debug());
    expect(titleauthor.text()).toContain(newBlog.title);
    expect(titleauthor.text()).toContain(newBlog.author);
    const likes = blogComponent.find('.likes');
    expect(likes.text()).toContain(newBlog.likes);
  });
});
