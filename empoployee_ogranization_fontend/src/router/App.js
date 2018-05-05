import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../container/Home';
import Login from '../container/Login';
import Table from '../container/Table';

class App extends Component {
    render() {
      return (
          <div>
            <Router>
              <Switch>
                <Route path="/index" component={Home} />
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/table" component={Table} />
              </Switch>
            </Router>
          </div>
      );
    }
  }
  
  export default App;