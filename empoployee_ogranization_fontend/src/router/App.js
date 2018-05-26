import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../container/Home';
import Login from '../container/Login';
import Table from '../container/Table';
import NotFound from '../container/NotFound';
import RegistrationInterview from '../container/RegistrationInterview';
import CashierExportBill from '../container/CashierExportBill';
import ExportBill from '../component/ExportBill';
import ManagerCandidate from '../container/ManagerCandidate';
class App extends Component {
    render() {
      return (
          <div>
            <Router>
              <Switch>         
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/table" component={Table} />
                <Route exact path="/hosoungtuyen" component={RegistrationInterview} />
                <Route exact path="/xuathoadondangki" component={CashierExportBill} />
                {/* <Route exact path="/abc" component={ExportBill} /> */}
                <Route exact path="/quanlyungvien" component={ManagerCandidate} />
                <Route exact component={NotFound} />
              </Switch>
            </Router>
          </div>
      );
    }
  }
  
  export default App;