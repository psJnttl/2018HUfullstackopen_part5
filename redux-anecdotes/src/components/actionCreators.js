
const action = {
  voteAnecdode(id) {
    return {
      type: 'VOTE',
      data: {
        id: id
      }
    }
  }
}

export default action;
