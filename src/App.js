import React, { Component } from 'react';
import { BrowserRouter as Router,Route, Routes, Navigate } from 'react-router-dom'
import User from './views/Users/User';
import {Provider} from 'react-redux';
import store from './redux/store/store'
import Test from './views/Test'
import Login from './views/Public/login'
import ForgotPassword from './views/Public/forgetPassword';
import SignUp from './views/Public/signUp'
class App extends Component {
  render() {
    return (
      <>
      <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/forgetPassword" element={<ForgotPassword/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="user/*" element={<User/>} />
        </Routes>
      </Router>
      </Provider>
      </>
    );
  }
}
export default App;