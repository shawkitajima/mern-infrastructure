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
            <Link to="/something">Something Else</Link>
            {user && 
            <>
            Logged in as {user.name}
            <Link to="" onClick={handleLogOut}>Log Out</Link>
            </>
            }
        </nav>
    )
}