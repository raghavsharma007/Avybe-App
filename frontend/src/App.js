import './App.css';
import { LoginPage } from './containers/LoginPage';
import { HomePage } from './containers/HomePage';
import PrivateRoute from './components/PrivateRoute';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {  
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/login" component={LoginPage}/>
          <PrivateRoute exact path="/" component={HomePage}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
