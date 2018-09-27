import React from 'react';
import action from './actionCreators'

const Anecdotes = ({store}) => {
  const anecdotes = store.getState()
  return (
  <div>
    <h2>Anecdotes</h2>
    {anecdotes.map(anecdote=>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={()=>store.dispatch(action.voteAnecdode(anecdote.id))}>vote</button>
        </div>
      </div>
    )}
  </div>
)};

export default Anecdotes;
