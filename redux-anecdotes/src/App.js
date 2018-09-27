import React from 'react';
import Anecdotes from './components/Anecdotes'
import action from './components/actionCreators'

const btnStyle = {
  borderRadius: 5,
  padding: 3,
  cursor: 'pointer',
  borderWidth: 1,
  margin: 2,
  background: 'white'
};

class App extends React.Component {
  render() {

    return (
      <div>
        <Anecdotes store={this.props.store} btnStyle={btnStyle} />
        <h2>create new</h2>
        <form onSubmit={this.formHandler}>
          <div><input name='contentInput' /></div>
          <button style={btnStyle} type='submit'>create</button>
        </form>
      </div>
    )
  }

  formHandler = (event) => {
    event.preventDefault();
    const value = event.target.contentInput.value;
    const store = this.props.store;
    store.dispatch(action.newAnecdote(value));
    event.target.contentInput.value = "";
  }
}

export default App
