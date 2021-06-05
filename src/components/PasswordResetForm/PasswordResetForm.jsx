import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {changePassword} from '../../utilities/users-api';

export default function PasswordResetForm() {
    const history = useHistory();
    const [details, setDetails] = useState({
        token: '',
        password: '',
        confirm: '',
    });
    const [error, setError] = useState(null);
    const disable = details.password !== details.confirm;

    const handleChange = (evt) => {
        setDetails({...details, [evt.target.name]: evt.target.value});
    }

    const handleSubmit = async (evt) => {
        // Prevent form from being submitted to the server
        evt.preventDefault();
        try {
            const formData = {...details};
            delete formData.confirm;
            await changePassword(formData);
            history.push('/auth');
            setError(null);
          
        } catch {
          // An error occurred 
          setError('Password Reset Failed - Try Again');
        }
    };

    return (
        <div>
        <div className="form-container">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <label>Token</label>
            <input type="text" name="token" value={details.token} onChange={handleChange} required />
            <input type="password" name="password" value={details.password} onChange={handleChange} required />
            <label>Confirm</label>
            <input type="password" name="confirm" value={details.confirm} onChange={handleChange} required />
            <button type="submit" disabled={disable}>Reset Password</button>
          </form>
        </div>
        <p className="error-message">&nbsp;{error}</p>
      </div>
    )
}