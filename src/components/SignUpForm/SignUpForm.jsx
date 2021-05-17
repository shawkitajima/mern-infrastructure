import {useState} from 'react';
import { signUp } from '../../utilities/users-service';


export default function SignUpForm() {
    const [details, setDetails] = useState({
        name: '',
        email: '',
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
            const user = await signUp(formData);
            setError(null);
            console.log(user);
          
        } catch {
          // An error occurred 
          setError('Sign Up Failed - Try Again');
        }
    };

    return (
        <div>
        <div className="form-container">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <label>Name</label>
            <input type="text" name="name" value={details.name} onChange={handleChange} required />
            <label>Email</label>
            <input type="email" name="email" value={details.email} onChange={handleChange} required />
            <label>Password</label>
            <input type="password" name="password" value={details.password} onChange={handleChange} required />
            <label>Confirm</label>
            <input type="password" name="confirm" value={details.confirm} onChange={handleChange} required />
            <button type="submit" disabled={disable}>SIGN UP</button>
          </form>
        </div>
        <p className="error-message">&nbsp;{error}</p>
      </div>
    )
}