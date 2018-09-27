
const action = {
  voteAnecdode(id) {
    return {
      type: 'VOTE',
      data: {
        id: id
      }
    };
  },
  newAnecdote(content) {
    return {
      type: 'NEW_ANECDOTE',
      data: {content: content}
    };
  }
}

export default action;
