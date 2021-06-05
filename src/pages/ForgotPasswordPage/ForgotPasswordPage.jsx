import {useState} from 'react';
import PasswordResetForm from '../../components/PasswordResetForm/PasswordResetForm';
import TokenRequestForm from '../../components/TokenRequestForm/TokenRequestForm';

export default function ForgotPasswordPage() {
    const [tokenRequested, setTokenRequested] = useState(false);

    return (
        tokenRequested ? <PasswordResetForm /> : <TokenRequestForm setTokenRequested={setTokenRequested} />
    )
}