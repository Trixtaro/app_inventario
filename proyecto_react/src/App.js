import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={() => 'hello world'}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
