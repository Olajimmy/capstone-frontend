import { Link } from "react-router";
import { logOut } from "../utilities/users-services";
import { getUser } from "../utilities/users-services";
import { useState, useEffect } from "react";

function Nav() {
  function handleLogOut() {
    //delegate this functionality to users-services
    logOut();
    //update state will also cause a rerender
    setUser(null);
  }

  const [unique, setUnique] = useState(getUser());
  useEffect(() => {
    unique;
  }, []);

  console.log(unique.entryType);

  return (
    <div>
      {" "}
      <nav>
        <div>
          <div>
            <Link to="/">Home</Link>
          </div>

          {unique.entryType === "employer" ? (
            <>
              <div>
                <Link to="/jobpostpage">Job Post</Link>
              </div>
            </>
          ) : (
            <></>
          )}

          <div>
            <Link to="/jobfeed">Job Feed</Link>
          </div>
          <div>
            <Link to="/contactus">Contact Us</Link>
          </div>
          <div>
            <Link to="/profilepage">Profile</Link>
          </div>
          <div>
            <Link to="" onClick={handleLogOut}>
              Sign Out
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Nav;
