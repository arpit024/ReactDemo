import React, { Component } from 'react';
import { BrowserRouter as Router,Route, Switch, Redirect } from 'react-router-dom'
import Users from './views/Users/Users';
import Navbar from './views/Navbar';
import {Provider} from 'react-redux';
import store from './redux/store/store'
class App extends Component {
  render() {
    return (
      <>
      <Navbar/>
      <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" component={Users} />
          <Redirect to="/" />
        </Switch>
      </Router>
      </Provider>
      </>
    );
  }
}
export default App;