import './App.css';
import {useState} from 'react';
// Add the following import
import {Route, Switch, Redirect} from 'react-router-dom';
import {getUser} from '../../utilities/users-service';

import NavBar from '../../components/NavBar/NavBar';
import AuthPage from '../AuthPage/AuthPage';
import ForgotPasswordPage from '../ForgotPasswordPage/ForgotPasswordPage';
import VerifyPhonePage from '../VerifyPhonePage/VerifyPhonePage';

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser}/>
        <Switch>
          {user ? (
            <>
            <Route exact path="/something">
              <div>Something else</div>
            </Route>
            <Route exact path="/">
              <div user={user}>Home Page or Something</div>
            </Route>
            <Route exact path="/phone/verify">
              <VerifyPhonePage setUser={setUser} />
            </Route>
            </>
          ) : (
            <Route exact path="/">
              <AuthPage setUser={setUser}/>
            </Route>
          )}
          <Route exact path="/forgot">
            <ForgotPasswordPage />
          </Route>
          <Redirect to="/" />
      </Switch>
    </main>
  );
}

export default App;
