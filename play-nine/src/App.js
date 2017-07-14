import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import _ from 'lodash'
import './App.css';
import Game from './Components/Game';

class App extends Component {
  render() {
    return (
      <div className="App">
				<Game />
      </div>
    );
  }
}

export default App;
