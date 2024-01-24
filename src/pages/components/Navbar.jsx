import { Link } from "react-router-dom";

export default function Navbar() {
    return(
        <nav className="nav">
            <ul>
              <li><Link to="/">Home</Link></li>  
                <li><Link to="/maze">Maze</Link></li>
            </ul>
        </nav>
        ); 
        
}