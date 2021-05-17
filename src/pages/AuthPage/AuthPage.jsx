import {useState} from 'react'
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';

export default function AuthPage({setUser}) {
    const [active, setActive] = useState(0);
    return (
      <main>
        <div>
            <div onClick={() => setActive(0)} style={{color: active ? 'black' : 'green'}}>Login</div>
            <div onClick={() => setActive(1)} style={{color: active ? 'green' : 'black'}}>SignUp</div>
        </div>
        {active ? (
                <SignUpForm setUser={setUser} />
            ) : (
                <LoginForm setUser={setUser} />
            )
        }
      </main>
    );
  }