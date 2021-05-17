import './App.css';
import { useState } from 'react';
// Add the following import
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import AuthPage from '../AuthPage/AuthPage';

function App() {
  const [user, setUser] = useState(null);

  return (
    <main className="App">
      <NavBar/>
      { user ?
        <>
          <Switch>
            <Route path="/something">
              <div>Something else</div>
            </Route>
            <Route path="/">
              <div>Home Page or Something</div>
            </Route>
            <Redirect to="/" />
          </Switch>
        </>
        :
        <AuthPage/>
      }
    </main>
  );
}

export default App;
