import { useState, useEffect } from "react";
import axios from "axios";
import { getUser, signUp } from "../utilities/users-services";

function ProfilePage() {
  const [entries, setEntries] = useState([]);
  const [unique, setUnique] = useState({});

  const [update, setUpdate] = useState("");

  const LOCAL_URL = `http://localhost:5050`;
  //

  const getEntries = async () => {
    console.log(`in getEntries`);
    //fetch calendar entries from the back end
    //aslo known as the api that i an creating
    //this endpoint is:
    // /api/calendar

    try {
      const response = await axios.get(`${LOCAL_URL}/api/users/`);
      console.log("response.data", response.data);
      setEntries(response.data);
      setUnique(getUser());
      console.log(unique.email);
    } catch (err) {
      console.error(err);
    }
  };

  //
  //   const getUniqueUser = async () => {
  //     console.log(`in getEntries`);
  //     //fetch calendar entries from the back end
  //     //aslo known as the api that i an creating
  //     //this endpoint is:
  //     // /api/calendar

  //     try {
  //       const response = await axios.get(`${LOCAL_URL}/api/users/`);
  //       console.log("response.data", response.data);
  //       setUnique(response.data);
  //       //console.log(entries._id);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  useEffect(() => {
    getEntries();
  }, [update]);

  return (
    <>
      <div className="profileContainer">
        <h2>Welcome To Your Profile Page</h2>
        Name: {unique.name}
        <br />
        Email: {unique.email}
        <br />
        User Id: {unique._id}
      </div>
    </>
  );
}
export default ProfilePage;
