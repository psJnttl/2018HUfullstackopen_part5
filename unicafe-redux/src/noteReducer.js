const initialState = {
  good: 0,
  ok: 0,
  bad: 0
};

const noteReducer = (state = initialState, action) => {
  let g = state.good;
  let o = state.ok;
  let b = state.bad;
  switch (action.type) {
    case 'GOOD':
      g++;
      break;
    case 'OK':
      o++;
      break;
    case 'BAD':
      b++;
      break;
    case 'CLEAR':
      return initialState;
    default:
      return state;
  }
  return {
    good: g,
    ok: o,
    bad: b
  };
};

export default noteReducer;
