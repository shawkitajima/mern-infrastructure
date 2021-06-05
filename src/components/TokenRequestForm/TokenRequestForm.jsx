import {useState} from 'react';
import {requestPasswordResetToken} from '../../utilities/users-api';


export default function TokenRequestForm({setTokenRequested}) {
    const [email, setEmail] = useState(null);


    async function handleSubmit() {
        const message = await requestPasswordResetToken({email})
        setTokenRequested(true);
    }

    return (
        <>
        <div>Please give us your email</div>
        <input type="text" onChange={evt => setEmail(evt.target.value)} value={email}/>
        <button onClick={handleSubmit}>Submit</button>
        </>
    )
}