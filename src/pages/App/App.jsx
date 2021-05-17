import './App.css';
import { useState } from 'react';
// Add the following import
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';

function App() {
  const [user, setUser] = useState({});
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
        <div>You need to login</div>
      }
    </main>
  );
}

export default App;
