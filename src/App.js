import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import 'antd/dist/antd.css';
import './App.css';

import Form from './components/form';
import List from './components/list';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Form />
        </Route>
        <Route exact path='/list'>
          <List />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
