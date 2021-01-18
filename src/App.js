import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Layout from './components/Layout';
import Home from './pages/Home';


function App() {
  return (
    <Router>
      <Layout>
      <Switch>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
      </Layout>
    </Router>
  );
}

export default App;
