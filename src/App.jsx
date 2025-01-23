import { useState } from "react";
import { Routes, Route } from "react-router";
import AuthPage from "./pages/AuthPage";
import JobFeed from "./pages/JobFeed";
import JobPostPage from "./pages/JobPostPage";
import ProfilePage from "./pages/ProfilePage";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import "./App.css";
import { getUser } from "./utilities/users-services";
import Welcome from "./pages/Welcome";
import logo3 from "./images/logo3.jpeg";
import logo2 from "./images/logo2.jpeg";

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <>
      <div className="mainHeader">
        <h2 style={{ color: "white" }}>
          <img src={logo2} />
          <img className="innerMainHeader" src={logo3} />
        </h2>
      </div>

      {user && user.entryType === "employer" ? (
        <>
          <Nav />
          <div
            style={{
              border: "0px solid black",
              display: "flex",
              justifyContent: "flex-end",
              padding: "10px",
            }}
          >
            <div
              style={{
                border: "0px solid black",
                width: "80px",
                padding: "5px",
                textAlign: "center",
                backgroundColor: "#e8eddf",
                borderRadius: "5px",
              }}
            >
              {user.name}
            </div>
          </div>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/jobfeed" element={<JobFeed />} />
            <Route path="/jobpostpage" element={<JobPostPage />} />
            <Route
              path="/profilepage"
              element={<ProfilePage setUser={setUser} />}
            />
          </Routes>
        </>
      ) : user && user.entryType === "employee" ? (
        <>
          <Nav />
          <div>{user.name}</div>
          <div>Welcome</div>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/jobfeed" element={<JobFeed />} />

            <Route
              path="/profilepage"
              element={<ProfilePage setUser={setUser} />}
            />
          </Routes>
        </>
      ) : (
        <>
          <AuthPage setUser={setUser} />
        </>
      )}
      <Footer />
    </>
  );
}

export default App;
