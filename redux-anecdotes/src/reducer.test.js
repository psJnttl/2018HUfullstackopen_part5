import deepFreeze from 'deep-freeze'
import reducer from './reducer'

describe('redux anecdotes reducer', () => {

  const initialAnecdodes = [
    { id: 1, content: 'aaa', votes: 0},
    { id: 2, content: 'bbb', votes: 0},
    { id: 3, content: 'ccc', votes: 0}
  ];
  const voteFor = (id) => {
    return {type: 'VOTE', data: {id: id} };
  };

  it('returns state unchanged when called with unknown action', () => {
    const action = {
      type: 'UNKNOWN'
    };
    const state = initialAnecdodes;
    deepFreeze(state);
    const newState = reducer(state, action);
    expect(newState).toEqual(initialAnecdodes);
  });

  it('increments anecdote vote counts correctly', () => {
    const state = initialAnecdodes;

    deepFreeze(state);
    const newState = reducer(state, voteFor(1));
    deepFreeze(newState);
    const newState2 = reducer(newState, voteFor(3));
    deepFreeze(newState2);
    const newState3 = reducer(newState2, voteFor(3));
    deepFreeze(newState3);
    const newState4 = reducer(newState3, voteFor(3));

    const item1 = newState4.find((a) => a.id === 1 );
    const item2 = newState4.find((a) => a.id === 2 );
    const item3 = newState4.find((a) => a.id === 3 );
    expect(item1.votes).toEqual(1);
    expect(item2.votes).toEqual(0);
    expect(item3.votes).toEqual(3);
  });

  it('store has anecdotes sorted according to votes, descending order', () => {
    const state = [
      { id: 1, content: 'aaa', votes: 1},
      { id: 2, content: 'bbb', votes: 0},
      { id: 3, content: 'ccc', votes: 3}
    ];
    const expectedState = [
      { id: 3, content: 'ccc', votes: 4},
      { id: 1, content: 'aaa', votes: 2},
      { id: 2, content: 'bbb', votes: 1}
    ];

    deepFreeze(state);
    const newState = reducer(state, voteFor(2));
    deepFreeze(newState);
    const newState2 = reducer(newState, voteFor(1));
    deepFreeze(newState2);
    const newState3 = reducer(newState2, voteFor(3));

    expect(newState3).toEqual(expectedState);
  });

  it('new anecdote can be added with unique id', () => {
    const action = {
      type: 'NEW_ANECDOTE',
      data: {content:'ddd'}
    };
    const state = initialAnecdodes;

    deepFreeze(state);
    const newState = reducer(state, action);

    const added = newState.find((a) => a.content === action.data.content);
    const sameId = newState.filter((a) => a.id === added.id);
    expect(sameId.length).toEqual(1);
    expect(added.votes).toEqual(0);
  });
});
