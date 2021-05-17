import { Link } from 'react-router-dom';

export default function NavBar() {
    return (
        <nav>
            <Link to="/">Home Page</Link>
            <Link to="/something">Something Else</Link>
        </nav>
    )
}