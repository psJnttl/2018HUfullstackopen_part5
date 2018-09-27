const noteReducer = (state = [0, 0, 0], action) => {
  console.log('state: ', state);
  switch (action.type) {
    case 'GOOD':
      let [first, ...rest] = state;
      return [++first, ...rest];
    case 'OK':
      let [f, ok, l] = state
      return [f, ++ok, l];
    case 'BAD':
      let [g, o, bad] = state;
      return [g, o, ++bad];
    case 'CLEAR':
      return [0, 0, 0];
    default:
      return state;
  }
};

export default noteReducer;
