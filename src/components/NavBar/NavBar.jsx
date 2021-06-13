import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({user, setUser}) {

    const handleLogOut = () => {
        userService.logOut();
        setUser(null);
    }

    return (
        <nav>
            <Link to="/">Home Page</Link>
            {user ? 
            <>
            {user.phone && user.phone.remind && !user.phone.verified && <Link to="/phone/verify">Verify Phone Number</Link>}
            <Link to="/something">Something Else</Link>
            Logged in as {user.name}
            <Link to="" onClick={handleLogOut}>Log Out</Link>
            </> :
            <>
            <Link to="/">Log In or Signup</Link>
            </>
            }
        </nav>
    )
}