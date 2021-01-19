import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Layout from './components/Layout';
import Home from './pages/Home';
import Detail from './pages/Detail';
import New from './pages/New';


function App() {
  return (
    <Router>
      <Layout>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/new'>
          <New />
        </Route>
        <Route path='/:id'>
          <Detail />
        </Route>
      </Switch>
      </Layout>
    </Router>
  );
}

export default App;
