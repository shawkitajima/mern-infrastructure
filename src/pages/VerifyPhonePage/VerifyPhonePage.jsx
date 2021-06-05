import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import PhoneInput from 'react-phone-number-input';
import {requestPhoneToken, verifyPhonetoken, updatePhoneNumber} from '../../utilities/users-api';
import 'react-phone-number-input/style.css';

export default function VerifyPhonePage({setUser}) {
    const history = useHistory();
    const [token, setToken] = useState('');
    const [error, setError] = useState(null);
    const [phone, setPhone] = useState('');

    async function requestToken() {
        try {
            await requestPhoneToken();
            setError(null);
        } catch(err) {
            setError('there is something wrong with the phone number we have on file, please edit it');
        }
    }
    
    useEffect(() => {
        requestToken();
    }, []);

    

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const user = await verifyPhonetoken(parseInt(token));
            setUser(user);
            history.push('/');
        } catch (err) {
            setError('the token you provided is incorrect');
        }
    }

    const handlePhoneNumberUpdate = async () => {
        try {
            const user = await updatePhoneNumber(phone);
            setUser(user);
            await requestToken()
        } catch(err) {
            setError(err);
        }
    }

    return (
        <div>
            <h1>Phone Verify</h1>
            <p>You will only need to verify your phone number as a means for us to provide you with a token to reset your password should you ever need it</p>
            <p>We have sent you a token to the phone number you have provided, please submit it to verify your number</p>
            <form onSubmit={handleSubmit}>
                <input type="number" name="token" id="" value={token} onChange={evt => setToken(evt.target.value)}/>
                <button type="submit">Submit</button>
            </form>
            <p>If the phone number you provided was a mistake, please edit it here!</p>
            <div>
                <PhoneInput
                    placeholder="Enter phone number"
                    defaultCountry="US"
                    value={phone}
                    onChange={setPhone}
                />
                <button onClick={handlePhoneNumberUpdate}>Submit</button>
            </div>
            {error && <div style={{color: 'red'}}>{error}</div>}
        </div>
    )
}