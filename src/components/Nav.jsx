import { Link } from "react-router";
import { logOut } from "../utilities/users-services";

function Nav() {
  function handleLogOut() {
    //delegate this functionality to users-services
    logOut();
    //update state will also cause a rerender
    setUser(null);
  }

  return (
    <nav>
      <div className="navContainer">
        <Link to="/">Home</Link>
        &nbsp; | &nbsp;
        <Link to="/jobpostpage">Job Post</Link>
        &nbsp; | &nbsp;
        <Link to="/jobfeed">Job Feed</Link>
      </div>
      <div>
        <Link to="" onClick={handleLogOut}>
          Sign Out
        </Link>
      </div>
    </nav>
  );
}
export default Nav;
