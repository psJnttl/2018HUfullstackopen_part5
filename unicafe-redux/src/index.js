import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux'
import noteReducer from './noteReducer'

const btnStyle = {
  borderRadius: 5,
  padding: 8,
  cursor: 'pointer',
  borderWidth: 1,
  margin: 2,
  background: 'white'
};

const store = createStore(noteReducer);

const Statistiikka = ({inputs}) => {
  let palautteita = 0;
  for (let attr in inputs) {
    palautteita += inputs[attr];
  }
  let average = ((1 * inputs.good) + (-1 * inputs.bad)) / (1.0 * palautteita)
  let positive = inputs.good/(palautteita * 1.0) * 100
  if (palautteita === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }
  const avgStyle = average >= 0 ? {} : {background: '#ff4444', color: 'white'};
  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{inputs.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{inputs.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{inputs.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td style={avgStyle}>{average.toFixed(2)}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{positive.toFixed(2)} %</td>
          </tr>
        </tbody>
      </table>

      <button style={btnStyle} onClick={()=>store.dispatch({type: 'CLEAR'})}>nollaa tilasto</button>
    </div>
  )
}

class App extends React.Component {
  klik = (nappi) => {
    store.dispatch({ type: nappi});
  }

  render() {
    let inputs = store.getState();

    return (
      <div>
        <h2>anna palautetta</h2>
        <button style={btnStyle} onClick={() => this.klik('GOOD')}>hyvä</button>
        <button style={btnStyle} onClick={() => this.klik('OK')}>neutraali</button>
        <button style={btnStyle} onClick={() => this.klik('BAD')}>huono</button>
        <Statistiikka inputs={inputs}/>

      </div>
    )
  }
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
}

renderApp();
store.subscribe(renderApp);
