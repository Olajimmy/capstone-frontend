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
        <div className="tab">
          <Link to="/">Home</Link>
        </div>
        &nbsp; | &nbsp;
        <div className="tab">
          <Link to="/jobpostpage">Job Post</Link>
        </div>
        &nbsp; | &nbsp;
        <div className="tab">
          <Link to="/jobfeed">Job Feed</Link>
        </div>
        &nbsp; | &nbsp;
        <div className="tab">
          <Link to="/profilepage">Profile</Link>
        </div>
        <div className="tab">
          <Link to="" onClick={handleLogOut}>
            Sign Out
          </Link>
        </div>
      </div>
    </nav>
  );
}
export default Nav;
