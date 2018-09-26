import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Loginform from './components/Loginform'
import LoginService from './services/login'
import LoginState from './components/LoginState'

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
    const storedUser = window.localStorage.getItem('BlogAppLoggedUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.username && parsedUser.name && parsedUser.token) {
        this.setState({user: parsedUser});
      }
    }
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
            <div>
              <LoginState user={this.state.user}
                logout={this.logout} />
            </div>
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
      window.localStorage.setItem('BlogAppLoggedUser', JSON.stringify(result));
    }
    catch (error) {
      if (error.response.data.error) {
        console.log("FAIL:", error.response.data.error);
      }
    }
  }

  logout = () => {
    this.setState({user: null});
    window.localStorage.removeItem('BlogAppLoggedUser');
  }

}

export default App;
