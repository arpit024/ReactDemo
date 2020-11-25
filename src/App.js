import React, { Component } from 'react';
import { BrowserRouter as Router,Route, Switch, Redirect } from 'react-router-dom'
import Users from './views/Users/Users'
import Navbar from './views/Navbar'
class App extends Component {
  render() {
    return (
      <>
      <Navbar/>
      <Router>
        <Switch>
          <Route path="/" component={Users} />
          <Redirect to="/" />
        </Switch>
      </Router>
      </>
    );
  }
}
export default App;