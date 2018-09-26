import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: 0
    }
  }

  toggle = () => {
    this.setState({visible: !this.state.visible});
  }

  incrementLike = () => {
    const blog = this.props.blog;
    const updatedBlog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user._id
    };
    this.props.onUpdate(updatedBlog, blog.id);
  }

  render() {
    const header = {cursor: 'pointer'};
    const hide = {display: 'none'};
    const ds = {display:'', background: '#f8f8f8', marginLeft: 10, padding: 2};
    const blog = this.props.blog;
    const detailsStyle = this.state.visible ? ds : hide;
    return (
      <div style={{borderWidth: 1, border: 'solid', padding: 4, margin:2}}>
        <div onClick={this.toggle} style={header}>{blog.title} {blog.author}</div>
        <div style={detailsStyle}>
          <a href={blog.url}>{blog.url}</a><br />
          {blog.likes} likes <button onClick={this.incrementLike}>like</button><br />
          added by {blog.user ? blog.user.name : ''}<br />
        </div>
      </div>
    );
  }
}

export default Blog;
