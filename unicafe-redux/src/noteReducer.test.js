import deepFreeze from 'deep-freeze'
import counterReducer from './noteReducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  it('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  it('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  it('ok is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    });
  });

  it('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState;

    deepFreeze(state);
    let newState = counterReducer(state, action);
    deepFreeze(newState);
    newState = counterReducer(newState, action);
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 2
    });
  });

  it('counters are cleared', () => {
    const action = {
      type: 'CLEAR'
    };
    const state = {
      good: 2,
      ok: 3,
      bad: 1
    };
    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual(initialState);
  });

  it('returns state unchanged when called with unknown action', () => {
    const action = {
      type: 'INCREMENT_ALL'
    };
    const state = {
      good: 2,
      ok: 3,
      bad: 1
    };
    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 2,
      ok: 3,
      bad: 1
    });

  });
})
