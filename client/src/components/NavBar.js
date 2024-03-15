import {Link, useParams} from "react-router-dom";

function NavBar(){
    return(
     <div>
        <nav>
        <Link to="/">  Home    </Link>
        <Link to="/signup">  Signup    </Link>
        
            
        </nav>
     </div>


    )


}
export default NavBar