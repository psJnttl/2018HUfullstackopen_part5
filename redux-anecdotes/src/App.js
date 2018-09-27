import React from 'react';
import Anecdotes from './components/Anecdotes'

class App extends React.Component {
  render() {

    return (
      <div>
        <Anecdotes store={this.props.store} />
        <h2>create new</h2>
        <form>
          <div><input /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default App
