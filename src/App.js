import React, { Component } from 'react';
import { BrowserRouter as Router,Route, Switch, Redirect } from 'react-router-dom'
import AddUser from './views/Users/Users';
import Navbar from './views/Navbar';
import UserList from './views/Users/UserList';
import {Provider} from 'react-redux';
import store from './redux/store/store'
class App extends Component {
  render() {
    return (
      <>
      <Provider store={store}>
      <Router>
      <Navbar/>
        <Switch>
          <Route path="/index" component={UserList} />
          <Route path="/addUser" component={AddUser} />
          <Route path="/editUser/:id" component={AddUser} />
          <Redirect to="/index" />
        </Switch>
      </Router>
      </Provider>
      </>
    );
  }
}
export default App;