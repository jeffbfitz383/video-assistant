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
        <Link to="/UserLoggedin">  UserLoggedin    </Link>
        <Link to="/Enterproject">  Enterproject   </Link>
        <Link to="/Useplay">  Useplay   </Link>
        
            
        </nav>
     </div>


    )


}
export default NavBar