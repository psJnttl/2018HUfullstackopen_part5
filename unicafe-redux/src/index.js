import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux'
import noteReducer from './noteReducer'

const store = createStore(noteReducer);

const Statistiikka = ({inputs}) => {
  let [theGood, theOKish, theBad] = inputs;
  let palautteita = inputs.reduce((a,b) => a + b );
  let positive = theGood/palautteita*100;
  let average = ((1 * theGood) + (-1 * theBad)) / (1.0 * palautteita);
  if (palautteita === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{theGood}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{theOKish}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{theBad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{average.toFixed(2)}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{positive.toFixed(2)} %</td>
          </tr>
        </tbody>
      </table>

      <button onClick={()=>store.dispatch({type: 'CLEAR'})}>nollaa tilasto</button>
    </div>
  )
}

class App extends React.Component {
  klik = (nappi) => {
    console.log(nappi);
    store.dispatch({ type: nappi});
  }

  render() {
    let inputs = store.getState();

    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={() => this.klik('GOOD')}>hyvä</button>
        <button onClick={() => this.klik('OK')}>neutraali</button>
        <button onClick={() => this.klik('BAD')}>huono</button>
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
