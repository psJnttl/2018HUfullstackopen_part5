import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Loginform from './components/Loginform'
import LoginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  }

  render() {
    const blogList = this.state.blogs.map(blog =>
      <Blog key={blog.id} blog={blog}/>
    );
    return (
      <div>
        { this.state.user === null &&
          <Loginform
            onUserLogin={this.loginPost}
          />
        }
        {this.state.user !== null &&
          <div>
            <h2>blogs</h2>
            {this.state.user.name} logged in<br /><br />
            {blogList}
          </div>
        }
      </div>
    );
  }

  loginPost = async (username, password) => {
    try {
      const result = await LoginService.login(username, password);
      this.setState({user: result});
    }
    catch (error) {
      if (error.response.data.error) {
        console.log("FAIL:", error.response.data.error);
      }
    }
  }

}

export default App;
