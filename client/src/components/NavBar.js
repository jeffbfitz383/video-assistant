import {Link, useParams} from "react-router-dom";

function NavBar(){
    return(
     <div>
        <nav>
        <Link to="/">  Home    </Link>
        <Link to="/signup">  Signup    </Link>
        <Link to="/Login">  Login    </Link>
        <Link to="/Addplay">  Addplay    </Link>
        <Link to="/Addproject">  Addproject    </Link>
        
            
        </nav>
     </div>


    )


}
export default NavBar