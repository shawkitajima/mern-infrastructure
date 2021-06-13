import {useState} from 'react'
import {useHistory} from 'react-router-dom';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import FacebookLogin from 'react-facebook-login';
import {facebookLogin} from '../../utilities/auth-service';

export default function AuthPage({setUser}) {
  const history = useHistory();
    const [active, setActive] = useState(0);

    const handleFacebookResponse = async res => {
      const user = await facebookLogin(res.accessToken);
      setUser(user);
      history.push('/');
    }

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
        <h1>Or!</h1>
        <FacebookLogin
          appId={process.env.REACT_APP_FACEBOOK_APP_ID}
          autoLoad={true}
          fields="name, email"
          callback={handleFacebookResponse} 
        />
      </main>
    );
  }