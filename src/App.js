import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css';
import Feed from './components/Feed';
import UserFeed from './components/UserFeed';
import Login from './components/Login';
import Logout from './components/Logout';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Feed}></Route>
        <Route path="/user/:username" component={UserFeed}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/logout" component={Logout} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
